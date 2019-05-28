import { ServiceProvider } from '@railken/quartz-core'

import { container } from '@railken/quartz-core'
import VueLocalStorage from 'vue-localstorage'
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueI18n from 'vue-i18n'
import QuartzCore from '@railken/quartz-core'
import App from '@/App'
import Router from 'vue-router'

export class VueServiceProvider extends ServiceProvider {

  boot() {

    Vue.config.productionTip = false

    Vue.use(QuartzCore) 
    Vue.use(VueLocalStorage)
    Vue.use(VueI18n)
    window.bus = new Vue()

    this.loadComponents()(Vue);

    console.log(container.get('$quartz.lang'));

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

    var v = new Vue({
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



    container.set('$vue.app', v);
  }
}