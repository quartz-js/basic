import { ServiceProvider } from '@railken/quartz-core'

import { IndexApi } from '../Api/IndexApi.js'
import { container } from '@railken/quartz-core'
import VueResource from 'vue-resource'
import Vue from 'vue'

export class ApiServiceProvider extends ServiceProvider {
  boot() {

    Vue.use(VueResource);

    var api = new IndexApi()

    return api.index({}).then(response => {

      container.set('api.index', response.body.app);
      container.set('app.events', response.body.app.events.map(val => {
        return {value: val, label: val}
      }))

    })
  }
}