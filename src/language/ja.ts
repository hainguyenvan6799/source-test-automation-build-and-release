/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
export default {
  LABEL_PLUGIN_NAME: 'ステータス一括更新設定',
  LABEL_MULTI_SELECT_VIEWS: '“ステータス一括更新“ボタンを配置する一覧を選択してください',
  LABEL_STATUS_HISTORY_TABLE: 'ステータス履歴テーブル設定 (オプション)',
  CAPTION_STATUS_HISTORY_TABLE: 'ステータス履歴を保存するフィールドを指定してください',
  LABEL_TABLE: 'ステータス履歴テーブル (テーブル)',
  LABEL_DATE_AND_TIME: 'アクション実行日時 (日時))',
  LABEL_USER_SELECTION: '処理者 (ユーザー選択))',
  LABEL_STATUS_BEFORE: '処理前のステータス (文字列1行)',
  LABEL_STATUS_AFTER: '処理後のステータス (文字列1行)',
  LABEL_ACTION_NAME: 'アクション名 (文字列1行)',
  BUTTON_CANCEL: 'キャンセル',
  ERROR_SELECT_DIFFERENCE_STATUS: '異なるステータスのレコードが選択されています。同じステータスのレコードのみを選択してください。',
  ERROR_NOT_SELECT_ANY_RECORD: 'ステータス一括更新を実行するレコードが選択されていません',
  ERROR_SELECT_RECORD_THAT_IS_ASSIGNED_INCORRECT_PERSON: '選択されたレコードの中であなたが作業者ではないレコードが存在します。作業者に指定されているレコードのみを選択してください。',
  ERROR_NOT_SELECT_ACTION: 'アクションを選択してください。',
  BUTTON_BULK_STATUS_UPDATE: 'ステータス一括更新',
  SUCCESSFULLY_UPDATE: '更新が完了しました',
  SELECT_ACTION_TO_PERFORM: '実行するアクションを選択してください',
  BUTTON_SUBMIT: '実行',
  SELECT_ASSIGNEE: '次の作業者を選択してください',
  BUTTON_CONFIRM: '確認',
  ERROR_NOT_SELECT_VIEWS: 'ステータス一括更新ボタンを配置する一覧を1つ以上選択してください。',
  PLUGIN_NAME: 'ステータス一括更新',
  FREE_PLUGIN_WARNING_TITLE: '{{PLUGIN_NAME}}プラグインは、このドメインでの使用はサポートされていません。 このアプリケーションからプラグインを削除し、「kintoneシステム管理 > プラグイン」からアンインストールしてください。',
  LOGIN_NAME: 'ログイン名',
  ERROR_DO_NOT_HAVE_EDIT_PERMISSION_TO_SAVE_THE_STATUS_HISTORY: '選択したレコードの編集権限がないため、ステータス履歴テーブルの保存に失敗しました。'
};
