/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
import {RadioButton} from '@kintone/kintone-ui-component/esm/js';
import {actionResponseType} from '../../../../type';

function prepareDataForUpdateStatus(assigneeRadioBtn: RadioButton | null, actionNameValue: actionResponseType) {
  const currenttime = new Date();
  const timestamp = currenttime.toISOString();
  return {
    datetime: timestamp,
    assignee: assigneeRadioBtn ? assigneeRadioBtn.getValue() : '',
    statusBefore: actionNameValue.from,
    statusAfter: actionNameValue.to,
    actionName: actionNameValue.name,
  };
}

export {prepareDataForUpdateStatus};
