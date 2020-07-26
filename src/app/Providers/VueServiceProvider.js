import { ServiceProvider } from '@quartz/core'

import { container } from '@quartz/core'
import { Ripple } from 'vuetify/lib/directives'
import VueLocalStorage from 'vue-localstorage'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import VueI18n from 'vue-i18n'
import QuartzCore from '@quartz/core'
import App from '@/App'
import Router from 'vue-router'
import { StyleService } from '@quartz/style/src/app/StyleService'
const axios = require('axios');
import VueApexCharts from 'vue-apexcharts'
import { Dictionary } from '@quartz/data-view/src/app/Services/Dictionary'
import _ from 'lodash'

export class VueServiceProvider extends ServiceProvider {

  register() {
    container.get('$quartz.settings').addItem({
      name: 'sidebar',
      header: () => import('../../components/SettingsSidebarHeader'),
      content: () => import('../../components/SettingsSidebarContent')
    })
  }

  boot() {

    Vue.config.productionTip = false

    Vue.use(QuartzCore) 
    Vue.use(VueLocalStorage)
    Vue.use(VueI18n)

    Vue.use(VueApexCharts)
    Vue.component('apexchart', VueApexCharts)

    this.loadComponents()(Vue);

    var i18n = new VueI18n({
      locale: container.get('settings').get('language', 'en'),
      silentTranslationWarn: false,
      messages: container.get('$quartz.lang')
    });

    container.get('axios').defaults.headers.common["Accept-Language"] = container.get('settings').get('language', 'en')

    Vue.use(Vuetify, {
      directives: {
        Ripple
      }
    })


    let vuetify = new Vuetify({
      theme: StyleService.getTheme()
    })

    /*Vue.use(Vuetify, {
      lang: {
        t: (key, ...params) => i18n.t(key, params)
      }
    })*/

    let routes = container.get('$vue.routes')

    Vue.use(Router)

    var router = new Router({
      scrollBehavior () {
        return { x: 0, y: 0 }
      },
      routes: routes,
      history: true,
    })

    container.set("$vue.router", router)

    container.set('yaml', require('js-yaml'))
    
    var v = new Vue({
      vuetify,
      i18n: i18n,
      router,
      template: '<App/>',
      components: { App },
      data: {
        container: container,
        user: container.get('user'),
        config: container.get('config')
      },
      methods: {
        parseYaml(string) {
          return require('js-yaml').load(string)
        }
      }
    })

    StyleService.boot();
    container.set('$vue.app', v);

    v.$mount('#app')

    window.bus = v

    container.set('translator', v._i18n)

    container.get('settings').setDefault('template', {
      'title': true,
      'search': true,
      'notification': true,
      'services': true,
      'leftNavEnabled': true,
      'leftNavItems': [
        {
          url: '/dashboard',
          label: 'Dashboard',
          icon: 'dashboard'
        }
      ],
      'topNavEnabled': true,
      'topNavItems': [
        {
          url: '/dashboard',
          label: 'Dashboard',
          icon: 'dashboard'
        }
      ]
    })
  }
}