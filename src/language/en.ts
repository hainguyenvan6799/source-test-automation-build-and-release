/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
export default {
  LABEL_PLUGIN_NAME: 'Settings for Bulk Status Update',
  LABEL_MULTI_SELECT_VIEWS: 'Select the views where you want to have the “Bulk Status Update” button',
  LABEL_STATUS_HISTORY_TABLE: 'Status History Table Settings (Optional)',
  CAPTION_STATUS_HISTORY_TABLE: 'Please select fields to save status history',
  LABEL_TABLE: 'Status History Table (Table)',
  LABEL_DATE_AND_TIME: 'Action Date time (Date and Time)',
  LABEL_USER_SELECTION: 'Processed By (User Selection)',
  LABEL_STATUS_BEFORE: 'Current Status (Text)',
  LABEL_STATUS_AFTER: 'Next Status (Text)',
  LABEL_ACTION_NAME: 'Action Name (Text)',
  BUTTON_CANCEL: 'CANCEL',
  ERROR_SELECT_DIFFERENCE_STATUS: 'Records in different statuses are selected. Please select records in the same status.',
  ERROR_NOT_SELECT_ANY_RECORD: 'No records selected. Please select records to process the bulk status update.',
  ERROR_SELECT_RECORD_THAT_IS_ASSIGNED_INCORRECT_PERSON:
   'Record(s) which are not assigned to you have been selected. Please select records where you are an assignee.',
  ERROR_NOT_SELECT_ACTION: 'Please select an action',
  BUTTON_BULK_STATUS_UPDATE: 'Bulk Status Update',
  SUCCESSFULLY_UPDATE: 'Successfully Updated',
  SELECT_ACTION_TO_PERFORM: 'Select an action to perform',
  BUTTON_SUBMIT: 'SUBMIT',
  SELECT_ASSIGNEE: 'Select a next assignee',
  BUTTON_CONFIRM: 'CONFIRM',
  ERROR_NOT_SELECT_VIEWS: 'Please select at least one view to place the “Bulk Status Update” button.',
  PLUGIN_NAME: 'Bulk Status Update',
  FREE_PLUGIN_WARNING_TITLE: '{{PLUGIN_NAME}} plug-in is not supposed to be utilized in this domain. Please remove the plug-in from this app and uninstall it from "Kintone Administration > Plug-ins".',
  LOGIN_NAME: 'Login Name',
  ERROR_DO_NOT_HAVE_EDIT_PERMISSION_TO_SAVE_THE_STATUS_HISTORY: "Failed to save the status history table because you don't have edit permission for selected records."
};
