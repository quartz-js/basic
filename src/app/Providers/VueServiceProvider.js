import { ServiceProvider } from '@railken/quartz-core'

import { container } from '@railken/quartz-core'
import VueLocalStorage from 'vue-localstorage'
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueI18n from 'vue-i18n'
import QuartzCore from '@railken/quartz-core'
import App from '@/App'

export class VueServiceProvider extends ServiceProvider {

  boot() {

    Vue.config.productionTip = false

    Vue.use(QuartzCore) 
    Vue.use(VueLocalStorage)
    Vue.use(VueI18n)
    window.bus = new Vue()

    var router = container.get('$vue.router');


    var i18n = new VueI18n({
      locale: container.get('settings').get('language', 'en'),
      silentTranslationWarn: false,
      messages: container.get('$quartz.lang')
    });

    Vue.use(Vuetify, {
      lang: {
        t: (key, ...params) => i18n.t(key, params)
      }
    })
      

    var vue = new Vue({
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
    }).$mount('#app')

    container.set('$vue.app', vue);
  }
}