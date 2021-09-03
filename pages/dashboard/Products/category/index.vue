<template>
    <div>
      <h1>Product Manager</h1>
      <hr/>
      <div class="mt-4">
        <v-btn to="/dashboard/Products/"> <v-icon>mdi-arrow-left</v-icon> Back to Product Dashboard</v-btn>
        <v-btn to="/dashboard/Products/category/New" color="blue"> <v-icon>mdi-plus</v-icon> Add Category</v-btn>
        <template v-if="list!=null">
          <v-data-table
            :headers="headers"
            :items="list.message"
            :items-per-page="15"
            class="elevation-1"
          >
            <template v-slot:item.Edit="{ item }">
              <a :href="'/dashboard/Products/category/Edit/'+item._id">

                <v-icon   small     class="mr-2"    @click="edit(item)"  > mdi-pencil </v-icon>
              </a>
            </template>
            <template v-slot:item.Deleted="{ item }">
              <v-icon   small     class="mr-2"     > mdi-delete </v-icon>


            </template>
            <template v-slot:item.Insert="{ item }">
              <v-icon   small     class="mr-2"    @click="edit(item)"  > mdi-file-document </v-icon>
            </template>

          </v-data-table>
        </template>

      </div>
    </div>
</template>

<script>
export default {
  data(){
    return{
      headers: [
        {
          text: 'name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'url', value: 'url' },
        { text: 'Edit', value: 'Edit' },
        { text: 'Insert Article', value: 'Insert' },
        { text: 'Deleted', value: 'Deleted' },
      ],
      list:null,

    }
  },
  methods:{
    edit(item){

    },
    loaditem(){
      let that=this;
      this.$axios.get(this.$url+'v1/dashboard/productgroup',{
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
  }
}
</script>

<style scoped>

</style>
