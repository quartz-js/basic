<template>
  <v-menu class="ml-2" nudge-top="-51" nudge-left='-100' v-if="user">
    <v-avatar icon slot="activator" :size='36' >
      <img :src="'https://secure.gravatar.com/avatar/2cfe43977a730d05a0181e38a22132c1?default=https%3A%2F%2Fcloud.digitalocean.com%2Favatars%2Fdefault11.png&secure=true'">
    </v-avatar>
    <v-list >
      <v-list-tile>

        <v-list-tile-avatar >
          <img :src="'https://secure.gravatar.com/avatar/2cfe43977a730d05a0181e38a22132c1?default=https%3A%2F%2Fcloud.digitalocean.com%2Favatars%2Fdefault11.png&secure=true'">
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ user.name }}</v-list-tile-title>
          <v-list-tile-sub-title style='font-size: 11px'>{{ user.email }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider class='mt-2'></v-divider>
      <v-list-tile :to="{'name': 'user.settings'}">
        <v-list-tile-content><v-list-tile-title>{{ $t('$quartz.settings.title') }}</v-list-tile-title></v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="logout();">
        <v-list-tile-content><v-list-tile-title>{{ $t('$quartz.auth.logout') }}</v-list-tile-title></v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>

import { container } from '@quartz/core'

export default {
  props: ['user'],
  methods: {
    logout () {
      container.get('oauth').logout()
      window.location.href = '/'
    }
  },
}
</script>