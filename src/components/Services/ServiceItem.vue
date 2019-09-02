<template>
  <div v-if="showSection()">
    <!--<v-subheader class="title">{{ $t('$quartz.tags.' + tag) }}</v-subheader>
    <v-divider></v-divider>-->
    <v-row>
      <v-col cols="12" md="6" lg="4" v-for="(service, index) in services" :key="index">
        <q-card>
          <v-row class="text-xs-center text-md-left">
            <v-col class="pa-7" style='max-width: 120px'>
              <router-link :to="service.config.options.url">
                  <img :src="service.config.icon" width='80'>
              </router-link>
            </v-col>

            <v-col class="pa-0">
              <div class="align-center justify-center pa-3">
                <p class="title ma-0 pa-1 " style='display: flex'>
                  <router-link :to="service.config.options.url" style='flex-grow: 1'>
                    {{ $t("$quartz.data." + service.config.label + ".name") }}
                  </router-link>
                </p>
                <p style='font-size:12px' class="pa-1 ma-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lobortis in arcu at pellentesque. Integer lobortis in arcu at pellentesque. 
                </p>
              </div>
            </v-col>
          </v-row>
        </q-card>
      </v-col>
    </v-row>
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
    toggleShow (service) {
      container.get('settings').toggle('app.services.show.' + service.name, 0);
      this.$forceUpdate()
    },
    canShow (service) {
      return parseInt(container.get('settings').get('app.services.show.' + service.name, 0))
    },
  }
}
</script>