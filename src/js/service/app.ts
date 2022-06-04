/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
import swal from 'sweetalert';
import {ERROR_CODE_NO_PRIVILEGE_TO_PROCEED, LIMIT, PATH} from '../constant';
import BaseApi from './base';
import I18N from '../../language';

export default class AppService extends BaseApi {
  async getViews() {
    const body = {
      app: kintone.app.getId(),
      lang: kintone.getLoginUser().language,
    };
    const responseViews = await this.get(PATH.GET_VIEWS, body);
    return responseViews;
  }

  async getForm() {
    const body = {
      app: kintone.app.getId()
    };
    const responseForm = await this.get(PATH.GET_FORM, body);
    return responseForm;
  }

  async getFormLayout() {
    const body = {
      app: kintone.app.getId()
    };
    const responseFormLayout = await this.get(PATH.GET_FORM_LAYOUT, body);
    return responseFormLayout;
  }

  async getStatusInProcessManagement() {
    const body = {
      app: kintone.app.getId()
    };
    const responseStatusInProcessManagement = await this.get(PATH.GET_STATUS_MANAGEMENT, body);
    return responseStatusInProcessManagement;
  }

  updateRecordsStatus(records, params, recordIndex = 0) {
    let index = recordIndex;
    const paramsStatusUpdate = {
      recordId: records[index].id,
      action: params.actionName,
      assignee: params.assignee
    };
    return this.updateRecordStatus(paramsStatusUpdate)
    .then((response) => this.updateStatusHistory(response, records, index))
    .then((response) => this.recursiveUpdateRecordStatus(response, records, index, params))
    .catch(async error => {
      await swal({
        icon: 'error',
        title: 'Error',
        text: error.message
      });
      return error;
    });
  };

  updateStatusHistory(response, records, index) {
    if (response.success) {
      return this.updateRecord(records[index]).catch((error) => {
        if (error.code === ERROR_CODE_NO_PRIVILEGE_TO_PROCEED) {
          throw new Error(I18N.ERROR_DO_NOT_HAVE_EDIT_PERMISSION_TO_SAVE_THE_STATUS_HISTORY);
        }
      });
    }
    return response;
  }

  recursiveUpdateRecordStatus(response, records, index, params) {
    index++;
    if (index < records.length) {
      return this.updateRecordsStatus(records, params, index);
    }
    return response;
  }

  async updateRecordStatus({recordId, action, assignee}) {
    const body = {
      app: kintone.app.getId(),
      id: recordId,
      action,
      assignee
    };
    try {
      const responseAfterUpdateStatus = await this.put(PATH.UPDATE_RECORD_STATUS, body);
      return {success: true, responseAfterUpdateStatus};
    } catch(error) {
      await swal({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
      return {success: false, responseAfterUpdateStatus: null};
    }
  }

  async updateRecord(record) {
    const body = {
      app: kintone.app.getId(),
      id: record.id,
      record: record.record,
    }
    const responseUpdateRecord = await this.put(PATH.RECORD, body);
    return responseUpdateRecord;
  }

  updateRecords(records) {
    const isOverUpdateLimitation = records.length > LIMIT.KINTONE_API_UPDATE_RECORDS_LIMITATION;
    const endId =
      isOverUpdateLimitation
        ? LIMIT.KINTONE_API_UPDATE_RECORDS_LIMITATION
        : records.length;
    const body = {
      app: kintone.app.getId(),
      records: records.slice(0, endId)
    };
    return this.put(PATH.RECORDS, body).then(() => {
      if (isOverUpdateLimitation) {
        return this.updateRecords(records.slice(LIMIT.KINTONE_API_UPDATE_RECORDS_LIMITATION));
      }
    });
  }

  fetch_fast(selectedIds: string[] = [], opt_records = [], opt_last_record_id = null) {
    let records = opt_records;
    let query = kintone.app.getQueryCondition();
    if (opt_last_record_id) {
      query += query ? ` and $id > ${opt_last_record_id}` : `$id > ${opt_last_record_id}`;
    }
    if (selectedIds.length > 0) {
      query += query ? ` and $id in (${selectedIds.toString()})` : `$id in (${selectedIds.toString()})`;
    }
    query += ` order by $id asc limit ${LIMIT.KINTONE_API_GET_RECORDS_LIMITATION}`;
    const body = {
      app: kintone.app.getId(),
      query,
    };
    return this.get(PATH.RECORDS, body).then((response) => {
      records = records.concat(response.records);
      if (response.records.length === LIMIT.KINTONE_API_GET_RECORDS_LIMITATION) {
        return this.fetch_fast(
          selectedIds,
          records,
          response.records[response.records.length - 1].$id.value,
        );
      }
      return records;
    });
  }

  evaluateRecordPermission(recordIds, opt_records = []) {
    let records = [...opt_records];
    const isOverEvaluationRecordsLimitation = recordIds.length > LIMIT.KINTONE_EVALUATE_RECORDS_LIMITATION;
    const endId =
      isOverEvaluationRecordsLimitation
        ? LIMIT.KINTONE_EVALUATE_RECORDS_LIMITATION
        : recordIds.length;
    const body = {
      app: kintone.app.getId(),
      ids: recordIds.slice(0, endId)
    }
    return this.get(PATH.RECORDS_EVALUATE, body).then((response) => {
      records = records.concat(response.rights);
      if (isOverEvaluationRecordsLimitation) {
        return this.evaluateRecordPermission(recordIds.slice(LIMIT.KINTONE_EVALUATE_RECORDS_LIMITATION), records);
      }
      return records;
    });
  }

  getUsersInGroup(groupCode) {
    const body = {
      code: groupCode
    };
    return kintone.api(kintone.api.url(PATH.GET_USERS_IN_GROUP), 'GET', body);
  }

  getUsersInDepartment(departmentCode) {
    const body = {
      code: departmentCode
    };
    return kintone.api(kintone.api.url(PATH.GET_USER_IN_DEPARTMENT), 'GET', body);
  }

  getUsers(userCodes, userInfos = []) {
    let containerUsersInfo = [...userInfos];
    const isOverUpdateLimitation = userCodes.length > LIMIT.KINTONE_GET_USERS_LIMITATION;
    const endId =
      isOverUpdateLimitation
        ? LIMIT.KINTONE_GET_USERS_LIMITATION
        : userCodes.length;
    const body = {
      codes: userCodes.slice(0, endId)
    };
    return kintone.api(kintone.api.url(PATH.GET_USERS_INFO), 'GET', body).then((response) => {
      containerUsersInfo = containerUsersInfo.concat(response.users);
      if (isOverUpdateLimitation) {
        return this.getUsers(userCodes.slice(LIMIT.KINTONE_GET_USERS_LIMITATION));
      }
      return containerUsersInfo;
    });
  }
}