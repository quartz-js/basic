import { ServiceProvider } from '@quartz/core'

import { IndexApi } from '../Api/IndexApi.js'
import { container } from '@quartz/core'
import VueResource from 'vue-resource'
import Vue from 'vue'

export class ApiServiceProvider extends ServiceProvider {
  boot() {

    Vue.use(VueResource);

    var api = new IndexApi()

    return api.index({}).then(response => {
      container.set('api.index', response.body.app);
    }).catch(response => {
      alert('Cannot contact API');
    })
  }
}