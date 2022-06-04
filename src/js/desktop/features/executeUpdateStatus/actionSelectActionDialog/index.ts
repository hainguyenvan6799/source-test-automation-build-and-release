/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
import {createDiv} from '../../../../../js/components';
import {DEFAULT_OPTION} from '../../../../../js/constant';
import {appService} from '../../../../../js/service';
import Store from '../../../Store';
import {processManagementSettingsType} from '../../../type';
import {appendToBody} from '../../../UICreator';
import I18N from '../../../../../language';
import {showError} from '../showError';
import {Button, Dialog, Dropdown, Label} from '@kintone/kintone-ui-component/esm/js';
import {createSelectAssigneePopup} from './actionSelectAssigneeDialog';
import './index.css';

async function createSelectActionPopup(store: Store, PLUGIN_ID) {
  const selectActionNameDialog = new Dialog({
    isVisible: false,
    showCloseButton: true,
  });
  createHeaderSelectActionPopup(selectActionNameDialog);
  const bodyContent = await createContentSelectActionPopup(store, selectActionNameDialog);
  const footerContent = createFooterSelectActionPopup(selectActionNameDialog);
  appendToBody(selectActionNameDialog);

  footerContent.buttonOK.on('click', () =>
   handleSelectActionName(PLUGIN_ID, store, bodyContent.processManagementSettings, selectActionNameDialog, bodyContent.dropdownActionName)
  );
  footerContent.buttonCancel.on('click', () => selectActionNameDialog.hide());
  return {
    buttonOK: footerContent.buttonOK,
    buttonCancel: footerContent.buttonCancel,
  };
}

function createHeaderSelectActionPopup(myDialog: Dialog) {
  const labelHeader = new Label({text: I18N.SELECT_ACTION_TO_PERFORM});
  labelHeader.render().className = 'labelHeader-select-action-popup';
  myDialog.setHeader(labelHeader.render());
}

async function createContentSelectActionPopup(store: Store, selectAtionNameDialog: Dialog) {
  const initDropdown = new Dropdown();
  const {dropdownActionName, processManagementSettings} = await setActionNameItems(store, initDropdown);
  selectAtionNameDialog.setContent(dropdownActionName.render());
  return {dropdownActionName, processManagementSettings};
}

function createFooterSelectActionPopup(myDialog: Dialog) {
  const buttonOK = new Button({
    text: I18N.BUTTON_SUBMIT,
    type: 'normal',
  });

  const buttonCancel = new Button({
    text: I18N.BUTTON_CANCEL,
    type: 'normal',
  });

  const div = createDiv('footer-modal-container');
  div.appendChild(buttonCancel.render());
  div.appendChild(buttonOK.render());
  myDialog.setFooter(div);
  return {buttonOK, buttonCancel};
}

async function handleSelectActionName(
  PLUGIN_ID,
  store: Store,
  processManagementSettings: processManagementSettingsType,
  selectAtionNameDialog: Dialog,
  selectAtionNameDropdown: Dropdown
) {
  const actionsNameInJson = selectAtionNameDropdown.getValue();
  const actionsNameInObject = actionsNameInJson && JSON.parse(actionsNameInJson);
  if (!actionsNameInJson) {
    await showError(I18N.ERROR_NOT_SELECT_ACTION);
    return;
  }
  selectAtionNameDialog.hide();
  createSelectAssigneePopup(PLUGIN_ID, store, processManagementSettings, actionsNameInObject);
}

async function setActionNameItems(store: Store, dropdownActionName: Dropdown) {
  const processManagementSettings: processManagementSettingsType = await appService.getStatusInProcessManagement();
  const getActionsLeadToNextStatus = await getActionsNameLeadToNextStatus(store);
  const items = getActionsLeadToNextStatus.map((action) => {
    const value = {
      name: action.name,
      from: action.from,
      to: action.to,
    };
    return {
      label: action.name,
      value: JSON.stringify(value),
    };
  });
  items.unshift(DEFAULT_OPTION);

  dropdownActionName.setItems(items);
  dropdownActionName.setValue('');
  return {processManagementSettings, dropdownActionName};
}

async function getActionsNameLeadToNextStatus(store: Store) {
  const processManagementSettings: processManagementSettingsType = await appService.getStatusInProcessManagement();
  const currentStatus: any = getCurrentStatus(store);
  const getActionsLeadToNextStatus = processManagementSettings.actions.filter(
    (action) => action.from === currentStatus
  );
  return getActionsLeadToNextStatus;
}

function getCurrentStatus(store: Store) {
  return store.recordsSelected[0].getAttribute('record-status');
}

export {createSelectActionPopup};
