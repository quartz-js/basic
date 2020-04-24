<template>
  <div id="app" class='full-height' >
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
    <router-view :user='user' :style="cssProps"/>
  </div>
</template>
<script>

export default {
  name: 'app',
  data () {
    return {
      user: null
    }
  },
  computed: {
    cssProps () {
      return {
          '--v-primary-color': this.$vuetify.theme.currentTheme.primary
      }
    }
  },
  mounted () {

    console.log(this.$vuetify.theme)

    this.user = this.$root.$data.user
  }
}
</script>