/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
import {Dropdown} from '@kintone/kintone-ui-component/esm/js';
import {PluginSettingsType} from '../../type';

function actionIfChangeSubtableField(pluginSettings: PluginSettingsType) {
  const value = pluginSettings.subtableDropdown.getValue();
  if (!value) {
    pluginSettings.setEnableListDropdown(pluginSettings.dropdowns, false);
    return;
  }
  pluginSettings.subtableFields.forEach((item) => {
    if (item.code === value) {
      pluginSettings.fieldsWithinTable = item.fields;
    }
  });
  pluginSettings.setEnableListDropdown(pluginSettings.dropdowns);
  pluginSettings.setOptionsForDropdownDatetimeField();
  pluginSettings.setOptionsForDropdownUserSelectionField();
  pluginSettings.setOptionsForDropdownTextField();
  setEmptyValueForDropdown(pluginSettings);
}

function setEmptyValueForDropdown(pluginSettings: PluginSettingsType) {
  [
    pluginSettings.dropdowns.dateTimeDropdown,
    pluginSettings.dropdowns.userSelectionDropdown,
    pluginSettings.dropdowns.statusBeforeDropdown,
    pluginSettings.dropdowns.statusAfterDropdown,
    pluginSettings.dropdowns.actionNameDropdown,
  ].forEach((dropdown: Dropdown) => dropdown.setValue(''));
}

export {
  actionIfChangeSubtableField
};
