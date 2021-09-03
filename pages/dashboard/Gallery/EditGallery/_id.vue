<template>
  <div>
    <template v-if="edit!=null">
      <v-form @submit.prevent="save">
        <h4>Edit Article " {{ edit.name }} "</h4>
        <v-text-field v-model="edit.name" label="Name"></v-text-field>
        <v-text-field v-model="edit.url" label="Url"></v-text-field>
        <div v-if="groups!=null">
          <v-select @change="loaditem" v-model="group" :items="groups.message" item-text="name" item-value="_id"></v-select>
        </div>
        <label>Text</label>
        <imagemanager
          :id="edit._id"
          :text="edit.text"
          component="blog"
          v-on:myevent="doSomething"
        ></imagemanager>

        <v-textarea v-model="edit.keywords" label="keywords"></v-textarea>
        <v-textarea v-model="edit.description" label="description"></v-textarea>
        <v-btn type="submit">Save</v-btn>
      </v-form>
      <error-show :err="error"></error-show>

    </template>
  </div>
</template>

<script>
import ErrorShow from "~/components/ErrorShow";
export default {
  name: "EditGroup",
  components: {ErrorShow},
  data(){
    return{
      edit:null,
      error:null,
      groups:null,


    }
  },
  methods:{
    doSomething(e){
      this.edit.text=e;
    },
    save(){
      let that=this;
      this.$axios.put(this.$url+'v1/dashboard/gallery/'+this.$route.params.id,this.edit,{
        headers:{
          Authorization:localStorage.token
        }
      }).then(function (res){
        location.href='/dashboard/gallery/';

      }).catch((error) => {
        that.error=error.response;
      });

    },
    loaditem(){
      let that=this;
      this.$axios.get(this.$url+'v1/dashboard/gallery/'+this.$route.params.id,{
        headers:{
          Authorization:localStorage.token
        }
      }).then(function (res){
        that.edit=res.data.message;
      }).catch((error) => {
        that.error=error.response;
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
