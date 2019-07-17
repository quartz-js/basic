import { ServiceProvider } from '@quartz/core'

import { container } from '@quartz/core'
import _ from 'lodash'

export class LocalizationServiceProvider extends ServiceProvider {
  
  register() {
    container.set('$quartz.lang', {})
  }
  boot() {
    require('moment').locale('en', {
      week: { dow: 1 }
    })

    var obj = {
        en: require('../../../lang/en.json'),
        it: require('../../../lang/it.json')
    };

    _.merge(obj, container.get('$quartz.lang'))

    container.set('$quartz.lang', obj);
  }
}