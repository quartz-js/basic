import { ServiceProvider, container } from '@quartz/core'

export class RouterServiceProvider extends ServiceProvider {

  register() {
    container.set('$vue.routes', require('../../routes').default);
  }

  boot() {
  }
}