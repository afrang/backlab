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
        <v-col cols="12">
          <v-combobox
            v-model="edit.tags"
            :items="items"
            label="Subject"
            multiple
            chips
          ></v-combobox>
        </v-col>

        <label>Text</label>
        <tisseditor
          :id="edit._id"
          :text="edit.text"
          component="blog"
          v-on:myevent="doSomething"
        ></tisseditor>
        <v-text-field v-model="edit.refrence" label="Refrence"></v-text-field>
        <v-textarea v-model="edit.telegram" label="telegram"></v-textarea>

        <v-textarea v-model="edit.keywords" label="keywords"></v-textarea>
        <v-textarea v-model="edit.description" label="description"></v-textarea>
        <v-btn type="submit">Save</v-btn>
        <v-btn  class="btn " color="primary" @click="sendtottelegram">Send To  Telegram</v-btn>

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
  watch: {
    // whenever question changes, this function will run
    tags: function (newQuestion, oldQuestion) {
        for(const  i in newQuestion){
          this.items.push(newQuestion[i].name);
        }
    }
  },

  data(){
    return{
      edit:null,
      tags:null,
      error:null,
      groups:null,
      items: [],

    }
  },
  methods:{
    doSomething(e){
      this.edit.text=e;
    },
    sendtottelegram(){
      let that=this;
      this.$axios.get(this.$url+'v1/dashboard/telegram/'+this.$route.params.id,{
        headers:{
          Authorization:localStorage.token
        }
      }).then(function (res){
        //location.href='/dashboard/blog/';

      })
    },
    save(){
      let that=this;
      this.$axios.put(this.$url+'v1/dashboard/blog/'+this.$route.params.id,this.edit,{
        headers:{
          Authorization:localStorage.token
        }
      }).then(function (res){
        location.href='/dashboard/blog/';

      }).catch((error) => {
        that.error=error.response;
      });

    },
    loaditem(){
      let that=this;
      this.$axios.get(this.$url+'v1/dashboard/blog/'+this.$route.params.id,{
        headers:{
          Authorization:localStorage.token
        }
      }).then(function (res){
        that.edit=res.data.message;
        that.tags=res.data.tag;
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
