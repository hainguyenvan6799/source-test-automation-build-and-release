/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
class BaseApi {
  private baseUrl = '/k/v1/';

  protected get(url: string, body: Record<string, any>): Promise<any> {
    return kintone.api(kintone.api.url(`${this.baseUrl}${url}`, true), 'GET', body);
  }
  protected put(url: string, body: Record<string, any>) :Promise<any> {
    return kintone.api(kintone.api.url(`${this.baseUrl}${url}`, true), 'PUT', body);
  }
}

export default BaseApi;