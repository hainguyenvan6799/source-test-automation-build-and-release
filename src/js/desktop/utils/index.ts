/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
function getElementsInTable() {
  const tableRecordListDom = document.querySelector('.recordlist-gaia');
  const elementsInsideTable: HTMLCollection | undefined = tableRecordListDom?.children;
  if (!elementsInsideTable) {
    return null;
  }
  return {
    header: elementsInsideTable[0],
    body: elementsInsideTable[1]
  };
}

function isButtonUpdateExist() {
  return document.getElementById('button-update-status');
}

function checkDontHaveRecordsChecked(recordsCheckBox) {
  return Array.from(recordsCheckBox).filter((recordChecked: any) => recordChecked.checked).length === 0;
}

function checkAssignee(recordsCheckBox: any) {
  const loggedInUser = kintone.getLoginUser();

  return Array.from(recordsCheckBox).every((record: any) => {
    const assignees = JSON.parse(record.getAttribute('record-assignee'));
    const assigneeCode = assignees.map((assignee) => assignee.code);
    if (assignees.length === 0 || assigneeCode.includes(loggedInUser.code)) {
      return true;
    }
    return false;
  });
}

function checkSelectSameStatus(recordsCheckBox: any) {
  const recordsChecked: any = Array.from(recordsCheckBox).filter((recordChecked: any) => recordChecked.checked);
  const firstRecordStatus = recordsChecked[0].getAttribute('record-status');
  return recordsChecked.every((recordChecked) => recordChecked.getAttribute('record-status') === firstRecordStatus);
}

function checkedCheckBoxes(selectedRecordDom: HTMLInputElement[], checkBoxes, isChecked) {
  let newSelectedRecordDom: HTMLInputElement[] = [...selectedRecordDom];
  checkBoxes.forEach((recordCheckBox) => {
    if (!recordCheckBox.disabled) {
      recordCheckBox.checked = isChecked;
      newSelectedRecordDom = [...setStoreRecordSelected(newSelectedRecordDom, recordCheckBox)];
    }
  });
  return newSelectedRecordDom;
}

function setStoreRecordSelected(storeSelectedRecord: HTMLInputElement[], recordCheckBox) {
  let newSelectedRecordDom: HTMLInputElement[] = [...storeSelectedRecord];
  const recordSelectedIds = storeSelectedRecord.map(element => element.id);
  const isRecordChecked = recordCheckBox.checked;
  const isRecordSelectedExistInStore = recordSelectedIds.includes(recordCheckBox.id);
  if (isRecordChecked && !isRecordSelectedExistInStore) {
    newSelectedRecordDom.push(recordCheckBox);
  } else if (!isRecordChecked && isRecordSelectedExistInStore) {
    newSelectedRecordDom = storeSelectedRecord.filter(element => element.id !== recordCheckBox.id);
  }
  return newSelectedRecordDom;
}

function checkPluginConfig(config) {
  if (Object.keys(config).length > 0) {
    return true;
  }
  return false;
}

function getPluginConfig(PLUGIN_ID) {
  const config = kintone.plugin.app.getConfig(PLUGIN_ID);
  if (!checkPluginConfig(config)) {
    return null;
  }
  return config;
}

function isCheckBoxSelectAllExist() {
  return document.getElementById('checkbox-select-all');
}

function getElementWithId(store, id) {
  const element = store.find(item => item.id === id);
  return element;
}

function checkHasElementInStore(store, elementId) {
  return store.some(element => element.id === elementId);
}

function removeDupplicateObjectInArray(array) {
  const values = array.map(item => item.value);
  const filtered = array.filter(({value}, index) => !values.includes(value, index + 1));
  return filtered;
}

export {
  getElementsInTable,
  isButtonUpdateExist,
  checkDontHaveRecordsChecked,
  checkAssignee,
  checkSelectSameStatus,
  checkedCheckBoxes,
  isCheckBoxSelectAllExist,
  setStoreRecordSelected,
  getPluginConfig,
  getElementWithId,
  checkHasElementInStore,
  removeDupplicateObjectInArray
};
