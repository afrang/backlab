<template>
  <div>
    <div>
      <v-btn to="/dashboard/Crypto/Edit">New Coin</v-btn>
      <v-btn class="success" @click="loaditem">Reload</v-btn>
    </div>

    <template v-if="list!=null">

      <v-data-table
        :headers="headers"
        :items="list.message.docs"
        :items-per-page="15"
        class="elevation-1"
      >
        <template v-slot:item.Edit="{ item }">
          <a :href="'/dashboard/Crypto/CryptoEdit/'+item._id">

            <v-icon   small     class="mr-2"    @click="edit(item)"  > mdi-pencil </v-icon>
          </a>
        </template>
        <template v-slot:item.Deleted="{ item }">
          <v-icon   small     class="mr-2"     > mdi-delete </v-icon>


        </template>
        <template v-slot:item.star="{ item }">
          <v-icon  v-if="item.star==true"  small     class="mr-2"     > mdi-star</v-icon>
          <v-icon  v-if="item.star==false"  small     class="mr-2"     > mdi-star-outline</v-icon>

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
        { text: 'symbol', value: 'symbol' },
        { text: 'ordered', value: 'ordered' },
        { text: 'star', value: 'star' },

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

    loaditem(){
      let that=this;
      this.$axios.get(this.$url+'v1/dashboard/coin',
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
  }
}
</script>

<style>

</style>
