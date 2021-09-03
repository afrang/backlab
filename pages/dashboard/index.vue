<template>
    <div>
      <v-row>
        <v-col  sm="4" xs="12"  v-for="(item,index) in items" :key="index">
          <v-card class="text pa-4"  :to="item.to">


            <v-card-title>
              <v-icon class="ma-1">  {{  item.icon }}  </v-icon>  |
              {{ item.title  }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      items: [

        {
          icon: 'mdi-folder',
          title: 'Blog Group',
          to: '/dashboard/BlogGroup'
        },
        {
          icon: 'mdi-file-word',
          title: 'Article List',
          to: '/dashboard/Blog'
        },
        {
          icon: 'mdi-bookmark-plus',
          title: 'New Article',
          to: '/dashboard/Blog/Edit'
        },
        {
          icon: 'mdi-folder-image',
          title: 'Gallery',
          to: '/dashboard/Gallery'
        },
        {
          icon: 'mdi-cash-usd',
          title: 'Crypto',
          to: '/dashboard/Crypto'
        },
        {
          icon: 'mdi-tag',
          title: 'Tags',
          to: '/dashboard/Tags'
        },
        {
          icon: 'mdi-folder-cog',
          title: 'Setting',
          to: '/dashboard/Setting'
        }
      ],
    }
  }
}
</script>

<style scoped>

</style>
