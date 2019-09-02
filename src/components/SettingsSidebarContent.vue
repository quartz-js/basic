<template>
  <div>
    <v-container fluid v-if="settings">
      <v-treeview :items="settings">
        <template v-slot:label="{ item, open }">
          <v-row class="align-center mx-10" v-if="!item.root">
            <v-col cols="12" md="4">
              <q-text-field label="Label" v-model="item.label" />
            </v-col>

            <v-col cols="12" md="4">
              <q-text-field label="Url" v-model="item.url" />
            </v-col>
            
            <v-col cols="12" md="4">
              <q-text-field label="Icon" v-model="item.icon" :persistent-hint="true" :append-icon="item.icon" hint="<a href='https://material.io/resources/icons/?style=baseline' target='_blank'>Icons</a>" />
            </v-col>
          </v-row>

        </template>

        <template slot="append" slot-scope="{ item }">
          <q-btn color="error" content-icon="remove" content-text="Remove" @click="removeChild(item)"/>
          <q-btn color="primary" content-icon="add" content-text="Create Item" @click="addChild(item);" />
        </template>
      </v-treeview>
    </v-container>

    <div class="text-right">
      <q-btn color="primary" content-text="Add Item" @click="add()"/>
      <q-btn color="primary" :loading="loading" :disabled="loading" content-icon="save" content-text="Save" @click="save()"/>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      settings: null,
      loading: false
    }
  },
  mounted () {
    this.ini();
  },
  methods: {
    ini() {

      let items = this.$container.get('settings').get('sidebar', [
        {
          url: '/dashboard',
          label: 'Dashboard',
          icon: 'dashboard',
          key: 'dashboard',
          children: [
            {
              key: 'dashboard.dashboard',
              url: '/dashboard',
              label: 'Dashboard',
              icon: 'dashboard',
            }
          ]
        }
      ])

      this.setParent(items, null);
      this.settings = items
    },
    setParent(items, parent) {
      items.map(i => {
        this.setParent(i.children || [], i)

        i.parent = parent
      })
    },
    removeParent(items) {
      items.map(i => {
        delete i.parent

        this.removeParent(i.children || [])
      })
    },
    getDefaultNode() {
      return {
        url: '',
        label: '',
        icon: '',
        children: []
      }
    },
    add() {
      this.settings.push(this.getDefaultNode());
    },
    addChild(item) {
      if (!item.children) {
        this.$set(item, "children", []);
      }
      item.children.push(this.getDefaultNode());
    },
    removeChild(item) {

      let list = item.parent ? item.parent.children : this.settings

      console.log(item)

      let index = list.findIndex(i => {
        return i.name === item.name
      })

      list.splice(index, 1)

      console.log(list)
    },
    save() {
      let items = _.clone(this.settings)

      this.removeParent(items);

      this.loading = true
      this.$container.get('settings').store('sidebar', items).finally(i => {
        this.loading = false
      })
    },
    change($event) {
      // this.settings = $event.item;
    }
  }
}
</script>