<template>
  <v-autocomplete
    class="mx-5 nav-search"
    flat
    append-icon=""
    prepend-inner-icon="search"
    clear-icon
    item-text="title"
    :items="search.items"
    :loading="search.loading"
    :search-input.sync="search.query"
    :label="$t('$quartz.basic.search')"
    solo
    ref="search"
    hide-no-data
    hide-details
    style='background: rgba(0,0,0,0)'
    :menu-props="{closeOnContentClick:true, 'v-bind:class':'hello', 'ref': 'ban'}"
  >
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-title>
          No results
          <strong>found</strong>
        </v-list-item-title>
      </v-list-item>
    </template>
    <template v-slot:item="{ item }" three-line dense>

      <v-list-item  :to="item.url" >
        <v-list-item-avatar>
            <img :src="item.icon" alt="icon">
        </v-list-item-avatar>

        <v-list-item-content >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle><div @click="closeSearch()">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lobortis in arcu at pellentesque. Sed at porta odio. </div></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action class='ma-0'>
          <v-btn
            :class="item.fav ? 'primary--text' : ''"
            icon
            small
            @click="item.fav = !item.fav"
          >
            <q-icon>fas fa-cubes</q-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script>

import { container } from '@quartz/core'
const s = require("underscore.string");

export default {
  data () {
    return {
      search: {
        loading: false,
        items: [],
        query: null,
        sync: null
      },
    }
  },
  watch: {
    "search.query": {
      handler: function(val) {
        this.onUpdateSearch(val);
      }
    }
  },
  methods: {
    closeSearch() {
      this.$refs.search.setMenuIndex(-1)
    },
    onUpdateSearch(val) {

      if (!val) {
        this.search.items = [];
        return;
      }

      this.search.items = container.get('$quartz.view.services').map(service => {
        return {
          title: s.umanize(service.config.label),
          icon: service.config.icon,
          url: service.config.options.url,
          fav: true
        }
      }).filter(item => {

        return !val || item.title.toUpperCase().includes(val.toUpperCase());
      }).slice(0, 5);
    }
  }
}
</script>
<style>
  .nav-search .v-input__slot {
    background: rgba(0,0,0,0) !important;
  }
</style>