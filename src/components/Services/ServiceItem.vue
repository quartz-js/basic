<template>
  <div v-if="showSection()">
    <!--<v-subheader class="title">{{ $t('$quartz.tags.' + tag) }}</v-subheader>
    <v-divider></v-divider>-->
    <v-row>
      <v-col cols="12" md="6" lg="4" v-for="(service, index) in services" :key="index">
        <q-card>
          <v-row class="text-xs-center text-md-left align-center">
            <v-col  style='max-width: 160px; '>
              <router-link :to="service.config.options.url" >
                <q-view-icon :src="service.config.icon" width='90' style='display: block; margin: 0 auto' />
              </router-link>
            </v-col>

            <v-col class="py-0" >
              <div class="align-center justify-center" style='margin-left: -30px' >
                <p class="title ma-0 " style='display: flex'>
                  <router-link :to="service.config.options.url" style='flex-grow: 1'>
                    {{ humanize(service.config.label) }}
                  </router-link>
                </p>
                <p style='font-size:12px' class="ma-0">
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
const s = require("underscore.string");

export default {
  props: ['services', 'showHidden', 'tag'],
  methods: {
    showSection() {
      return true;
    },
    humanize(str) {
      return s.humanize(str)
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