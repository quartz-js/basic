<template>
  <div>
    <v-list-tile v-for="(service, index) in services"  :key="index" class="item" >

      <v-list-tile-avatar :size="90" tile class='pt-2'>
        <img :src="service.icon">
      </v-list-tile-avatar>

      <v-list-tile-content class="pl-4">
        <v-list-tile-title><router-link :to="service.route">{{ $t("$quartz.data." + service.name + ".name") }}</router-link></v-list-tile-title>
        <v-list-tile-sub-title>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lobortis in arcu at pellentesque. Sed at porta odio. Vivamus sollicitudin euismod justo id ornare. Suspendisse a metus orci. Cras tempor finibus metus, nec dictum enim sollicitudin sit amet. Vestibulum et suscipit lacus. Nam vestibulum tempus dolor.

          <!--{{ $t("$quartz.data." + service.name + ".description") }}-->
        </v-list-tile-sub-title>
      </v-list-tile-content>

      <v-list-tile-action>
        <span class="item-1" @click="toggle(service)" v-if="has(service)">
            <v-icon accent>star</v-icon>
        </span>
        <span class="item-2" @click="toggle(service)" v-if="!has(service)">
            <v-icon primary>star</v-icon>
        </span>
      </v-list-tile-action>
    </v-list-tile>
  </div>
</template>

<script>

import store from 'store2'

export default {
  props: ['services'],
  methods: {
    toggle (service) {
      store.set(this.getWithPrefix(service), !store.get(this.getWithPrefix(service)))
      this.$forceUpdate()
    },
    getWithPrefix (service) {
      return 'app.stars.' + service.route.name
    },
    has (service) {
      return store.get(this.getWithPrefix(service))
    }
  }
}
</script>
<style style='scss' scoped>
  .item .v-list__tile__avatar { 
    min-width: auto !important;
    margin-top: 0 !important;
  }
  .item {
    height: 114px !important;
  }
  .item .v-list__tile .v-list__tile__action {
    cursor: pointer;
  }

  .item{
    width: 50%;
  }

  .item .v-list__tile__sub-title {
    line-clamp: 3;
    -webkit-line-clamp: 3;
  }
</style>
