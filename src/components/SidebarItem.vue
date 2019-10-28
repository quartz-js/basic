<template>
  <div>
    <v-list-group
      v-if="value.children && value.children.length > 0"
      :prepend-icon="value.icon"
      v-model="open"
    >
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>{{ value.label }}</v-list-item-title>
        </v-list-item-content>
      </template>
      <sidebar-item v-for="item in value.children" :value="item" class="ml-3" />
    </v-list-group>
    <v-list-item v-else :to="value.url">
      <v-list-item-action v-if="value.icon">
        <v-icon>{{ value.icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>{{ value.label }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: 'sidebar-item',
  props: ['value'],
  data() {
    return {
      open: false
    }
  }
  
}
</script>