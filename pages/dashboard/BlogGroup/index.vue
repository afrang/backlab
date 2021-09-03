<template>
  <div>
    <div>
      <v-btn to="/dashboard/BlogGroup/new">New Group</v-btn>
      <v-btn class="success" @click="loaditem">Reload</v-btn>
    </div>
    <template v-if="list!=null">
      <v-data-table
        :headers="headers"
        :items="list.message"
        :items-per-page="15"
        class="elevation-1"
      >
        <template v-slot:item.Edit="{ item }">
          <a :href="'/dashboard/BlogGroup/Edit/'+item._id">

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
              this.$axios.get(this.$url+'v1/dashboard/bloggroup',{
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

<style>

</style>
