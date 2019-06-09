<template>
  <div id="app" class='full-height' >
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
    <router-view :user='user'/>
    <notifications group="system" />
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
  mounted () {
    this.user = this.$root.$data.user
  }
}
</script>