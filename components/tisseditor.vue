<template>
  <div>
    <ckeditor  @input="onEditorInput" v-model="text" :config="editorConfig"></ckeditor>
<v-card class="mt-4">
  <v-btn @click="loadfiles">Reload</v-btn>

  <v-file-input @change="upload"  v-model="file" placeholder="Upload File" ></v-file-input>
  <template v-if="filelist!=null">
    <v-row >
      <v-col v-for="(i,index) in filelist.message" cols="2">
        <template >
          <v-img
            :src="$url+i['path']+i['name']"
            height="125"
            class="grey darken-4"
          ></v-img>
          <div class="ma-2">
            <v-btn @click="inserttext(i)">
              <v-icon  small class="mr-2" @click="inserttext(i)"> mdi-plus </v-icon>
            </v-btn>
            <v-btn class="danger"  @click="deleteimage(i)"  >
              <v-icon   color="error" small class="mr-2"> mdi-delete </v-icon>
            </v-btn>
            <v-btn class="danger"  @click="star(i._id)"  >
              <v-icon v-if="i.star==true"   color="gold" small class="mr-2"> mdi-star </v-icon>
              <v-icon  v-if="i.star==false"  color="gold" small class="mr-2"> mdi-star-outline </v-icon>
            </v-btn>
          </div>
        </template>

      </v-col>

    </v-row>

  </template>
</v-card>


  </div>
</template>

<script>
export default {
  name: "tisseditor",
  props:{
    component:null,
    id:null,
    text:null,

  },
  data(){
    return{
      editorConfig: {
        allowedContent: true,
        extraPlugins: ['justify','colorbutton','autoembed','balloontoolbar','bidi']
      },
      file:null,
      filelist:null,
      form:{
        component: this.component,
        parent:this.id,
      }
    }
  },
  methods:{
    star(i){
      let that=this;
      this.$axios.put(this.$url+'v1/dashboard/filemanager/'+i,{id:i},{
        headers: {
          Authorization:localStorage.token
        }
      }).then(function (res){
        that.loadfiles();
      })
    },
    onEditorInput(){
        this.$emit('myevent',this.text);

    },
    inserttext(i){
      console.log(i.url);
      let img='<img src="'+this.$url+i.url+'"/>';
      this.text=this.text+img;

    },
    loadfiles(){
        let that=this;
        this.$axios.get(this.$url+'v1/dashboard/filemanager',{
          params:{
            component:this.component,
            parent:this.id
          },
          headers: {
            Authorization:localStorage.token
          }
        }).then(function (res){
          that.filelist=res.data;
        })
    },
    deleteimage(i){
     let that=this;
     this.$axios.delete(this.$url+'v1/dashboard/filemanager/'+i._id,{
       headers: {
         Authorization:localStorage.token
       }
     }).then(function (res){
       that.loadfiles();
     })
    },
    upload(){
      let that=this;
      let formData = new FormData();
      formData.append('file', this.file);
      formData.append('component', this.form.component);
      formData.append('parent', this.form.parent);
      this.$axios.post( this.$url+'v1/dashboard/filemanager',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization:localStorage.token
          }
        }
      ).then(function (res){
          that.loadfiles();
      });
    }
  },
  mounted() {
    this.loadfiles();
  }
}
</script>

<style scoped>

</style>
