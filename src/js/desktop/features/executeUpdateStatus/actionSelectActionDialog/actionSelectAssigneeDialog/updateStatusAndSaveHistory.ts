/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
import {Spinner} from '@kintone/kintone-ui-component/esm/js';
import Swal from 'sweetalert';
import {FIELD_TYPE} from '../../../../../constant';
import {appService} from '../../../../../service';
import I18N from '../../../../../../language';
import Store from '../../../../Store';

async function updateStatusAndSaveHistory(store: Store, PLUGIN_ID, paramsPluginConfig) {
  const config = kintone.plugin.app.getConfig(PLUGIN_ID);
  const loggedInUser = kintone.getLoginUser();
  const recordsSelected = store.recordsSelected;
  if (!config.tableDropdown) {
    updateStatusButDontSaveHistory(recordsSelected, paramsPluginConfig);
    return;
  }
  const fetch_records = store.allRecords;
  const getValuesSubtable = fetch_records.map((record) => {
    return {
      id: record.$id.value,
      oldValuesInSubtable: record[config.tableDropdown].value,
    };
  });
  const records = recordsSelected.map((recordDom: HTMLElement | any) => {
    const recordId = recordDom.getAttribute('value');
    const oldValuesInSubtable = getValuesSubtable.find((item) => item.id === recordId)?.oldValuesInSubtable;

    const newValuesInSubtable = [
      ...oldValuesInSubtable,
      {
        value: {
          [config.dateTimeDropdown]: {
            type: FIELD_TYPE.DATETIME,
            value: paramsPluginConfig.datetime,
          },
          [config.userSelectionDropdown]: {
            type: FIELD_TYPE.USER_SELECT,
            value: [
              {
                code: loggedInUser.code
              }
            ]
          },
          [config.statusBeforeDropdown]: {
            type: FIELD_TYPE.SINGLE_LINE_TEXT,
            value: paramsPluginConfig.statusBefore,
          },
          [config.statusAfterDropdown]: {
            type: FIELD_TYPE.SINGLE_LINE_TEXT,
            value: paramsPluginConfig.statusAfter,
          },
          [config.actionNameDropdown]: {
            type: FIELD_TYPE.SINGLE_LINE_TEXT,
            value: paramsPluginConfig.actionName,
          },
        },
      },
    ];

    return {
      id: recordId,
      record: {
        [config.tableDropdown]: {
          value: newValuesInSubtable,
        },
      },
    };
  });
  const iconLoading = showLoading();
  appService.updateRecordsStatus(records, paramsPluginConfig)
  .then((updateResult) => showUpdateResult(iconLoading, updateResult));
}

function updateStatusButDontSaveHistory(selectedRecordDom, paramsPluginConfig) {
  const records = selectedRecordDom.map((recordDom: HTMLElement | any) => {
    const recordId = recordDom.getAttribute('value');
    return {
      id: recordId
    };
  });
  const iconLoading = showLoading();
  appService.updateRecordsStatus(records, paramsPluginConfig)
  .then((updateResult) => showUpdateResult(iconLoading, updateResult));
}

function showLoading() {
  const iconLoading = new Spinner({isVisible: true});
  const body = document.getElementsByTagName('BODY')[0];
  body.appendChild(iconLoading.render());
  iconLoading.show();

  return iconLoading;
}

async function showUpdateResult(iconLoading: Spinner, updateResult) {
  iconLoading.hide();
  if (updateResult instanceof Error) {
    location.reload();
    return;
  }
  await Swal({
    icon: 'success',
    title: I18N.SUCCESSFULLY_UPDATE,
  });
  location.reload();
}

export {updateStatusAndSaveHistory};
