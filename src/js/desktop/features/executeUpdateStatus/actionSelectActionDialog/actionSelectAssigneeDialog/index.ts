/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
import {createDiv} from '../../../../../../js/components';
import Store from '../../../../Store';
import {actionResponseType, processManagementSettingsType} from '../../../../type';
import {appendToBody} from '../../../../UICreator';
import I18N from '../../../../../../language';
import {Button, Dialog, Label, RadioButton} from '@kintone/kintone-ui-component/esm/js';
import {prepareDataForUpdateStatus} from './prepareDataForUpdateStatus';
import {updateStatusAndSaveHistory} from './updateStatusAndSaveHistory';
import {removeDupplicateObjectInArray} from '../../../../utils';
import {appService} from '../../../../../service';
import './index.css';

async function createSelectAssigneePopup(
  PLUGIN_ID,
  store: Store,
  processManagementSettings: processManagementSettingsType,
  actionNameValue: actionResponseType
) {
  const selectAssigneeDialog = new Dialog({
    isVisible: false,
    showCloseButton: true,
  });
  createHeaderSelectAssigneePopup(selectAssigneeDialog);
  const contentSelectAssigneePopup = await
   createContentSelectAssigneePopup(PLUGIN_ID, store, processManagementSettings, actionNameValue, selectAssigneeDialog);
  if (!contentSelectAssigneePopup) {
    return;
  }
  const footerContentSelectAssigneePopup = createFooterSelectAssigneePopup(selectAssigneeDialog);
  footerContentSelectAssigneePopup.buttonConfirm.on('click', () => contentSelectAssigneePopup &&
    handleClickConfirm(PLUGIN_ID, store, actionNameValue, contentSelectAssigneePopup.assigneeRadioBtn)
  );
  footerContentSelectAssigneePopup.buttonCancel.on('click', () => selectAssigneeDialog.hide());
  appendToBody(selectAssigneeDialog);
}

async function handleClickConfirm(PLUGIN_ID, store: Store, actionNameValue: actionResponseType, assigneeRadioBtn: RadioButton) {
  const paramsStatusUpdate = prepareDataForUpdateStatus(assigneeRadioBtn, actionNameValue);
  await updateStatusAndSaveHistory(store, PLUGIN_ID, paramsStatusUpdate);
}

function getItemsForAssigneeRadioButtonList(processManagementSettings: processManagementSettingsType, dropdownValue: actionResponseType) {
  let items: any[] = [];
  for (const key in processManagementSettings.states) {
    if (processManagementSettings.states[key].name === dropdownValue.to) {
      if (processManagementSettings.states[key].assignee.type === 'ONE') {
        items = [...processManagementSettings.states[key].assignee.entities];
      }
    }
  }
  if (items.length <= 0) {
    return null;
  }
  return items;
}

function createHeaderSelectAssigneePopup(myDialog) {
  const labelHeader = new Label({text: I18N.SELECT_ASSIGNEE});
  labelHeader.render().className = 'labelHeader-select-assignee-popup';
  myDialog.setHeader(labelHeader.render());
}

async function createContentSelectAssigneePopup(
  PLUGIN_ID,
  store: Store,
  processManagementSettings: processManagementSettingsType,
  actionNameValue: actionResponseType,
  selectAssigneeDialog: Dialog
) {
  const assigneeRadioBtn = new RadioButton({
    name: 'assignee',
  });
  const assigneeListItems = getItemsForAssigneeRadioButtonList(processManagementSettings, actionNameValue);
  if (!assigneeListItems) {
    const paramsStatusUpdate = prepareDataForUpdateStatus(null, actionNameValue);
    await updateStatusAndSaveHistory(store, PLUGIN_ID, paramsStatusUpdate);
    return;
  }
  const assigneeListFiltered = await getAssigneeBaseOnType(store, assigneeListItems);
  if (assigneeListFiltered.length === 0) {
    return null;
  }
  const userCodes = assigneeListFiltered.map(assignee => assignee.value);
  const usersInfo = await appService.getUsers(userCodes);
  const assigneeItems = usersInfo.map(user => {
    return {
      label: `${user.name} (${I18N.LOGIN_NAME}: ${user.code})`,
      value: user.code
    }
  })
  assigneeRadioBtn.setItems(assigneeItems);
  assigneeRadioBtn.setValue(assigneeItems[0].value);
  selectAssigneeDialog.setContent(assigneeRadioBtn.render());
  return {assigneeRadioBtn};
}

async function getAssigneeBaseOnType(store: Store, assigneeListItems) {
  let assigneeListTemp: any[] = [];
  await Promise.all(assigneeListItems.map(async assigneeItem => {
    const entityCode = assigneeItem.entity.code;
    switch(assigneeItem.entity.type) {
      case 'USER': {
        assigneeListTemp = assigneeListTemp.concat(getAssigneeUserType(entityCode));
        break;
      }
      case 'FIELD_ENTITY': {
        assigneeListTemp = assigneeListTemp.concat(getAssigneeFieldEntityType(store, entityCode));
        break;
      }
      case 'GROUP': {
        const assignee = await getAssigneeInGroup(entityCode);
        assigneeListTemp = assigneeListTemp.concat(assignee);
        break;
      }
      case 'ORGANIZATION': {
        const assignee = await getAssigneeInDepartment(entityCode);
        assigneeListTemp = assigneeListTemp.concat(assignee);
        break;
      }
    }
    return assigneeItem;
  }));
  const assigneeListFiltered = removeDupplicateObjectInArray(assigneeListTemp);
  return assigneeListFiltered;
}

function getAssigneeUserType(entityCode) {
  return {
    label: entityCode,
    value: entityCode,
  }
}

function getAssigneeFieldEntityType(store: Store, entityCode) {
  const recordSelectedIds = store.recordsSelected.map(element => element.value);
  const records = store.allRecords.filter(record => recordSelectedIds.includes(record.$id.value))
  const assigneeListTemp: any[] = [];
  records.forEach(record => {
    if (record[entityCode].type === 'USER_SELECT') {
      record[entityCode].value.forEach(item => {
        assigneeListTemp.push({
          label: item.code,
          value: item.code
        });
      });
    } else {
      assigneeListTemp.push({
        label: record[entityCode].value.code,
        value: record[entityCode].value.code
      })
    }
  });
  return assigneeListTemp;
}

async function getAssigneeInGroup(entityCode) {
  const assigneeListTemp: any[] = [];
  const usersInGroup = await appService.getUsersInGroup(entityCode);
  usersInGroup.users.forEach(user => {
    assigneeListTemp.push({
      label: user.code,
      value: user.code
    });
  });
  return assigneeListTemp;
}

async function getAssigneeInDepartment(entityCode) {
  const assigneeListTemp: any[] = [];
  const usersInDepartment = await appService.getUsersInDepartment(entityCode);
  usersInDepartment.userTitles.forEach(userTitle => {
    assigneeListTemp.push({
      label: userTitle.user.code,
      value: userTitle.user.code
    });
  });
  return assigneeListTemp;
}

function createFooterSelectAssigneePopup(selectAssigneeDialog: Dialog) {
  const buttonConfirm = new Button({
    text: I18N.BUTTON_CONFIRM,
    type: 'normal',
  });
  const buttonCancel = new Button({
    text: I18N.BUTTON_CANCEL,
    type: 'normal',
  });
  const div = createDiv('footer-modal-container');
  div.appendChild(buttonCancel.render());
  div.appendChild(buttonConfirm.render());
  selectAssigneeDialog.setFooter(div);
  return {div, buttonConfirm, buttonCancel};
}

export {createSelectAssigneePopup};
