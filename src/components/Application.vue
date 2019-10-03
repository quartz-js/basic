<template>
  <v-app v-if="user">
    <q-app-bar app class="toolbar">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class='mx-1'></v-app-bar-nav-icon>
      <v-toolbar-title>{{ $root.config.app.name }}</v-toolbar-title>
      <searcher />
      <div class='fluid-fill'></div>
      <v-btn icon :to="{'name': 'services'}" class='mx-3'><q-icon>fas fa-cubes</q-icon></v-btn>
      <notification-icon :user="user"/>
      <div style='border-left: 2px solid #efefef; height: 36px; margin-right: 10px; margin-left: 10px'></div>
      <avatar :user="user"/>
    </q-app-bar>
    <q-sidebar app v-model='drawer' class="navigation">
      <div v-if="$container.get('api.config.logo')" class="pa-3">

        <img :src="$container.get('api.config.logo')" style='max-width: 100%; max-height: 80px'>
      </div>
      <sidebar-item v-for="item in sidebar" :value="item" />
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
      sidebar: [],
      isDark: false,
      drawer: null,
    }
  },
  methods: {
    getDrawerSettingValue()
    {
      let val = container.get('settings').get('app.sidebar', 0);
      return val === true || parseInt(val) === 1 ? true : false;
    }
  },
  mounted () {
    this.sidebar = this.$container.get('settings').get('sidebar', [
      {
        url: '/dashboard',
        label: 'Dashboard',
        icon: 'dashboard'
      }
    ])
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