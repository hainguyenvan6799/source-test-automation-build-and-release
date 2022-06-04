/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
import {Button, Dialog} from '@kintone/kintone-ui-component/esm/js';
import I18N from '../../../language';
import './index.css';
function createTableData() {
  const tdDom = document.createElement('td');
  tdDom.className = 'recordlist-cell-gaia td-contains-checkbox';
  return tdDom;
}

function createCheckBoxSelectAll(id) {
  const checkBoxDom = document.createElement('input');
  checkBoxDom.type = 'checkbox';
  checkBoxDom.checked = false;
  checkBoxDom.id = id;
  return checkBoxDom;
}

function createRecordCheckBox(records, rowIndex, isElementDisabled = false) {
  const recordId = records[rowIndex].$id.value;
  const checkBoxDom = document.createElement('input');
  checkBoxDom.type = 'checkbox';
  checkBoxDom.value = recordId;
  checkBoxDom.name = 'record-checkbox';
  checkBoxDom.id = `record-checkbox-${recordId}`;
  checkBoxDom.disabled = isElementDisabled;
  checkBoxDom.checked = false;
  checkBoxDom.setAttribute('record-status', records[rowIndex].Status.value);
  checkBoxDom.setAttribute('record-assignee', JSON.stringify(records[rowIndex].Assignee.value));
  return checkBoxDom;
}

function createTableHeaderData() {
  const thDom = document.createElement('th');
  thDom.className = 'recordlist-header-cell-gaia select-all';
  return thDom;
}

function createUpdateStatusButton() {
  const button = new Button({
    text: I18N.BUTTON_BULK_STATUS_UPDATE,
    type: 'normal'
  });
  const buttonDom = button.render();
  buttonDom.className = 'bulk-attachment-upload-button';
  buttonDom.id = 'button-update-status';
  return button;
}

function addCheckBoxSelectAll(tableHeader: Element, checkBoxSelectAll: HTMLInputElement) {
  const thInTableHeader = tableHeader.querySelector('.select-all');
  if (thInTableHeader && thInTableHeader.firstChild) {
    thInTableHeader.replaceChild(thInTableHeader.firstChild, checkBoxSelectAll);
  } else {
    const thDom = createTableHeaderData();
    thDom.appendChild(checkBoxSelectAll);
    tableHeader.insertBefore(thDom, tableHeader.childNodes[0]);
  }
}

function addCheckBoxRecord(tr: HTMLElement, recordCheckBox) {
  const tdDom = createTableData();
  tdDom.appendChild(recordCheckBox);
  if (!tr.querySelector('.td-contains-checkbox')) {
    tr.insertBefore(tdDom, tr.childNodes[0]);
  } else {
    tr.removeChild(tr.childNodes[0]);
    tr.insertBefore(tdDom, tr.childNodes[0]);
  }
}

function appendToBody(myDialog: Dialog) {
  const body = document.getElementsByTagName('body')[0];
  body.appendChild(myDialog.render());
  myDialog.show();
}

export {
  createTableData,
  createRecordCheckBox,
  createTableHeaderData,
  createCheckBoxSelectAll,
  createUpdateStatusButton,
  addCheckBoxSelectAll,
  addCheckBoxRecord,
  appendToBody,
};
