<template>
  <div v-if="showSection()">
    <!--<v-subheader class="title">{{ $t('$quartz.tags.' + tag) }}</v-subheader>
    <v-divider></v-divider>-->
    <v-list three-line class="list-main">
      <v-list-item v-for="(service, index) in services" :key="index" class="item my-2">
        <router-link :to="service.config.options.url">
          <v-list-item-avatar :size="70" tile class='ma-0 mr-6' >
            <img :src="service.config.icon">
          </v-list-item-avatar>
        </router-link>

        <v-list-item-content class="pa-0 align-start">
          <v-list-item-title class="ma-0" style='display: flex'>
            <router-link :to="service.config.options.url" style='flex-grow: 1'>{{ $t("$quartz.data." + service.config.label + ".name") }}</router-link>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" icon small text class="ma-0" height='24' width='24'>
                  <q-icon accent>more_horiz</q-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="toggleMenu(service)">
                  <v-list-item-title>{{ hasMenu(service) ? $t("$quartz.basic.nav-remove") : $t("$quartz.basic.nav-add") }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="toggleShow(service)">
                  <v-list-item-title>{{ canShow(service) ? $t("$quartz.basic.remove") : $t("$quartz.basic.add")  }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-title>
          <v-list-item-subtitle style='font-size:12px'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lobortis in arcu at pellentesque. Integer lobortis in arcu at pellentesque. Integer lobortis in arcu at pellentesque.

            <!--{{ $t("$quartz.data." + service.name + ".description") }}-->
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>

import store from 'store2'
import { container } from '@quartz/core'

export default {
  props: ['services', 'showHidden', 'tag'],
  methods: {
    showSection() {
      return true;
    },
    toggleMenu (service) {
      container.get('settings').toggle('app.services.menu.' + service.name, 0)
      this.$forceUpdate()
      window.bus.$emit('component.update');
    },
    toggleShow (service) {
      container.get('settings').toggle('app.services.show.' + service.name, 0);
      this.$forceUpdate()
    },
    canShow (service) {
      return parseInt(container.get('settings').get('app.services.show.' + service.name, 0))
    },
    hasMenu (service) {
      return parseInt(container.get('settings').get('app.services.menu.' + service.name, 0))
    }
  }
}
</script>
<style style='scss' scoped>

  .v-list-item__content {
    align-self: center;
  }

  .list-main {
    display: flex;
    flex-wrap: wrap;
  }

  .more {
    position: absolute;
    top: -8px;
  }

  .item .v-list-item__avatar { 
    min-width: auto !important;
    margin-top: 0 !important;
  }
  .item {
    max-height: 75px
  }

  .v-list-item__action {
    cursor: pointer;
    opacity: 0.6;
    align-items: flex-start;
    margin-left: -20px;
    margin-top: 8px;
    min-width: 0;
    max-width: 0;
  }

  .v-list-item {
    padding: 0 10px;
  }

  .item{
    width: 33%;
    max-width: 33%;
  }

  .disabled {
    opacity: 0.3;
  }

  .item .v-list-item__subtitle {
    line-clamp: 3;
    -webkit-line-clamp: 3;
    max-height: 55px;
  }
</style>
