<template>
  <v-list>
    <v-list-tile to="/dashboard">
      <v-list-tile-action>
        <v-icon>cast</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Dashboard</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile v-for="(service, index) in services" :to="service.config.options.url" :key="index">
      <v-list-tile-action>
        <v-icon>cast</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t("$quartz.data." + service.config.label + ".name") }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
import { container } from '@quartz/core'

export default {
  data () {
    return {
      services: []
    }
  },
  methods: {
    load() {
      this.services = _.filter(container.get('$quartz.view.services'), (module) => {
        return module.config.options.url && parseInt(container.get('settings').get('app.services.menu.' + module.name))
      })
    }
  },
  created() {

    this.load();

    window.bus.$on('settings-user.update', () => {
      this.load();
      this.drawer = true;
      this.$forceUpdate();
    });
  }
}
</script>