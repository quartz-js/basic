<template>
  <v-menu class="ml-2" nudge-top="-51" left v-if="user">
    <template v-slot:activator="{ on }">
      <v-avatar icon v-on="on" :size='36' style='cursor:pointer' >
        <img :src="avatar">
      </v-avatar>
    </template>
    <v-list>
      <v-list-item>
        <v-list-item-avatar >
          <img :src="avatar">
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
  data() {
    return {
      avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/768px-Octicons-mark-github.svg.png'
    }
  },
  methods: {
    logout () {
      container.get('oauth').logout()
      window.location.href = '/'
    }
  },
}
</script>