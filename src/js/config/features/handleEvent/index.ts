/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
import {PluginSettingsType} from '../../type';
import {actionIfChangeSubtableField} from './actionIfChangeSubtableField';
import {checkUniqueDropdownField} from './checkUniqueDropdownField';
import {savePluginConfig} from './saveConfig';

function registerEvent(pluginSettings: PluginSettingsType) {
  pluginSettings.subtableDropdown.on('change', () => actionIfChangeSubtableField(pluginSettings));

  const fieldsTextDropdown = [
    pluginSettings.dropdowns.statusBeforeDropdown,
    pluginSettings.dropdowns.statusAfterDropdown,
    pluginSettings.dropdowns.actionNameDropdown,
  ];

  fieldsTextDropdown.forEach((element) => {
    element.on('change', () => checkUniqueDropdownField(fieldsTextDropdown, element, pluginSettings));
  });

  const buttonCancel = document.querySelector('.button-group__cancel') as HTMLElement;
  const buttonSubmit = document.querySelector('.button-group__save') as HTMLElement;
  buttonSubmit.addEventListener('click', () => savePluginConfig(pluginSettings));
  buttonCancel.addEventListener('click', () => window.location.replace(`/k/admin/app/${kintone.app.getId()}/plugin/#/`));
}

export {registerEvent, actionIfChangeSubtableField};
