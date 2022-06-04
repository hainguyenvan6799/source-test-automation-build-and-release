/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
type actionResponseType = {
  from: string;
  to: string;
  name: string;
};

type eventResponseType = {
  viewId: number;
  records: any;
  viewName: string;
  offset: number;
};

type processManagementSettingsType = {
  states: any[];
  actions: any[];
};

export {actionResponseType, eventResponseType, processManagementSettingsType};
