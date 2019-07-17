<template>
  <div>
    <v-card flat class="resource-card my-5">
      <v-subheader class="title">{{ $t('$quartz.basic.services') }}</v-subheader>
      <v-divider></v-divider>
      <div v-for="(tag, index) in tags" :key="index">
        <service-item :tag="tag" :services="retrieveServices(tag)" :show-hidden="showHidden"></service-item>
      </div>
    </v-card>
  </div>
</template>

<script>

import { container } from '@quartz/core'
import ServiceItem from './ServiceItem'


export default {
  components: {
    ServiceItem
  },
  data () {
    return {
      services: [],
      showHidden: false,
      tags: container.get('$quartz.tags')
    }
  },
  methods: {
    retrieveServices (tag) {
      return this.services.filter((val) => {
        return val.tags && val.tags.indexOf(tag) !== -1 && val.config.label && val.config.options.url
      }).sort((a, b) => {
        return a.name > b.name;
      })
    },
  },
  mounted () {
    this.services = container.get('$quartz.view.services')
  }
}
</script>
<style scoped>
  .v-card {
    padding: 30px 50px;
  }
</style>
