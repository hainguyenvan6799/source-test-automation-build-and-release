/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
const ROOT_CONTENT = 'root-content';
const PATH = {
  GET_VIEWS: 'app/views',
  GET_FORM: 'form',
  GET_FORM_LAYOUT: 'app/form/layout',
  GET_STATUS_MANAGEMENT: 'app/status',
  UPDATE_RECORD_STATUS: 'record/status',
  RECORDS: 'records',
  RECORD: 'record',
  RECORDS_EVALUATE: 'records/acl/evaluate',
  GET_USERS_IN_GROUP: '/v1/group/users',
  GET_USER_IN_DEPARTMENT: '/v1/organization/users',
  GET_USERS_INFO: '/v1/users',
};
const CONDITION = {
  TYPE_SUBTABLE: 'SUBTABLE',
};
const LIMIT = {
  KINTONE_API_UPDATE_RECORDS_LIMITATION: 100,
  KINTONE_API_GET_RECORDS_LIMITATION: 500,
  KINTONE_EVALUATE_RECORDS_LIMITATION: 100,
  KINTONE_GET_USERS_LIMITATION: 100,
};

const FIELD_TYPE = {
  DATETIME: 'DATETIME',
  USER_SELECT: 'USER_SELECT',
  SINGLE_LINE_TEXT: 'SINGLE_LINE_TEXT',
};

const VIEW_NAME = {
  ALL_RECORD_VIEW: '(All records)',
};

const DEFAULT_OPTION = {
  label: 'Select an option',
  value: '',
};

const VIEW_ALL = {
  label: 'All records',
  value: '(All records)',
}

const VIEW_ALL_FIELDS = {
  label: 'All fields',
  value: '(All fields)',
};

const ERROR_CODE_NO_PRIVILEGE_TO_PROCEED = 'CB_NO02';

export {
  ROOT_CONTENT,
  PATH,
  CONDITION,
  LIMIT,
  FIELD_TYPE,
  VIEW_NAME,
  DEFAULT_OPTION,
  VIEW_ALL,
  VIEW_ALL_FIELDS,
  ERROR_CODE_NO_PRIVILEGE_TO_PROCEED
};
