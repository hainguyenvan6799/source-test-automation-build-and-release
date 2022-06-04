/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
export default {
  LABEL_PLUGIN_NAME: '状态批量更新设置',
  LABEL_MULTI_SELECT_VIEWS: '选择您想要显示“状态批量更新”按钮的列表',
  LABEL_STATUS_HISTORY_TABLE: '状态历史表设置',
  CAPTION_STATUS_HISTORY_TABLE: '请指定要保存的状态和操作者历史记录的字段',
  LABEL_TABLE: '状态历史表（Table）',
  LABEL_DATE_AND_TIME: '日期和时间（Date and time）',
  LABEL_USER_SELECTION: '由（User Selection）',
  LABEL_STATUS_BEFORE: '执行前的状态（Text）',
  LABEL_STATUS_AFTER: '执行后的状态（Text）',
  LABEL_ACTION_NAME: '动作名称 (Text)',
  BUTTON_CANCEL: '取消',
  ERROR_SELECT_DIFFERENCE_STATUS: '请选择状态相同的记录。',
  ERROR_NOT_SELECT_ANY_RECORD: '请选择记录执行状态批量更新。',
  ERROR_SELECT_RECORD_THAT_IS_ASSIGNED_INCORRECT_PERSON: '请选择已经分配给任何人或“登录用户”的记录。',
  ERROR_NOT_SELECT_ACTION: '请选择动作。',
  BUTTON_BULK_STATUS_UPDATE: '状态批量更新',
  SUCCESSFULLY_UPDATE: '更新正常。',
  SELECT_ACTION_TO_PERFORM: '选择合适的动作',
  BUTTON_SUBMIT: '确定',
  SELECT_ASSIGNEE: '选择作業者',
  BUTTON_CONFIRM: '确认',
  ERROR_NOT_SELECT_VIEWS: '请选择至少一个列表用来显示“状态批量更新”按钮。',
  PLUGIN_NAME: '状态批量更新',
  FREE_PLUGIN_WARNING_TITLE: '{{PLUGIN_NAME}} 插件不被支持在此域中使用。 请从本应用中删除插件，并从“kintone系统管理 > 插件”中卸载。',
  LOGIN_NAME: '登录名',
  ERROR_DO_NOT_HAVE_EDIT_PERMISSION_TO_SAVE_THE_STATUS_HISTORY: "没有所选记录的编辑权限，状态履历表保存失败。"
};
