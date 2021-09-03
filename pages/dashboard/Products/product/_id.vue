<template>
  <div>
    <template v-if="edit!=null">
      <v-form @submit.prevent="save">
        <h4>Edit Product " {{ edit.name }} "</h4>
        <v-btn type="submit">Save</v-btn>
        <v-btn  class="btn " color="primary" @click="sendtottelegram">Send To  Telegram</v-btn>

          <v-tabs           v-model="tab">
            <v-tab :key="1">General Inforamtion</v-tab>
            <v-tab :key="2">Gallery</v-tab>
            <v-tab :key="3">General specifications Details</v-tab>
            <v-tab :key="4">Technical specifications</v-tab>
            <v-tab :key="5">Features</v-tab>
            <v-tab :key="6">Extra: {{ edit.groups.otherlabel }}</v-tab>
            <v-tab :key="7">Catalog</v-tab>
          </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item :key="1" class="pa-3">
            <div class="pa-3">
              <v-text-field v-model="edit.name" label="Name"></v-text-field>
              <v-text-field v-model="edit.url" label="Url"></v-text-field>
              <v-row>
                <v-col cols="5">
                  <v-text-field type="number" v-model="edit.price" label="Price"></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-select v-model="edit.pricesymbol" :items="['Euro','Dollar','Lire']"></v-select>
                </v-col>
                <v-col cols="4">
                  <v-select v-model="edit.Available" label="Available" :items="['Available','Unavailable']"></v-select>
                </v-col>
                <v-col cols="4">
                  <v-select v-model="edit.publish" label="Publish" :items="[true,false]"></v-select>
                </v-col>
                <v-col cols="2">
                  <v-select v-model="edit.special"  label="Special"  :items="[true,false]"></v-select>
                </v-col>
                <v-col cols="2">
                  <v-select v-model="edit.firstpage"  label="First Page"  :items="[true,false]"></v-select>
                </v-col>
              </v-row>


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
                component="products"
                v-on:myevent="doSomething"
              ></tisseditor>
              <v-text-field v-model="edit.refrence" label="Refrence"></v-text-field>
              <v-textarea v-model="edit.telegram" label="telegram"></v-textarea>

              <v-textarea v-model="edit.keywords" label="keywords"></v-textarea>
              <v-textarea v-model="edit.description" label="description"></v-textarea>
            </div>

          </v-tab-item>
          <v-tab-item :key="2">
            <label>Gallery</label>
            <imagemanager
              :id="edit._id"
              :text="edit.text"
              component="productsgallery"
              v-on:myevent="doSomething"
            ></imagemanager>

          </v-tab-item>
          <v-tab-item :key="3" class="pa-4">
            <h5>General specifications Details</h5>
            <hr>
            <template v-if="edit.specifications">
              <template v-for="i in edit.groups.specifications">
                <v-text-field v-model="edit.specifications[i]" :label="i"></v-text-field>
              </template>
            </template>

          </v-tab-item>
          <v-tab-item :key="4" class="pa-4">
            <h5>Technical specifications</h5>
            <hr>
            <template v-if="edit.Technical">
              <template v-for="i in edit.groups.Technical">
                <v-text-field v-model="edit.Technical[i]" :label="i"></v-text-field>
              </template>
            </template>

          </v-tab-item>
          <v-tab-item :key="5" class="pa-4">
            <h5> Feature</h5>
            <hr>
            <template v-if="edit.Technical">
              <template v-for="i in edit.groups.Features">
                <v-checkbox
                  v-model="edit.Features[i]"
                  :label="i"
                ></v-checkbox>
              </template>
            </template>

          </v-tab-item>
          <v-tab-item :key="6" class="pa-4">
            <h5> Extra {{ edit.groups.otherlabel }}</h5>
            <hr>
            <template v-if="edit.Technical">
              <template v-for="i in edit.groups.otherspecifications">
                <v-text-field v-model="edit.otherspecifications[i]" :label="i"></v-text-field>


              </template>
            </template>

          </v-tab-item>
          <v-tab-item :key="7">
            <label>Catalog</label>
            <imagemanager
              :id="edit._id"
              :text="edit.text"
              component="productscatalog"
              v-on:myevent="doSomething"
            ></imagemanager>

          </v-tab-item>
        </v-tabs-items>




      </v-form>

      <error-show :err="error"></error-show>

    </template>
  </div>
</template>

<script>
import ErrorShow from "~/components/ErrorShow";
export default {
  name: "EditProduct",
  components: {ErrorShow},
  watch: {
    // whenever question changes, this function will run
    tags: function (newQuestion, oldQuestion) {
      for(const  i in newQuestion){
        this.items.push(newQuestion[i].name);
      }
    },
    edit: function (newtem,old){
        if(this.edit!=null){
          if(!this.edit.specifications){
            this.edit.specifications={}
          }
          if(!this.edit.Technical){
            this.edit.Technical={}
          }
          if(!this.edit.Features){
            this.edit.Features={}
          }
      if(!this.edit.otherspecifications){
            this.edit.otherspecifications={}
          }

        }
    }
  },

  data(){
    return{
      tab:0,
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
      this.$axios.put(this.$url+'v1/dashboard/product/'+this.$route.params.id,this.edit,{
        headers:{
          Authorization:localStorage.token
        }
      }).then(function (res){
        location.href='/dashboard/Products/product';

      }).catch((error) => {
        that.error=error.response;
      });

    },
    loaditem(){
      let that=this;
      this.$axios.get(this.$url+'v1/dashboard/product/'+this.$route.params.id,{
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
