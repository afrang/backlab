<template>
  <div>
    <template v-if="edit!=null">
      <v-form @submit.prevent="save">
        <h4>Edit Article " {{ edit.name }} "</h4>
        <v-text-field v-model="edit.name" label="Name"></v-text-field>
        <v-text-field v-model="edit.symbol" label="Symbol"></v-text-field>
        <v-text-field v-model="edit.ordered" label="ordered"></v-text-field>
        <v-select label="Star" v-model="edit.star":items="[{value:true},{value: false}]" item-value="value" item-text="value"></v-select>

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
      this.$axios.put(this.$url+'v1/dashboard/coin/'+this.$route.params.id,this.edit,{
        headers:{
          Authorization:localStorage.token
        }
      }).then(function (res){
        location.href='/dashboard/Crypto/';

      }).catch((error) => {
        that.error=error.response;
      });

    },
    loaditem(){
      let that=this;
      this.$axios.get(this.$url+'v1/dashboard/coin/'+this.$route.params.id,{
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
