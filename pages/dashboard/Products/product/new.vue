<template>
  <div>
    <v-form @submit.prevent="saveitem">
      <h4>Create New Product</h4>
      <hr>
      <v-text-field label="name" v-model="save.name" > </v-text-field>
      <v-text-field label="url" v-model="save.url" > </v-text-field>
      <template v-if="group!=null">

        <v-select label="Group Select" v-model="save.parent" :items="group['message']" item-text="name" item-value="_id" ></v-select>

      </template>
      <v-btn type="submit">Save</v-btn>
    </v-form>
    <error-show :err="error"></error-show>
  </div>
</template>

<script>
import ErrorShow from "~/components/ErrorShow";
export default {
  name: "newprdocuts",
  components:{
    'error-show':ErrorShow
  },
  data(){
    return{
      error:null,
      group:null,
      save:{
        name:null,
        url:null,
        parent:null
      }
    }
  },
  methods:{
    saveitem(){
      let that=this;
      that.error=null,
        this.$axios.post(this.$url+'v1/dashboard/product',this.save,{
          headers:{
            Authorization:localStorage.token
          }
        }).then(function (res){
          location.href='/dashboard/dashboard/Products/product/'+res.data.data._id;

        }).catch((error) => {
          //  that.error=error.response.data.message;
          that.error=error.response;
        });;
    },
    loadgroup(){
      let that=this;
      this.$axios.get(this.$url+'v1/dashboard/productgroup',{ headers:{ Authorization:localStorage.token }}).then(function (res){ that.group=res.data });
    }

  },
  mounted() {
    this.loadgroup();
  }

}
</script>

<style scoped>

</style>
