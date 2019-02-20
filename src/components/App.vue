<template>
  <v-app v-if="user" :dark="isDark" style='background: white '>
    <v-toolbar class="toolbar" app >

      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-toolbar-title>{{ $root.config.app.name }}</v-toolbar-title>

      <!--<v-text-field
        class="mx-5 mt-2"
        flat
        label="Search"
        prepend-inner-icon="search"
      ></v-text-field>-->

      <div class='fluid-fill'></div>

      <v-btn icon  :to="{'name': 'services'}" class='mx-2'><v-icon>fas fa-cubes</v-icon></v-btn>
      <notification-icon :user="user"/>
      <div style='border-left: 2px solid #efefef; height: 36px; margin-right: 10px; margin-left: 10px'></div>
      <v-menu class="ml-2" nudge-top="-51" nudge-left='-100'>
        <v-avatar icon slot="activator" :size='36' >
          <img :src="'https://secure.gravatar.com/avatar/2cfe43977a730d05a0181e38a22132c1?default=https%3A%2F%2Fcloud.digitalocean.com%2Favatars%2Fdefault11.png&secure=true'">
        </v-avatar>
        <v-list >
          <v-list-tile>

            <v-list-tile-avatar >
              <img :src="'https://secure.gravatar.com/avatar/2cfe43977a730d05a0181e38a22132c1?default=https%3A%2F%2Fcloud.digitalocean.com%2Favatars%2Fdefault11.png&secure=true'">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ user.name }}</v-list-tile-title>
              <v-list-tile-sub-title style='font-size: 11px'>{{ user.email }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider class='mt-2'></v-divider>
          <v-list-tile :to="{'name': 'user.settings'}">
            <v-list-tile-content><v-list-tile-title>{{ $t('$quartz.settings.title') }}</v-list-tile-title></v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="logout();">
            <v-list-tile-content><v-list-tile-title>{{ $t('$quartz.auth.logout') }}</v-list-tile-title></v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>

    </v-toolbar>

    <v-navigation-drawer v-model='drawer' fixed app dark class="left-aside">
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
        <div v-for="(tag, index) in services" :key="index">
          <v-list-tile  :to="{name: service.route.name}" v-for="(service, index) in tag" :key="index">
            <v-list-tile-content>
              <v-list-tile-title>{{ service.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-content>


      <v-container style='padding: 0; max-width: 1200px'>
          <router-view :user="user"/>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
import { container } from '@railken/quartz-core'
import NotificationIcon from '@railken/quartz/notification/src/components/notification/notification-icon'
import store from 'store2'

export default {
  props: ['user'],
  components: {
    NotificationIcon
  },
  data () {
    return {
      search: null,
      isDark: false,
      drawer: store.get('app.sidebar', true)
    }
  },
  watch: {
    drawer: {
      handler: () => {
        store.set('app.sidebar', this.drawer)
      }
    }
  },
  methods: {
    logout () {
      container.get('oauth').logout()
      window.location.href = '/'
    }
  },
  created () {
    this.services = {}

    container.get('$quartz.data').filter((module) => {
      return module.route && module.route && store.get('app.stars.' + module.route.name)
    }).forEach((module) => {
      if (typeof this.services[module.tags[0]] === 'undefined') {
        this.services[module.tags[0]] = []
      }

      this.services[module.tags[0]].push(module)
    })
  }
}
</script>

<style lang="css">
  .search {
    margin-top: 3px
  }

  .left-aside {
    background: #0747a5 !important;
  }

  .v-toolbar {
    border-bottom: 1px solid #f1f1f1 !important;
    box-shadow: 1px 2px 4px 0 rgba(0,0,0,.03) !important;
  }
  
  .toolbar.v-toolbar {
    background: white !important;
  }

  /*.v-list__tile--active {
    background: #083c8c !important;
  }
  .v-list__tile--active > * {
    color: white;
  }*/

  .v-input--selection-controls:not(.v-input--hide-details) .v-input__slot {
    margin: 0;
  }

</style>
