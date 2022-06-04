/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
import {eventResponseType} from '../type';
import {getPluginConfig} from '../utils';

function isViewAllowed(PLUGIN_ID, event: eventResponseType) {
  const currentViewId = `${event.viewId}`;
  const currentViewName = event.viewName;

  const pluginConfig = getPluginConfig(PLUGIN_ID);
  const viewsConfig = pluginConfig ? JSON.parse(pluginConfig.multiSelectViews) : [];

  if (viewsConfig.includes(currentViewId) || viewsConfig.includes(currentViewName)) {
    return true;
  }
  return false;
}

export {isViewAllowed};
