/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
import {getElementsInTable, isButtonUpdateExist} from './utils';
import Store from './Store';
import {eventResponseType} from './type';
import {createUpdateStatusButton} from './UICreator';
import {isViewAllowed, addCheckBoxRecordsToTable, addCheckBoxSelectAllToTableHeader, executeUpdateStatus, doNotAllowQuickClickOnNextPrevButton} from './features';
import {disableFieldsInStatusHistoryTable} from './features/disableFieldsInStatusHistoryTable';
import {hiddenButtonInStatusHistoryTable} from './features/hiddenButtonInStatusHistoryTable';
import './index.css';
import {appService} from '../service';
import {checkDomainValid} from "@kintone-plugins/free-plugin-usage-regions";
import {TIME_BETWEEN_TWO_CLICK} from './constant';

((PLUGIN_ID) => {
  if (!checkDomainValid(ENCRYPTED_DOMAINS)) {
    return;
  }
  const store = new Store();

  kintone.events.on('app.record.index.show', async (event: eventResponseType) => {
    if (!isViewAllowed(PLUGIN_ID, event)) {
      return;
    }
    doNotAllowQuickClickOnNextPrevButton(TIME_BETWEEN_TWO_CLICK);

    const processManagementInfo = await appService.getStatusInProcessManagement();
    if (!processManagementInfo.enable) {
      return event;
    }
    const headerSpace = kintone.app.getHeaderMenuSpaceElement();
    const buttonStatusUpdate = createUpdateStatusButton();
    if (!isButtonUpdateExist()) {
      headerSpace.appendChild(buttonStatusUpdate.render());
    }
    const tableElements = getElementsInTable();
    if (!tableElements) {
      return;
    }

    const tableHeader = tableElements.header;
    const tableBody = tableElements.body;
    addCheckBoxRecordsToTable(tableBody, event, store);
    addCheckBoxSelectAllToTableHeader(tableHeader, store);
    buttonStatusUpdate.on('click', () => executeUpdateStatus(PLUGIN_ID, store));
    return event;
  });

  kintone.events.on(['app.record.edit.show', 'app.record.create.show'], async function(event) {
    const record = event.record;
    const config = kintone.plugin.app.getConfig(PLUGIN_ID);
    if (config.tableDropdown) {
      disableFieldsInStatusHistoryTable(config, record);
      await hiddenButtonInStatusHistoryTable(config);
    }
    return event;
  });
})(kintone.$PLUGIN_ID);
