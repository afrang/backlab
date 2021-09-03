<template>
  <div>
    <v-form @submit.prevent="saveitem">
      <h4>Create New Product Group</h4>
      <hr>
      <v-text-field label="name" v-model="save.name" > </v-text-field>
      <v-text-field label="url" v-model="save.url" > </v-text-field>
      <v-btn type="submit" color="green">Save</v-btn>
      <v-btn to="/dashboard/Products/category/" color="red">Back</v-btn>

    </v-form>
    <error-show :err="error"></error-show>
  </div>
</template>

<script>
import ErrorShow from "~/components/ErrorShow";
export default {
  name: "newpgroup",
  components:{
    'error-show':ErrorShow
  },
  data(){
    return{
      error:null,
      save:{
        name:null,
        url:null
      }
    }
  },
  methods:{
    saveitem(){
      let that=this;
      that.error=null,
        this.$axios.post(this.$url+'v1/dashboard/productgroup',this.save,{
          headers:{
            Authorization:localStorage.token
          }
        }).then(function (res){
          location.href='/dashboard/Products/category/Edit/'+res.data.data._id;

        }).catch((error) => {
          //  that.error=error.response.data.message;
          that.error=error.response;
        });;
    }

  },
  mounted() {

  }

}
</script>

<style scoped>

</style>
