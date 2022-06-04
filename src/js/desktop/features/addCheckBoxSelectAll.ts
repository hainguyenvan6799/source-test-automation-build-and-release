/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
import Store from '../Store';
import {addCheckBoxSelectAll, createCheckBoxSelectAll} from '../UICreator';
import {checkHasElementInStore, getElementWithId} from '../utils';

function addCheckBoxSelectAllToTableHeader(tableHeader, store: Store) {
  const checkBoxSelectAll = setValueCheckBoxSelectAll(store);
  if (!checkBoxSelectAll) {
    return;
  }
  addCheckBoxSelectAll(tableHeader, checkBoxSelectAll);
  setRecordsCheckBox(store, checkBoxSelectAll);
  checkBoxSelectAll.addEventListener('change', () => actionChangeCheckBoxSelectAll(store, checkBoxSelectAll));

  window.addEventListener('scroll', function() {
    const headerElement: any = checkBoxSelectAll.parentNode?.parentNode;
    headerElement.className = 'headerTableSticky';
  });
}

function updateStoreBasedOnRecordCheckbox(store: Store, recordCheckBox: HTMLInputElement) {
  const recordsSelectedIds = store.recordsSelected.map(element => element.id);
  const recordsUnSelectedIds = store.recordsUnSelected.map(element => element.id);
  if (recordCheckBox.checked) {
    if (!recordsSelectedIds.includes(recordCheckBox.id)) {
      store.addNewItemToStoreRecordsSelected(recordCheckBox);
    }
    if (recordsUnSelectedIds.includes(recordCheckBox.id)) {
      store.setNewStoreRecordsUnSelected(store.recordsUnSelected.filter((element: HTMLInputElement) => element.id !== recordCheckBox.id));
    }
    return;
  }
  if (recordsSelectedIds.includes(recordCheckBox.id)) {
    store.setNewStoreRecordsSelected(store.recordsSelected.filter((element: HTMLInputElement) => element.id !== recordCheckBox.id));
  }
  if (!recordsUnSelectedIds.includes(recordCheckBox.id)) {
    store.addNewItemToStoreRecordsUnSelected(recordCheckBox);
  }
}

function actionIfRecordEnable(isChecked, recordsSelectedIds, recordsUnSelectedIds, record) {
  if (isChecked) {
    actionIfRecordChecked(recordsUnSelectedIds, record);
    return;
  }
  actionIfRecordUnChecked(recordsSelectedIds, record);
}

function actionIfRecordChecked(recordsUnSelectedIds, record) {
  if (recordsUnSelectedIds.includes(record.id)) {
    record.checked = false;
    return;
  }
  record.checked = true;
}

function actionIfRecordUnChecked(recordsSelectedIds, record) {
  if (recordsSelectedIds.includes(record.id)) {
    record.checked = true;
    return;
  }
  record.checked = false;
}

function setRecordsCheckBox(store: Store, checkBoxSelectAll: HTMLInputElement) {
  const recordsCheckBox = document.querySelectorAll('input[name="record-checkbox"]');
  const isChecked = checkBoxSelectAll.checked;
  const recordsUnSelectedIds = store.recordsUnSelected.map(element => element.id);
  const recordsSelectedIds = store.recordsSelected.map(element => element.id);
  recordsCheckBox.forEach((record: HTMLInputElement) => {
    if (!record.disabled) {
      actionIfRecordEnable(isChecked, recordsSelectedIds, recordsUnSelectedIds, record);
    } else {
      record.checked = false;
    }
    updateStoreBasedOnRecordCheckbox(store, record);
  });
}

function setValueCheckBoxSelectAll(store: Store) {
  let checkBoxSelectAll: HTMLInputElement | undefined;
  const checkBoxSelectAllId = `checkbox-select-all`;
  if (checkHasElementInStore(store.checkBoxSelectAll, checkBoxSelectAllId)) {
    checkBoxSelectAll = getElementWithId(store.checkBoxSelectAll, checkBoxSelectAllId);
  } else {
    checkBoxSelectAll = createCheckBoxSelectAll(checkBoxSelectAllId);
    addCheckBoxSelectAllToStore(store, checkBoxSelectAll);
  }
  return checkBoxSelectAll;
}

function actionChangeCheckBoxSelectAll(store: Store, checkBoxSelectAll: HTMLInputElement) {
  const recordsCheckBox = document.querySelectorAll('input[name="record-checkbox"]');
  const isChecked = checkBoxSelectAll.checked;
  recordsCheckBox.forEach((record: HTMLInputElement) => {
    if (!record.disabled) {
      record.checked = isChecked;
    }
    updateStoreBasedOnRecordCheckbox(store, record);
  });
}

function addCheckBoxSelectAllToStore(store: Store, newItem) {
  store.addNewItemToStoreCheckBoxSelectAll(newItem);
}

export {addCheckBoxSelectAllToTableHeader};
