<template>
  <v-app v-if="user" :dark="isDark" style=''>
    <v-toolbar class="toolbar" app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <searcher  />
      <div class='fluid-fill'></div>
      <v-btn icon :to="{'name': 'services'}" class='mx-2'><v-icon>fas fa-cubes</v-icon></v-btn>
      <notification-icon :user="user"/>
      <div style='border-left: 2px solid #efefef; height: 36px; margin-right: 10px; margin-left: 10px'></div>
      <avatar :user="user"/>
    </v-toolbar>
    <v-navigation-drawer fixed app :mini-variant.sync="mini" @mouseover.native="drawer ? mini = false : null" @mouseleave.native="drawer ? mini = true : null" mini-variant-width=60>
      <logo :class="{'hidden' : mini}" style='height: 50px; margin: 20px auto; display: block'/>
      <sidebar-navigation :mini="mini"/>
    </v-navigation-drawer>
    <snackbar />
    <v-content>
      <v-container style='padding: 0 40px'>
        <router-view :user="user" :key="$route.fullPath"/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

require('../../assets/styles/eldgrim.styl')

import { container } from '@railken/quartz-core'
import NotificationIcon from '@railken/quartz/notification/src/components/notification/notification-icon'
import { DataViewError } from '@railken/quartz/data-view/src/app/Errors/DataViewError'
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
        container.get('settings').store('app.sidebar', this.drawer)
        this.mini = this.drawer;
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
      mini: true,
      isDark: false,
      drawer: !!+container.get('settings').get('app.sidebar', 0),
      services: []
    }
  },
  methods: {
    load() {
      this.services = _.filter(container.get('$quartz.view.services'), (module) => {
        return module.config.options.url && parseInt(container.get('settings').get('app.services.menu.' + module.name))
      })
    }
  },
  created() {

    this.load();

    window.bus.$on('settings-user.update', () => {
      this.load();
      this.drawer = true;
      this.$forceUpdate();
    });
  }
}
</script>