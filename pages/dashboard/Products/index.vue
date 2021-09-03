<template>
    <div>
      <v-card to="/dashboard/Products/category">
        <v-card-title> <v-icon>mdi-folder-outline</v-icon>    Category</v-card-title>
      </v-card>
      <v-card class="mt-3"  to="/dashboard/Products/product/">
        <v-card-title> <v-icon>mdi-view-list</v-icon>  Products</v-card-title>
      </v-card>
      <v-card class="mt-3"  to="/dashboard/Products/product/pending">
        <v-card-title> <v-icon>mdi-alert</v-icon>  Pending Products</v-card-title>
      </v-card>

      <v-card class="mt-3"  to="/dashboard/Products/product/new">
        <v-card-title> <v-icon>mdi-plus</v-icon>  New Products</v-card-title>
      </v-card>
    </div>
</template>

<script>
export default {
name: "index"
}
</script>

<style scoped>

</style>
