<template>
  <div>
    <div v-for="(tag, index) in tags" :key="index">
      <service-item :tag="tag" :services="retrieveServices(tag)" :show-hidden="showHidden"></service-item>
    </div>
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
  .q-card{
    padding: 30px 50px;
  }
</style>
