import { ServiceProvider } from '@quartz/core'
import { container } from '@quartz/core'

export class ConfigServiceProvider extends ServiceProvider {
  register() {
    container.set('config', CONFIG);
  }
}