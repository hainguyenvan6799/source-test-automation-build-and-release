/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
import {Dropdown, MultipleChoice} from '@kintone/kintone-ui-component/esm/js';
import {actionIfChangeSubtableField} from '../features/handleEvent';
import {PluginSettingsType, configValuesType} from '../type';

function prepareData(PLUGIN_ID: string, pluginSettings: PluginSettingsType) {
  const previousConfig = getPreviousConfig(PLUGIN_ID);
  if (previousConfig) {
    setPreviousConfig(pluginSettings, previousConfig);
  }
  if (!pluginSettings.subtableDropdown.getValue()) {
    pluginSettings.setEnableListDropdown(pluginSettings.dropdowns, false);
  }
}

function getPreviousConfig(PLUGIN_ID: string) {
  const config = kintone.plugin.app.getConfig(PLUGIN_ID);
  if (Object.keys(config).length > 0) {
    return config;
  }
  return null;
}

function setPreviousConfig(pluginSettings: PluginSettingsType, config: configValuesType) {
  setValueMultiSelect(pluginSettings.viewsMultiChoice, JSON.parse(config.multiSelectViews));
  if (pluginSettings.subtableFields.length === 0) {
    return;
  }
  setValueSubtableDropdown(pluginSettings, config);
  setValueDropdown(pluginSettings.dropdowns.dateTimeDropdown, config.dateTimeDropdown);
  setValueDropdown(pluginSettings.dropdowns.userSelectionDropdown, config.userSelectionDropdown);
  setValueDropdown(pluginSettings.dropdowns.statusBeforeDropdown, config.statusBeforeDropdown);
  setValueDropdown(pluginSettings.dropdowns.statusAfterDropdown, config.statusAfterDropdown);
  setValueDropdown(pluginSettings.dropdowns.actionNameDropdown, config.actionNameDropdown);
}

function setValueMultiSelect(multiSelect: MultipleChoice, newValues: string[]) {
  const multiChoiceItems = multiSelect.getItems()?.map((item) => item.value) || [];
  const newValuesExist = newValues.filter((item) => multiChoiceItems.includes(item));
  newValuesExist.length > 0 && multiSelect.setValue(newValuesExist);
}

function setValueSubtableDropdown(pluginSettings: PluginSettingsType, config: configValuesType) {
  setValueDropdown(pluginSettings.subtableDropdown, config.tableDropdown);
  actionIfChangeSubtableField(pluginSettings);
}

function setValueDropdown(dropdown: Dropdown, newValue: string) {
  dropdown.getItems()?.some((item) => item.value === newValue) && dropdown.setValue(newValue);
}

export {prepareData};
