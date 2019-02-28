<template>
  <div>
    <v-card flat>
      <div v-for="(tag, index) in tags" :key="index">
        <service-item :tag="tag" :services="retrieveServices(tag)" :show-hidden="showHidden"></service-item>
      </div>
      <div class='text-xs-right mt-5'>
        <a href="javascript:;" @click="showHidden = !showHidden">{{ !showHidden ? $t('$quartz.basic.show-disabled') : $t('$quartz.basic.hide-disabled')}}</a>
      </div>
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
      showHidden: false,
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
</style>
