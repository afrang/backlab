<template>
  <div>
    <v-form @submit.prevent="saveitem">
      <h4>Create New Group Gallery</h4>
      <hr>
      <v-text-field label="name" v-model="save.name" > </v-text-field>
      <v-text-field label="url" v-model="save.url" > </v-text-field>

      <v-btn type="submit">Save</v-btn>
    </v-form>
    <error-show :err="error"></error-show>
  </div>
</template>

<script>
import ErrorShow from "~/components/ErrorShow";
export default {
  name: "newgroup",
  components:{
    'error-show':ErrorShow
  },
  data(){
    return{
      error:null,
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
        this.$axios.post(this.$url+'v1/dashboard/gallery',this.save,{
          headers:{
            Authorization:localStorage.token
          }
        }).then(function (res){
          location.href='/dashboard/Gallery/EditGallery/'+res.data.data._id;

        }).catch((error) => {
          //  that.error=error.response.data.message;
          that.error=error.response;
        });;
    },


  },
  mounted() {
  }

}
</script>

<style scoped>

</style>
