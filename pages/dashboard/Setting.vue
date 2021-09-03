<template>
  <div>
    <div>
      <h1>Setting</h1>
      <hr>
      <v-form @submit.prevent="save">

        <v-card color="basil">
          <v-card-title class="text-center justify-center py-6">

          </v-card-title>

          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="basil"
            grow
          >
            <v-tab
              v-for="item in items"
              :key="item"
            >
              {{ item }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item     key="General"    >
              <v-card
                color="basil"
                flat
              >
                <v-card-text>
                  <v-text-field label="title"  v-model="data.title"></v-text-field>
                  <v-textarea label="keywords"  v-model="data.keywords"></v-textarea>
                  <v-textarea label="description"  v-model="data.description"></v-textarea>

                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item     key="ContactUs"    >
              <v-card
                color="basil"
                flat
              >
                <v-card-text>

                  <v-text-field prepend-icon="mdi-phone"  label="phone"  v-model="data.ContactUs.phone"></v-text-field>
                  <v-text-field prepend-icon="mdi-cellphone"  label="mobile"  v-model="data.ContactUs.mobile"></v-text-field>
                  <v-text-field prepend-icon="mdi-map-marker"  label="address"  v-model="data.ContactUs.address"></v-text-field>
                  <v-text-field prepend-icon= "mdi-message-text"  label="fax"  v-model="data.ContactUs.fax"></v-text-field>
                  <v-text-field prepend-icon="mdi-email"  label="email"  v-model="data.ContactUs.email"></v-text-field>



                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item     key="SocailNetwork"    >
              <v-card
                color="basil"
                flat
              >
                <v-card-text>

                  <v-text-field prepend-icon="mdi-telegram"  label="telegram"  v-model="data.SocailNetwork['telegram']"></v-text-field>
                  <v-text-field prepend-icon="mdi-facebook"  label="facebook"  v-model="data.SocailNetwork.facebook"></v-text-field>
                  <v-text-field prepend-icon="mdi-twitter"  label="twitter"  v-model="data.SocailNetwork.twitter"></v-text-field>
                  <v-text-field prepend-icon="mdi-instagram"  label="instagram"  v-model="data.SocailNetwork.instagram"></v-text-field>
                  <v-text-field prepend-icon="mdi-whatsapp"  label="whatsapp"  v-model="data.SocailNetwork.whatsapp"></v-text-field>

                  <v-text-field prepend-icon="mdi-google"  label="google"  v-model="data.SocailNetwork.google"></v-text-field>


                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item     key="Telegram"    >
              <v-card
                color="basil"
                flat
              >
                <v-card-text>

                  <v-text-field prepend-icon="mdi-telegram"  label="telegram"  v-model="data.chanaltelegram"></v-text-field>
                  <v-text-field prepend-icon="mdi-barcode"  label="api"  v-model="data.telegrapapi"></v-text-field>


                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
          <div class="pa-4">
            <v-btn type="submit">Save</v-btn>

          </div>

        </v-card>
      </v-form>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      data: {
        title:null,
        lang:'en',

        keywords:null,
        description:null,
        telegrapapi:null,
        chanaltelegram:null,
        SocailNetwork:{},
        ContactUs: {},
      },
      tab:null,
      items: [
       'General','ContactUs', 'SocailNetwork', 'Telegram',
      ],
    }
  },

  methods:{
    save(){
      let that=this;
      this.$axios.put(this.$url+'v1/dashboard/setting/'+this.data.lang,this.data,
        {
       headers:{
         Authorization:localStorage.token
        }

      })
      .then(function (res){

      });

    },
    deleted(i){

    },
    loaditem(){
      let that=this;
      this.$axios.get(this.$url+'v1/dashboard/setting/'+this.data.lang,
        {
          headers:{
            Authorization:localStorage.token
          }

        })
        .then(function (res){
            that.data=res.data.message;
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
