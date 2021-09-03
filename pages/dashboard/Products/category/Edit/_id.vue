<template>
  <div>
   <template v-if="edit!=null">
    <v-form @submit.prevent="save">
      <h4>Create Blog Group " {{ edit.name }} "</h4>
      <v-text-field v-model="edit.name" label="Name"></v-text-field>
      <v-text-field v-model="edit.url" label="Url"></v-text-field>
      <v-col cols="12">
        <v-combobox
            v-model="edit.specifications"
          label="General specifications Details"
          multiple
          chips
        ></v-combobox>
      </v-col>
      <v-col cols="12">
        <v-combobox
            v-model="edit.Technical"
          label="Technical specifications"
          multiple
          chips
        ></v-combobox>
      </v-col>
      <v-col cols="12">
        <v-combobox
            v-model="edit.companies"
          label="Compaines"
          multiple
          chips
        ></v-combobox>
      </v-col>
      <v-col cols="12">
        <v-combobox
            v-model="edit.Features"
          label="Features"
          multiple
          chips
        ></v-combobox>
      </v-col>
      <v-text-field v-model="edit.otherlabel" label="Other Function Label"></v-text-field>
      <v-col cols="12">
        <v-combobox
          v-model="edit.otherspecifications"
          :label="edit.otherlabel +' items'"
          multiple
          chips
        ></v-combobox>
      </v-col>

      <label>Text</label>
      <tisseditor
        :id="edit._id"
        :text="edit.text"
        component="productgroup"
        v-on:myevent="doSomething"
      ></tisseditor>

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


    }
  },
  methods:{
    doSomething(e){
      this.edit.text=e;
    },
    save(){
      let that=this;
      this.$axios.put(this.$url+'v1/dashboard/productgroup/'+this.$route.params.id,this.edit,{
        headers:{
          Authorization:localStorage.token
        }
      }).then(function (res){
        location.href='/dashboard/Products/category/';

      }).catch((error) => {
        that.error=error.response;
      });

    },
    loaditem(){
      let that=this;
      this.$axios.get(this.$url+'v1/dashboard/productgroup/'+this.$route.params.id,{
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
