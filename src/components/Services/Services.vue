<template>
  <div>
    <v-card flat>
      <v-list two-line v-for="(tag, index) in tags" :key="index">
        <v-subheader class="title">{{ $t('$quartz.tags.' + tag) }}</v-subheader>
        <service-item :services="retrieveServices(tag)"></service-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>

import { container } from '@railken/quartz-core'
import ServiceItem from './ServiceItem'


export default {
  components: {
    ServiceItem
  },
  data () {
    return {
      services: [],
      tags: container.get('$quartz.tags')
    }
  },
  methods: {
    retrieveServices (tag) {
      return this.services.filter((val) => {
        return val.tags && val.tags.indexOf(tag) !== -1 && val.name && val.route
      })
    },
  },
  mounted () {
    this.services = container.get('$quartz.data')
  }
}
</script>
<style scoped>

  .v-card {
    padding: 30px 50px;
  }
  .v-list > div:last-child {
    display: flex;
    flex-wrap: wrap;
  }
</style>
