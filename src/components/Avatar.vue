<template>
  <v-menu class="ml-2" nudge-top="-51" nudge-left='-100' v-if="user">
    <template v-slot:activator="{ on }">
      <v-avatar icon v-on="on" :size='36' style='cursor:pointer' >
        <img :src="'https://secure.gravatar.com/avatar/2cfe43977a730d05a0181e38a22132c1?default=https%3A%2F%2Fcloud.digitalocean.com%2Favatars%2Fdefault11.png&secure=true'">
      </v-avatar>
    </template>
    <v-list>
      <v-list-item>
        <v-list-item-avatar >
          <img :src="'https://secure.gravatar.com/avatar/2cfe43977a730d05a0181e38a22132c1?default=https%3A%2F%2Fcloud.digitalocean.com%2Favatars%2Fdefault11.png&secure=true'">
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ user.name }}</v-list-item-title>
          <v-list-item-subtitle style='font-size: 11px'>{{ user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider class='mt-2'></v-divider>
      <v-list-item :to="{'name': 'user.settings'}">
        <v-list-item-content><v-list-item-title>{{ $t('$quartz.settings.title') }}</v-list-item-title></v-list-item-content>
      </v-list-item>
      <v-list-item @click="logout();">
        <v-list-item-content><v-list-item-title>{{ $t('$quartz.auth.logout') }}</v-list-item-title></v-list-item-content>
      </v-list-item>
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