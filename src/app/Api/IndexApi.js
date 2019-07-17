import Vue from 'vue'
import { container } from '@quartz/core'

export class IndexApi {
  constructor () {
    this.url = container.get('config').app.api.url;
    this.access_token = container.get('oauth').getToken()
  }

  /**
   * Index
   *
   * @param {Object} params
   *
   * @return {Promise}
   */
  index (params) {
    return Vue.http.get(this.url, {
      params: params,
      headers: {
        Authorization: 'Bearer ' + this.access_token
      }
    })
  }
}