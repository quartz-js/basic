<template>
   <v-autocomplete
      class="mx-5 mt-2 nav-search"
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
      :menu-props="{closeOnContentClick:true, 'v-bind:class':'hello', 'ref': 'ban'}"
    >
      <template v-slot:no-data>
        <v-list-tile>
          <v-list-tile-title>
            No results
            <strong>found</strong>
          </v-list-tile-title>
        </v-list-tile>
      </template>
      <template v-slot:item="{ item }" three-line>

        <v-list-tile avatar  :to="item.url" >
          <v-list-tile-avatar>
              <img :src="item.icon" alt="icon">
          </v-list-tile-avatar>

          <v-list-tile-content >
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            <v-list-tile-sub-title><div @click="closeSearch()">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lobortis in arcu at pellentesque. Sed at porta odio. </div></v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn
              :class="item.fav ? 'primary--text' : ''"
              icon
              @click="item.fav = !item.fav"
            >
              <v-icon>fas fa-cubes</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-autocomplete>
</template>

<script>

import { container } from '@railken/quartz-core'

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
          title: this.$t("$quartz.data." + service.config.label + ".name"),
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