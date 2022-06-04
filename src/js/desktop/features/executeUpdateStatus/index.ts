/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
import {createSelectActionPopup} from './actionSelectActionDialog';
import {showError} from './showError';
import Store from '../../Store';
import {checkAssignee, checkDontHaveRecordsChecked, checkHasElementInStore, checkSelectSameStatus, getElementWithId} from '../../utils';
import I18N from '../../../../language';
import {Spinner} from '@kintone/kintone-ui-component/esm/js';
import {appService} from '../../../../js/service';

async function checkAfterClickButtonUpdate(recordsSelected) {
  if (checkDontHaveRecordsChecked(recordsSelected)) {
    await showError(I18N.ERROR_NOT_SELECT_ANY_RECORD);
    return false;
  }

  if (!checkSelectSameStatus(recordsSelected)) {
    await showError(I18N.ERROR_SELECT_DIFFERENCE_STATUS);
    return false;
  }

  if (!checkAssignee(recordsSelected)) {
    await showError(I18N.ERROR_SELECT_RECORD_THAT_IS_ASSIGNED_INCORRECT_PERSON);
    return false;
  }
  return true;
}

async function getRecordsEditable(store: Store, checkBoxSelectAllValue = true) {
  const iconLoading = new Spinner({isVisible: true});
  const body = document.getElementsByTagName('BODY')[0];
  body.appendChild(iconLoading.render());
  iconLoading.show();
  const records = await getRecordsBasedOnSelectedRecords(store, checkBoxSelectAllValue);
  if (!records) {
    iconLoading.hide();
    return null;
  }
  store.setAllRecords(records);
  const recordIds = records.map((record) => record.$id.value);
  if (recordIds.length === 0) {
    iconLoading.hide();
    return null;
  }
  const recordsPermission = await appService.evaluateRecordPermission(recordIds);
  const editableRecords = records.filter(
    (record, index) => record.$id.value === recordsPermission[index].id && recordsPermission[index].record.editable === true
  );
  iconLoading.hide();
  return editableRecords;
}

async function getRecordsBasedOnSelectedRecords(store: Store, checkBoxSelectAllValue) {
  let records;
  if (!checkBoxSelectAllValue) {
    const selectedIds: string[] = store.recordsSelected.map((recordSelectedElement: HTMLInputElement) => recordSelectedElement.value);
    if (selectedIds.length === 0) {
      return null;
    }
    records = await appService.fetch_fast(selectedIds);
  } else {
    records = await appService.fetch_fast();
  }
  return records;
}

async function getReordsSelected(store: Store) {
  const checkBoxSelectAll: any = document.getElementById('checkbox-select-all');
  const checkBoxSelectAllValue = checkBoxSelectAll.checked;
  if (!checkBoxSelectAllValue) {
    return getSelectedRecordsIfSelectAllUnChecked(store, checkBoxSelectAllValue);
  }
  const recordsEditable = await getRecordsEditable(store);
  if (!recordsEditable) {
    return [];
  }
  const recordsEditableSelected = recordsEditable.map((record) => {
    let recordCheckBox: HTMLInputElement;
    const recordId = record.$id.value;
    const recordCheckBoxId = `record-checkbox-${recordId}`;
    const recordUnSelectedIds = store.recordsUnSelected.map(element => element.id);
    if (recordUnSelectedIds.includes(recordCheckBoxId)) {
      const recordUnSelectedIndex = recordUnSelectedIds.indexOf(recordCheckBoxId);
      return store.recordsUnSelected[recordUnSelectedIndex];
    }
    if (checkHasElementInStore(store.checkBoxRecords, recordCheckBoxId)) {
      recordCheckBox = getElementWithId(store.checkBoxRecords, recordCheckBoxId);
    } else {
      recordCheckBox = document.createElement('input');
      recordCheckBox.type = 'checkbox';
      recordCheckBox.value = recordId;
      recordCheckBox.name = 'record-checkbox';
      recordCheckBox.id = `record-checkbox-${recordId}`;
      recordCheckBox.setAttribute('record-status', record.Status.value);
      recordCheckBox.setAttribute('record-assignee', JSON.stringify(record.Assignee.value));
      store.addNewItemToStoreCheckBoxRecords(recordCheckBox);
    }
    recordCheckBox.checked = checkBoxSelectAllValue;
    return recordCheckBox;
  }).filter((element: HTMLInputElement) => element.checked);
  store.setNewStoreRecordsSelected(recordsEditableSelected);
  return recordsEditableSelected;
}

async function getSelectedRecordsIfSelectAllUnChecked(store: Store, checkBoxSelectAllValue) {
  const recordsEditable = await getRecordsEditable(store, checkBoxSelectAllValue);
  if (!recordsEditable || recordsEditable.length === 0) {
    return [];
  }
  const recordsEditableIds = recordsEditable.map(recordEditable => recordEditable.$id.value);
  return store.recordsSelected
  .filter((recordSelected: HTMLInputElement) => recordsEditableIds.includes(recordSelected.value));
}

async function executeUpdateStatus(PLUGIN_ID, storeElm: Store) {
  const recordsSelected = await getReordsSelected(storeElm);
  const isPassCheck = await checkAfterClickButtonUpdate(recordsSelected);
  if (!isPassCheck) {
    return;
  }
  await createSelectActionPopup(storeElm, PLUGIN_ID);
}

export {executeUpdateStatus};
