import { ServiceProvider } from '@quartz/core'
import { container } from '@quartz/core'
import { ConfigApi } from '../Api/ConfigApi'

export class ConfigServiceProvider extends ServiceProvider {
  register() {
    container.set('config', CONFIG);
  }
  boot() {

    var api = new ConfigApi()

    return api.index({}).then(response => {
      response.body.data.map(i => {
        container.set('config.' + i.key, i.value);
      });
      console.log(container.get('config'));
    }).catch(response => {
      Helper.handleResponse(response);
    })
  }
}