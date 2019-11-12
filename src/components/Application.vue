<template>
  <v-app v-if="user" v-bind:style="{ background: $vuetify.theme.themes.light.background }">
    <q-app>
      <q-logo :src="$container.get('api.config.logo')" />

      <q-app-bar app class="toolbar">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" class='mx-1' v-if="$container.get('settings').get('template.leftNavEnabled')"></v-app-bar-nav-icon>
        <v-toolbar-title v-if="$container.get('settings').get('template.title')">{{ $root.config.app.name }}</v-toolbar-title>
        <searcher  v-if="$container.get('settings').get('template.search')"/>

        <sidebar-item v-for="item in $container.get('settings').get('template.topNavItems')" :value="item" v-if="$container.get('settings').get('template.topNavEnabled')"/>

        <div class='fluid-fill'></div>
        <v-btn icon :to="{'name': 'services'}" class='mx-3' v-if="$container.get('settings').get('template.services')"><q-icon>fas fa-cubes</q-icon></v-btn>
        <notification-icon :user="user"  v-if="$container.get('settings').get('template.notification')"/>
        <div style='border-left: 2px solid #efefef; height: 36px; margin-right: 10px; margin-left: 10px'></div>
        <avatar :user="user"/>
      </q-app-bar>
      <q-sidebar app v-model='drawer' class="navigation" v-if="$container.get('settings').get('template.leftNavEnabled')">
        <q-logo :src="$container.get('api.config.logo')" />
        <sidebar-item v-for="item in $container.get('settings').get('template.leftNavItems')" :value="item" />
      </q-sidebar>
      <snackbar />
      <q-content>
        <v-container style='padding: 0'>
          <router-view :user="user" :key="$route.fullPath"/>
        </v-container>
      </q-content>
    </q-app>
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
import SidebarItem from './SidebarItem'

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
    SidebarItem,
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
    }
  },
  methods: {
    changeEdit()
    {
      this.$container.get('settings').set('dw-edit', !this.$container.get('settings').get('dw-edit', 0));
      window.bus.$emit('component.update')
    },
    getDrawerSettingValue()
    {
      let val = container.get('settings').get('app.sidebar', 0);
      return val === true || parseInt(val) === 1 ? true : false;
    }
  },
  created() {

    this.drawer = this.getDrawerSettingValue();

    window.bus.$on('component.update', () => {
      this.drawer = true;
      this.$forceUpdate();
    });
  }
}
</script>