<template>
  <div v-if="showSection()">
    <!--<v-subheader class="title">{{ $t('$quartz.tags.' + tag) }}</v-subheader>
    <v-divider></v-divider>-->
    <v-list three-line class="list-main">
      <v-list-tile v-for="(service, index) in services" :key="index" class="item" :class="{'disabled': !canShow(service) }" v-if="showHidden || canShow(service)" >
        <router-link :to="service.config.options.url">
          <v-list-tile-avatar :size="70" tile class='pt-2' >
            <img :src="service.config.icon">
            
          </v-list-tile-avatar>
        </router-link>

        <v-list-tile-content class="pl-4">
          <v-list-tile-title>
            <router-link :to="service.config.options.url">{{ $t("$quartz.data." + service.config.label + ".name") }}</router-link>
          </v-list-tile-title>
          <v-list-tile-sub-title style='font-size:12px'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lobortis in arcu at pellentesque. Integer lobortis in arcu at pellentesque. Integer lobortis in arcu at pellentesque.

            <!--{{ $t("$quartz.data." + service.name + ".description") }}-->
          </v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-menu offset-y>
            <v-btn slot="activator" icon>
              <v-icon accent>more_horiz</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile @click="toggleMenu(service)">
                <v-list-tile-title>{{ hasMenu(service) ? $t("$quartz.basic.nav-remove") : $t("$quartz.basic.nav-add") }}</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="toggleShow(service)">
                <v-list-tile-title>{{ canShow(service) ? $t("$quartz.basic.hide") : $t("$quartz.basic.show")  }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>

import store from 'store2'
import { container } from '@railken/quartz-core'

export default {
  props: ['services', 'showHidden', 'tag'],
  methods: {
    showSection() {
      return this.showHidden || this.services.find((service) => { return this.canShow(service) }) !== undefined
    },
    toggleMenu (service) {
      container.get('settings').store('app.services.menu.' + service.name, !parseInt(container.get('settings').get('app.services.menu.' + service.name, 0)) ? 1 : 0)
      this.$forceUpdate()
      window.bus.$emit('settings-user.update');
    },
    toggleShow (service) {
      container.get('settings').store('app.services.show.' + service.name, !parseInt(container.get('settings').get('app.services.show.' + service.name, this.getDefaultValueService(service))) ? 1 : 0)
      this.$forceUpdate()
    },
    getDefaultValueService (service) {
      return service.priority > 0 ? 1 : 0
    },
    canShow (service) {
      return parseInt(container.get('settings').get('app.services.show.' + service.name, this.getDefaultValueService(service)))
    },
    hasMenu (service) {
      return parseInt(container.get('settings').get('app.services.menu.' + service.name, 0))
    }
  }
}
</script>
<style style='scss' scoped>
  .list-main {
    display: flex;
    flex-wrap: wrap;
  }

  .more {
    position: absolute;
    top: -8px;
  }

  .item .v-list__tile__avatar { 
    min-width: auto !important;
    margin-top: 0 !important;
  }
  .item {
    height: 114px !important;
  }

  .item .v-list__tile .v-list__tile__action {
    cursor: pointer;
    opacity: 0.6;
    align-items: flex-start;
    margin-left: -20px;
    margin-top: 8px;
    min-width: 0;
  }

  .item{
    width: 33%;
  }

  .disabled {
    opacity: 0.3;
  }

  .item .v-list__tile__sub-title {
    line-clamp: 3;
    -webkit-line-clamp: 3;
    max-height: 63px;
  }
</style>
