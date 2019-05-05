<template>
  <v-app v-if="user" :dark="isDark" style=''>
    <v-toolbar class="toolbar" app >

      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-toolbar-title>{{ $root.config.app.name }}</v-toolbar-title>


      <!--<v-autocomplete
        class="mx-5 mt-2"
        flat
        append-icon=""
        prepend-inner-icon="search"
        clear-icon
        v-model="searchQuery"
        :items="searchResults"
        :loading="searchLoading"
        :search-input.sync="search"
        hide-details
        hide-selected
        label="Ain't a great day to search something?"
        solo
      >
        <template v-slot:no-data>
          <v-list-tile>
            <v-list-tile-title>
              No results
              <strong>found</strong>
            </v-list-tile-title>
          </v-list-tile>
        </template>
        <template v-slot:item="{ item }">

          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="http://192.168.1.5:8000/assets/amethyst/customer-icon.svg" alt="John">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>Customer</v-list-tile-title>
              <v-list-tile-sub-title>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lobortis in arcu at pellentesque. </v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn
                :class="fav ? 'red--text' : ''"
                icon
                @click="fav = !fav"
              >
                <v-icon>favorite</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-autocomplete>
      -->


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
              <v-list-tile-title>{{ $t("$quartz.data." + service.name + ".name") }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-snackbar
      v-model="snackbar.active"
      :color="snackbar.background"
      :timeout="snackbar.timeout"
    >
      {{ snackbar.message }}
      <v-btn
        :color="snackbar.color"
        flat
        @click="snackbar.active = false"
      >
        Close
      </v-btn>
    </v-snackbar>

    <v-content>
      <v-container style='padding: 0; max-width: 1400px'>
        <router-view :user="user" :key="$route.fullPath"/>
        
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
import { container } from '@railken/quartz-core'
import NotificationIcon from '@railken/quartz/notification/src/components/notification/notification-icon'
import { DataViewError } from '@railken/quartz/data-view/src/app/Errors/DataViewError'
import store from 'store2'
import _ from 'lodash'


export default {
  props: ['user'],
  components: {
    NotificationIcon
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
      snackbar: {
        background: null,
        color: "pink",
        active: false,
        timeout: 5000,
        message: "Hello"
      },
      searchResults: [{a:1}],
      searchQuery: null,
      search: null,
      isDark: false,
      drawer: parseInt(container.get('settings').get('app.sidebar', 0))
    }
  },
  watch: {
    drawer: {
      handler: function () {
        container.get('settings').store('app.sidebar', this.drawer)
      }
    }
  },
  methods: {
    load () {

      this.services = {}

      _.filter(container.get('$quartz.data'), (module) => {
        return module.route && module.route && parseInt(container.get('settings').get('app.services.menu.' + module.name))
      }).forEach((module) => {
        if (typeof this.services[module.tags[0]] === 'undefined') {
          this.services[module.tags[0]] = []
        }

        this.services[module.tags[0]].push(module)
      })

    },
    logout () {
      container.get('oauth').logout()
      window.location.href = '/'
    }
  },
  created () {
    window.bus.$on("message", data => {

      if (data.type === 'error') {
        this.snackbar.background = "error";
        this.snackbar.color = "white";
      } else {
        this.snackbar.background = null;
        this.snackbar.color = "pink";

      }
      this.snackbar.message = data.message;
      this.snackbar.active = true;
    });

    window.bus.$on('settings-user.update', () => {
      this.load();
      this.drawer = true;
      this.$forceUpdate();
    });

    this.load();
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

  .v-autocomplete__content.v-menu__content {
    /*border: 2px solid #efefef;
    box-shadow: none;
    margin-top: 3px;*/
  }
</style>
