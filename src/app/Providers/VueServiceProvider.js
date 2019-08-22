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

export class VueServiceProvider extends ServiceProvider {

  boot() {

    Vue.config.productionTip = false

    Vue.use(QuartzCore) 
    Vue.use(VueLocalStorage)
    Vue.use(VueI18n)
    window.bus = new Vue()

    this.loadComponents()(Vue);

    var i18n = new VueI18n({
      locale: container.get('settings').get('language', 'en'),
      silentTranslationWarn: false,
      messages: container.get('$quartz.lang')
    });

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
      hashbang: false,
      history: true,
      mode: 'history'
    })

    container.set("$vue.router", router)


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
    }).$mount('#app')

    container.set('translator', v._i18n)
    container.set('$vue.app', v);
  }
}