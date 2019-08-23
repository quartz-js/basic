import { container, ResourceApi } from '@quartz/core'

export class IndexApi extends ResourceApi {

  /**
   * Index
   *
   * @param {Object} params
   *
   * @return {Promise}
   */
  index (params) {
    return this.get('', params)
  }
}