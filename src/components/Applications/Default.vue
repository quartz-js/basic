<template>
  <v-app v-if="user" :dark="isDark" style=''>
    <v-toolbar class="toolbar" app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{ $root.config.app.name }}</v-toolbar-title>
      <searcher />
      <div class='fluid-fill'></div>
      <v-btn icon :to="{'name': 'services'}" class='mx-2'><v-icon>fas fa-cubes</v-icon></v-btn>
      <notification-icon :user="user"/>
      <div style='border-left: 2px solid #efefef; height: 36px; margin-right: 10px; margin-left: 10px'></div>
      <avatar :user="user"/>
    </v-toolbar>
    <v-navigation-drawer v-model='drawer' fixed app dark class="navigation">
      <v-list>
        <v-list-tile to="/dashboard">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-divider :dark="false"></v-divider>

      <v-list v-if="services">
        <v-list-tile v-for="(service, index) in services" :to="service.config.options.url" :key="index">
          <v-list-tile-content>
            <v-list-tile-title>{{ $t("$quartz.data." + service.config.label + ".name") }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <snackbar />
    <v-content>
      <v-container style='padding: 0; max-width: 1400px'>
        <router-view :user="user" :key="$route.fullPath"/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
require('../../assets/styles/default.styl')

import { container } from '@quartz/core'
import NotificationIcon from '@quartz/notification/src/components/notification/notification-icon'
import { DataViewError } from '@quartz/data-view/src/app/Errors/DataViewError'
import store from 'store2'
import Snackbar from '../Snackbar'
import _ from 'lodash'
import Searcher from '../Searcher'
import Avatar from '../Avatar'


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

    window.bus.$on('settings-user.update', () => {
      this.load();
      this.drawer = true;
      this.$forceUpdate();
    });
  }
}
</script>