/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
import Store from '../Store';
import {addCheckBoxRecord, createRecordCheckBox} from '../UICreator';
import {checkHasElementInStore, getElementWithId, setStoreRecordSelected} from '../utils';

function addCheckBoxRecordsToTable(tableBody, event, store: Store) {
  const tableRowsDom = tableBody.querySelectorAll('.recordlist-row-gaia');
  tableRowsDom.forEach((tr: any, rowIndex: number) => {
    const tableRowInfo = {
      tr,
      rowIndex,
    };
    if (event.records.length > 0) {
      const recordCheckBox = setValueCheckBoxRecord(tableRowInfo, event.records, store);
      if (recordCheckBox) {
        addCheckBoxRecord(tr, recordCheckBox);
        recordCheckBox.addEventListener('change', () => handleChangeRecordCheckBox(store, recordCheckBox));
      }
    }
  });
}

function addCheckBoxRecordToStore(store: Store, newItem) {
  store.addNewItemToStoreCheckBoxRecords(newItem);
}

function setValueCheckBoxRecord(tableRowInfo, records, store: Store) {
  const isElementDisabled = tableRowInfo.tr.querySelector('.recordlist-edit-gaia')?.disabled;
  let recordCheckBox: any;
  const recordId = records[tableRowInfo.rowIndex].$id.value;
  const recordCheckBoxId = `record-checkbox-${recordId}`;
  if (checkHasElementInStore(store.checkBoxRecords, recordCheckBoxId)) {
    recordCheckBox = getElementWithId(store.checkBoxRecords, recordCheckBoxId);
    if (isElementDisabled) {
      recordCheckBox.disabled = true;
    } else {
      recordCheckBox.disabled = false;
    }
  } else {
    recordCheckBox = createRecordCheckBox(records, tableRowInfo.rowIndex, isElementDisabled);
    addCheckBoxRecordToStore(store, recordCheckBox);
  }
  return recordCheckBox;
}

function setRecordChecBoxInStore(store: Store, newCheckBox) {
  const checkBoxId = newCheckBox.id;
  const checkBoxIndexInStore = store.checkBoxRecords.findIndex((element) => element.id === checkBoxId);
  store.checkBoxRecords[checkBoxIndexInStore].checked = newCheckBox.checked;
}

function setRecordsUnSelected(store, recordCheckBox) {
  const recordsUnSelected = store.recordsUnSelected.map(element => element.id);
  if (recordCheckBox.checked) {
    if (recordsUnSelected.includes(recordCheckBox.id)) {
      const newRecordsUnselected = store.recordsUnSelected.filter(record => record.id !== recordCheckBox.id);
      store.setNewStoreRecordsUnSelected(newRecordsUnselected);
    }
  } else {
    if (!recordsUnSelected.includes(recordCheckBox.id)) {
      store.addNewItemToStoreRecordsUnSelected(recordCheckBox);
    }
  }
}

function handleChangeRecordCheckBox(store: Store, recordCheckBox) {
  setRecordChecBoxInStore(store, recordCheckBox);
  const newStoreSelectedRecord = [...setStoreRecordSelected(store.recordsSelected, recordCheckBox)];
  store.setNewStoreRecordsSelected(newStoreSelectedRecord);
  setRecordsUnSelected(store, recordCheckBox);
}

export {addCheckBoxRecordsToTable};
