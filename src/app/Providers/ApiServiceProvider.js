import { ServiceProvider } from '@quartz/core'
import { IndexApi } from '../Api/IndexApi.js'
import { container, Helper } from '@quartz/core'

export class ApiServiceProvider extends ServiceProvider {
  boot() {

    var api = new IndexApi()

    return api.index({}).then(response => {
      container.set('api.index', response.body.app);
    }).catch(response => {
      Helper.handleResponse(response);
      alert('Cannot contact API');
    })
  }
}