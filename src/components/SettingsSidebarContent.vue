<template>
  <div>
    <v-container fluid v-if="settings">
      <h1 class="title">Search</h1>
      <v-switch
        v-model="settings.search"
        class="ma-1"
        label="enabled"
      ></v-switch>
      <v-divider class="mb-5" />

      <h1 class="title">Title</h1>
      <v-switch
        v-model="settings.title"
        class="ma-1"
        label="enabled"
      ></v-switch>
      <v-divider class="mb-5" />

      <h1 class="title">Services</h1>
      <v-switch
        v-model="settings.services"
        class="ma-1"
        label="enabled"
      ></v-switch>
      <v-divider class="mb-5" />

      <h1 class="title">Notification</h1>
      <v-switch
        v-model="settings.notification"
        class="ma-1"
        label="enabled"
      ></v-switch>
      <v-divider class="mb-5" />

      <h1 class="title">Left Navigation</h1>
      <v-switch
        v-model="settings.leftNavEnabled"
        class="ma-1"
        label="enabled"
      ></v-switch>

      <v-treeview :items="settings.leftNavItems">
        <template v-slot:label="{ item, open }">
          <v-row class="align-center mx-10" v-if="!item.root">
            <v-col cols="12" md="4">
              <q-text-field label="Label" v-model="item.label" />
            </v-col>

            <v-col cols="12" md="4">
              <q-text-field label="Url" v-model="item.url" />
            </v-col>
            
            <v-col cols="12" md="4">
              <q-text-field label="Icon" v-model="item.icon" :persistent-hint="true" :append-icon="item.icon" hint="Icons">
                <template v-slot:hint="{ message, key }">
                   <a href='https://material.io/resources/icons/?style=baseline' target='_blank'>Icons</a>
                </template>
              </q-text-field>
            </v-col>
          </v-row>

        </template>

        <template slot="append" slot-scope="{ item }">
          <q-btn-table color="error" content-icon="remove" content-text="Remove" @click="removeChild(settings.leftNavItems, item)"/>
          <q-btn-table color="primary" content-icon="add" content-text="Create Child" @click="addChild(settings.leftNavItems, item);" />
        </template>
      </v-treeview>

      <div class="text-right">
        <q-btn color="primary" content-text="Create" @click="add(settings.leftNavItems)"/>
      </div>
      <v-divider class="mb-5" />

      <h1 class="title">Top Navigation</h1>
      <v-switch
        v-model="settings.topNavEnabled"
        class="ma-1"
        label="enabled"
      ></v-switch>

      <v-treeview :items="settings.topNavItems">
        <template v-slot:label="{ item, open }">
          <v-row class="align-center mx-10" v-if="!item.root">
            <v-col cols="12" md="4">
              <q-text-field label="Label" v-model="item.label" />
            </v-col>

            <v-col cols="12" md="4">
              <q-text-field label="Url" v-model="item.url" />
            </v-col>
            
            <v-col cols="12" md="4">
              <q-text-field label="Icon" v-model="item.icon" :persistent-hint="true" :append-icon="item.icon" hint="Icons">
                <template v-slot:hint="{ message, key }">
                   <a href='https://material.io/resources/icons/?style=baseline' target='_blank'>Icons</a>
                </template>
              </q-text-field>
            </v-col>
          </v-row>

        </template>

        <template slot="append" slot-scope="{ item }">
          <q-btn-table color="error" content-icon="remove" content-text="Remove" @click="removeChild(settings.topNavItems, item)"/>
          <q-btn-table color="primary" content-icon="add" content-text="Create Child" @click="addChild(settings.topNavItems, item);" />
        </template>
      </v-treeview>

      <div class="text-right">
        <q-btn color="primary" content-text="Create" @click="add(settings.topNavItems)"/>
      </div>

    <v-divider class="mb-5" />

    <div class="text-right">
      <q-btn color="primary" :loading="loading" :disabled="loading" content-icon="save" content-text="Save" @click="save()"/>
    </div>

    </v-container>
  </div>
</template>
<script>

export default {
  data() {
    return {
      settings: {},
      leftNavEnabled: false,
      loading: false
    }
  },
  mounted () {
    this.ini();
  },
  methods: {
    ini() {

      this.settings = this.$container.get('settings').get('template')
      this.setParent(this.settings.leftNavItems, null);
      this.setParent(this.settings.topNavItems, null);
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
    getDefaultNode(parent) {
      return {
        url: '',
        label: '',
        icon: '',
        children: [],
        parent: parent
      }
    },
    add(items) {
      items.push(this.getDefaultNode());
    },
    addChild(nodes, item) {
      if (!item.children) {
        this.$set(item, "children", []);
      }
      item.children.push(this.getDefaultNode(item));
    },
    removeChild(nodes, item) {

      let list = item.parent ? item.parent.children : nodes


      let index = list.findIndex(i => {
        return i.name === item.name
      })


      list.splice(index, 1)
    },
    save() {
      let settings = _.clone(this.settings)
      this.removeParent(this.settings.leftNavItems);
      this.removeParent(this.settings.topNavItems);

      this.loading = true
      this.$container.get('settings').store('template', settings).then(i => {
        this.loading = false
        window.bus.$emit('component.update');
      });
    },
    change($event) {
      // this.settings = $event.item;
    }
  }
}
</script>