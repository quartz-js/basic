import { ServiceProvider } from '@railken/quartz-core'

import Router from 'vue-router'
import { container } from '@railken/quartz-core'
import Vue from 'vue'

export class RouterServiceProvider extends ServiceProvider {

  register() {
    container.set('$vue.routes', require('../../routes').default);
  }

  boot() {

    Vue.use(Router)

    var router = new Router({
      scrollBehavior () {
        return { x: 0, y: 0 }
      },
      routes: container.get('$vue.routes'),
      hashbang: false,
      history: true,
      mode: 'history'
    })

    container.set("$vue.router", router)
  }
}