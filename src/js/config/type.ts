/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
import {Dropdown} from '@kintone/kintone-ui-component/esm/js';
import {PluginSettings} from './PluginSettings';

export type dropdowns = {
  dateTimeDropdown: Dropdown;
  userSelectionDropdown: Dropdown;
  statusBeforeDropdown: Dropdown;
  statusAfterDropdown: Dropdown;
  actionNameDropdown: Dropdown;
};

export type configValuesType = {
  multiSelectViews: string;
  tableDropdown: string;
  dateTimeDropdown: string;
  userSelectionDropdown: string;
  statusBeforeDropdown: string;
  statusAfterDropdown: string;
  actionNameDropdown: string;
};

export type PropertyObject = {
  type: string;
  code: string;
  label: string;
};

export type PluginSettingsType = PluginSettings;
