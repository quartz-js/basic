<template>
  <v-app v-if="user">
    <q-app-bar class="toolbar">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" small class='mx-1'></v-app-bar-nav-icon>
      <v-toolbar-title>{{ $root.config.app.name }}</v-toolbar-title>
      <searcher />
      <div class='fluid-fill'></div>
      <v-btn icon :to="{'name': 'services'}" class='mx-3'><v-icon>fas fa-cubes</v-icon></v-btn>
      <notification-icon :user="user"/>
      <div style='border-left: 2px solid #efefef; height: 36px; margin-right: 10px; margin-left: 10px'></div>
      <avatar :user="user"/>
    </q-app-bar>
    <q-sidebar v-model='drawer' class="navigation">
      <v-list>
        <v-list-item to="/dashboard" :color="$container.get('style.sidebar.itemColorActive')">
          <v-list-item-action>
            <v-icon>dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>


      <v-list v-if="services">
        <v-list-item v-for="(service, index) in services" :to="service.config.options.url" :key="index" :color="$container.get('style.sidebar.itemColorActive')">
          <v-list-item-content>
            <v-list-item-title>{{ $t("$quartz.data." + service.config.label + ".name") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </q-sidebar>
    <snackbar />
    <v-content  v-bind:style="{ background: $vuetify.theme.themes.light.background }">
      <v-container style='padding: 0; max-width: 1400px'>
        <router-view :user="user" :key="$route.fullPath"/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
require('../assets/styles/default.scss')


import { container } from '@quartz/core'
import NotificationIcon from '@quartz/notification/src/components/notification/notification-icon'
import { DataViewError } from '@quartz/data-view/src/app/Errors/DataViewError'
import store from 'store2'
import Snackbar from './Snackbar'
import _ from 'lodash'
import Searcher from './Searcher'
import Avatar from './Avatar'


export default {
  props: ['user'],
  watch: {
    drawer: {
      handler: function () {
        if (this.getDrawerSettingValue() != this.drawer) {
          container.get('settings').store('app.sidebar', this.drawer)
        }
      }
    },
  },
  components: {
    Snackbar,
    NotificationIcon,
    Searcher,
    Avatar
  },
  errorCaptured: (err, vm, info) => {
    if (err instanceof DataViewError) {
      window.bus.$emit("message", {
        message: err.message,
        type: "error"
      });
    }
  },
  data () {
    return {
      isDark: false,
      drawer: null,
      services: []
    }
  },
  methods: {
    load() {
      this.services = _.filter(container.get('$quartz.view.services'), (module) => {
        return module.config.options.url && parseInt(container.get('settings').get('app.services.menu.' + module.name))
      })
    },
    getDrawerSettingValue()
    {
      let val = container.get('settings').get('app.sidebar', 0);
      return val === true || parseInt(val) === 1 ? true : false;
    }
  },
  mounted () {
  },
  created() {

    this.drawer = this.getDrawerSettingValue();

    this.load();

    window.bus.$on('component.update', () => {
      this.load();
      this.drawer = true;
      this.$forceUpdate();
    });
  }
}
</script>