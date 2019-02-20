<template>
  <div>
    <v-list-tile v-for="(service, index) in services"  :key="index" class="item" >

      <v-list-tile-avatar :size="60" tile class='pt-2'>
        <img :src="service.icon">
      </v-list-tile-avatar>

      <v-list-tile-content class="pl-4">
        <v-list-tile-title><router-link :to="service.route">{{ $t("$quartz.data." + service.name + ".name") }}</router-link></v-list-tile-title>
        <v-list-tile-sub-title>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer finibus sed tortor quis pharetra. Nam iaculis placerat maximus.

          {{ $t("$quartz.data." + service.name + ".description") }}
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

    .v-list__tile .v-list__tile__action {
      cursor: pointer;
    }

    .item-1 .v-icon, .item-2 .v-icon {
      color: #0069ff;
    }

    .item-2 {
      opacity: 0;
    }

    .v-list__tile:hover .item-2 {
      opacity: 0.6;
    }

    .item-2:hover {
      opacity: 1.0 !important;
    }

    .v-list > div:nth-child(1) > .item{
      width: 50%;
    }
</style>
