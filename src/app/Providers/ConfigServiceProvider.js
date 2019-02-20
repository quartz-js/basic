import { ServiceProvider } from '@railken/quartz-core'
import { container } from '@railken/quartz-core'

export class ConfigServiceProvider extends ServiceProvider {
  register() {
    container.set('config', CONFIG);
  }
}