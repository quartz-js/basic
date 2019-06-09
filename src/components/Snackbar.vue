<template>
  <v-snackbar
    v-model="active"
    :color="background"
    :timeout="timeout"
  >
    {{ message }}
    <v-btn
      :color="color"
      flat
      @click="active = false"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>

export default {
  data () {
    return {
      background: null,
      color: "pink",
      active: false,
      timeout: 5000,
      message: "Hello"
    }
  },
  created() {
    window.bus.$on("message", data => {

      if (data.type === 'error') {
        this.background = "error";
        this.color = "white";
      } else {
        this.background = null;
        this.color = "pink";

      }
      this.message = data.message;
      this.active = true;
    });
  }
}
</script>