import { ServiceProvider } from '@quartz/core'

import { container } from '@quartz/core'
import Vue from 'vue'

export class RouterServiceProvider extends ServiceProvider {

  register() {
    container.set('$vue.routes', require('../../routes').default);
  }

  boot() {
  }
}