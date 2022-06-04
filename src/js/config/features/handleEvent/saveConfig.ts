/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
import {PluginSettingsType} from '../../type';
import I18N from '../../../../language';
import Swal from 'sweetalert';

function savePluginConfig(pluginSettings: PluginSettingsType) {
  if (checkEmptyView(pluginSettings.viewsMultiChoice.getValue())) {
    const pluginLayout: any = document.querySelector('.plugin-layout');
    if (pluginLayout) {
      Swal({
        icon: 'error',
        title: 'Error',
        text: I18N.ERROR_NOT_SELECT_VIEWS,
      });
      const sweetalertPopupElement = document.querySelector('.swal-overlay');
      pluginLayout.appendChild(sweetalertPopupElement);
    }
    return;
  }
  const config = {
    tableDropdown: pluginSettings.subtableDropdown.getValue(),
    dateTimeDropdown: pluginSettings.dropdowns.dateTimeDropdown.getValue() || '',
    userSelectionDropdown: pluginSettings.dropdowns.userSelectionDropdown.getValue() || '',
    statusBeforeDropdown: pluginSettings.dropdowns.statusBeforeDropdown.getValue() || '',
    statusAfterDropdown: pluginSettings.dropdowns.statusAfterDropdown.getValue() || '',
    actionNameDropdown: pluginSettings.dropdowns.actionNameDropdown.getValue() || '',
    multiSelectViews: JSON.stringify(pluginSettings.viewsMultiChoice.getValue()),
  };
  kintone.plugin.app.setConfig(config);
}

function checkEmptyView(values) {
  return values.length === 0;
}

export {savePluginConfig};
