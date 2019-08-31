import { ServiceProvider } from '@quartz/core'
import Echo from 'laravel-echo'
import { container } from '@quartz/core'

export class NotificationServiceProvider extends ServiceProvider {

  boot() {

    window.io = require('socket.io-client')

    if (container.get('config').app.websocket.url) {
      window.Echo = new Echo({
        broadcaster: 'socket.io',
        host: container.get('config').app.websocket.url,
        auth: { headers: { 'Authorization': 'Bearer ' + container.get('oauth').getToken() } }
      })
    }

    var Notify = {}

    Notify.isGranted = function () {
      return Notification.permission === 'granted'
    }

    Notify.request = function () {
      Notification.requestPermission()
    }

    Notify.prompt = function (title, options, callback, timeout) {
      if (!Notify.isGranted()) {
        Notify.request()

        return
      }

      var notification = new Notification(title, options)

      notification.onclick = function () {
        callback()
      }

      setTimeout(function () { notification.close }, timeout)
    }

    window.Notify = Notify

    var Notify = window.Notify

    if (!Notify.isGranted()) {
      Notify.request()
    }


  }
}