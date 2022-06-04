/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
import {checkDomainValid, getInvalidDomainHTML} from '@kintone-plugins/free-plugin-usage-regions';
import I18N from '../../language';
import {appService} from '../service';
import {prepareData, registerEvent} from './features';
import {PluginSettings} from './PluginSettings';

(async (PLUGIN_ID: string) => {
  const isValid = checkDomainValid(ENCRYPTED_DOMAINS);
  if (!isValid) {
   const root = document.getElementById('root');
   const pluginLayout: any = root?.firstChild;
   root?.removeChild(pluginLayout);
   root?.appendChild(getInvalidDomainHTML({
    title: I18N.FREE_PLUGIN_WARNING_TITLE.replace('{{PLUGIN_NAME}}', I18N.PLUGIN_NAME),
   }));
   return;
  }
  const getViews = await appService.getViews();
  const getForm = await appService.getForm();
  const pluginSettings = new PluginSettings();

  await pluginSettings.initUi(getViews, getForm);
  registerEvent(pluginSettings);
  prepareData(PLUGIN_ID, pluginSettings);
})(kintone.$PLUGIN_ID);

