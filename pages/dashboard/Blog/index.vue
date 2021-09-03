<template>
  <div>
    <div>
      <v-btn to="/dashboard/Blog/Edit">New Article</v-btn>
      <v-btn class="success" @click="loaditem">Reload</v-btn>
    </div>
    <div v-if="groups!=null">
      <v-select @change="loaditem" v-mod  el="group" :items="groups.message" item-text="name" item-value="_id"></v-select>
    </div>
    <template v-if="list!=null">

      <v-data-table
        :headers="headers"
        :items="list.message.docs"
        :items-per-page="15"
        class="elevation-1"
      >
        <template v-slot:item.Edit="{ item }">
          <a :href="'/dashboard/Blog/BlogEditor/'+item._id">

            <v-icon   small     class="mr-2"    @click="edit(item)"  > mdi-pencil </v-icon>
          </a>
        </template>
        <template v-slot:item.Deleted="{ item }">
          <v-icon   small     class="mr-2"     > mdi-delete </v-icon>


        </template>
        <template v-slot:item.Group="{ item }">
          <pre>{{ item['groups']['name'] }}</pre>

        </template>

      </v-data-table>
      <v-pagination
        v-model="page"
        :length="list.message.totalPages"
      ></v-pagination>
    </template>
  </div>
</template>

<script>
export default {
  data(){
    return{
      page:1,
      group:null,
      headers: [
        {
          text: 'name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'url', value: 'url' },
        { text: 'Group', value: 'Group' },
        { text: 'Tags', value: 'tags' },

        { text: 'Edit', value: 'Edit' },
        { text: 'Deleted', value: 'Deleted' },
      ],
      groups:null,
      list:null

    }
  },
  watch:{
    page(newQuery, oldQuery) {
      this.loaditem();
    }
  },
  methods:{
    edit(item){

    },
    loadgroup(){
      let that=this;
      this.$axios.get(this.$url+'v1/dashboard/bloggroup',{
        headers:{
          Authorization:localStorage.token
        }
      }).then(function (res){
        that.groups=res.data;
      });

    },
    loaditem(){
      let that=this;
      this.$axios.get(this.$url+'v1/dashboard/blog',
        {
     params: {
        limit:10,
       group:this.group,
       page:this.page
      },
        headers:{
          Authorization:localStorage.token
        }
      }).then(function (res){
        that.list=res.data;
      });

    }
  },
  mounted(){
    this.loaditem();
    this.loadgroup();
  }
}
</script>

<style>

</style>
