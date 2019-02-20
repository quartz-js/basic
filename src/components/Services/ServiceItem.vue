<template>
  <div>
    <v-list-tile v-for="(service, index) in services"  :key="index" class="item">

      <v-list-tile-avatar class='service-icon' @click="$router.push(service.route)">
        <img :src="require('../../assets/icons/tmp/loadBalancer.svg')" width='38' class="normal">
        <img :src="require('../../assets/icons/tmp/loadBalancer-hover.svg')" width='38' class="hover">
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title><router-link :to="service.route">{{ $t("$quartz.data." + service.name + ".name") }}</router-link></v-list-tile-title>
        <v-list-tile-sub-title>{{ $t("$quartz.data." + service.name + ".description") }}</v-list-tile-sub-title>
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
    .service-icon {
      margin-right: 15px;
      cursor: pointer;
    }

    .service-icon > * {
      border: 1px solid #0069ff;
      padding: 10px;
      border-radius: 3px;
      text-align: center;
      min-height: 48px;
      min-width: 48px;
      transition: background .2s linear;
    }


    .service-icon:not(:hover) .hover {
      display: none;
    }

    .service-icon:hover .normal {
      display: none;
    }

    .service-icon:hover > * {
      background: #0069ff;
      color: white;
    }

    .service-icon img{
      max-width: 100%;
      max-height: 100%;
      margin: 0 auto !important;
      display: block;
    }

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

    .v-list > div:nth-child(2) > .item{
      width: 50%;
    }
</style>
