<template>
  <v-app dark class="myitems">
    <v-container style="height: 100%;">
      <Nuxt />

    </v-container>
    <v-footer><small>Soof Engine 1.0 </small> </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "logins"
}
</script>

<style scoped>
.myitems{
  background-image: url("/wall.jpg");
  background-size: cover;
  background-position: center;
}
</style>
