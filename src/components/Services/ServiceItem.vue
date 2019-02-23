<template>
  <div>
    <v-list-tile v-for="(service, index) in services"  :key="index" class="item" :class="{'disabled': !canShow(service) }" v-if="showHidden || canShow(service)" >

      <router-link :to="service.route">
        <v-list-tile-avatar :size="90" tile class='pt-2' >
          <img :src="service.icon">
        </v-list-tile-avatar>
      </router-link>

      <v-list-tile-content class="pl-4">
        <v-list-tile-title>
          <router-link :to="service.route">{{ $t("$quartz.data." + service.name + ".name") }}</router-link>
        </v-list-tile-title>
        <v-list-tile-sub-title>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lobortis in arcu at pellentesque. Sed at porta odio. Vivamus sollicitudin euismod justo id ornare. Suspendisse a metus orci. Cras tempor finibus metus, nec dictum enim sollicitudin sit amet. Vestibulum et suscipit lacus. Nam vestibulum tempus dolor.

          <!--{{ $t("$quartz.data." + service.name + ".description") }}-->
        </v-list-tile-sub-title>
      </v-list-tile-content>

      <v-list-tile-action>
        <v-menu offset-y>
          <v-btn slot="activator" icon>
            <v-icon accent>more_horiz</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile @click="toggle(service)">
              <v-list-tile-title>Add/Remove in Nav</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="toggleShow(service)">
              <v-list-tile-title>{{ canShow(service) ? "Hide" : "Show" }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-list-tile-action>
    </v-list-tile>
  </div>
</template>

<script>

import store from 'store2'

export default {
  props: ['services', 'showHidden'],
  methods: {
    toggle (service) {
      store.set(this.getWithPrefix(service), !store.get(this.getWithPrefix(service)))
      this.$root.$forceUpdate()
    },
    getWithPrefix (service) {
      return 'app.stars.' + service.route.name
    },
    toggleShow (service) {
      store.set('services.show.' + service.name, !store.get('services.show.' + service.name, true))
      this.$forceUpdate()
    },
    canShow (service) {
      return store.get('services.show.' + service.name, true)
    },
    has (service) {
      return store.get(this.getWithPrefix(service))
    }
  }
}
</script>
<style style='scss' scoped>
  .more {
    position: absolute;
    top: -8px;
  }

  .item .v-list__tile__avatar { 
    min-width: auto !important;
    margin-top: 0 !important;
  }
  .item {
    height: 114px !important;
  }

  .item .v-list__tile .v-list__tile__action {
    cursor: pointer;
    padding: 10px;
    opacity: 0.6;
    align-items: flex-start;
    margin-left: -50px;
    margin-top: -15px;

  }

  .item{
    width: 50%;
  }

  .disabled {
    opacity: 0.3;
  }

  .item .v-list__tile__sub-title {
    line-clamp: 3;
    -webkit-line-clamp: 3;
    max-height: 63px;
  }
</style>
