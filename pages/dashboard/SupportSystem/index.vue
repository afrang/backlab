<template>
  <div>


    <template v-if="howtonline!=null">
      <v-card>
        <v-toolbar
          flat
          color="primary"
          dark
        >
          <v-toolbar-title>Online On Chat Rooms
          </v-toolbar-title>
        </v-toolbar>
        <pre>{{ howtonline }}</pre>
        <v-tabs vertical v-if="chats!=[]">
          <v-tab v-for="(i,key) in howtonline.token" :key="key" @click="readitem(i.split(':')[1])">
            <v-icon left>
              mdi-account
            </v-icon>
            <template v-if="chats[i.split(':')[1]]">
            <span class="codecount">
            {{ counter(chats[i.split(':')[1]])  }}

            </span>


            </template>
            {{ i.split(":")[1] }}


          </v-tab>
          <!--        v-if="!my.to_option_value.find(obj => obj.parent == item.id)"-->

          <v-tab-item v-for="(i,key) in howtonline.token" :key="key">
            <v-card flat style="height: 550px;">
              <v-card-text style="height: 530px; overflow-y: scroll;">
                {{ i.split(":")[1] }}
                <ul v-if="chats!=[]">
                  <li v-for="(chat,index) in chats[i.split(':')[1]]" :key="index" class="chatbox">
                    <div class="boxchat">
                      <v-row>
                        <v-col> | <strong> <small>{{ timeConverter(chat.time) }}</small> {{ chat.data.name }} </strong>
                          :
                        </v-col>
                        <v-col class="text-right">
                          <div right>
                            <v-icon @click="delchat(chat.id,i.split(':')[1])" class="tisscursur"> mdi-delete</v-icon>
                          </div>
                        </v-col>
                      </v-row>


                    </div>
                    <div class="boxchats" style="height: 300px;">
                      <template v-if="chat.data.mode=='text'">{{ chat.data.msg }}</template>
                      <template v-if="chat.data.mode=='audio'">



                </template>

                      <br/>
                    </div>
                  </li>
                  <div>


                  </div>

                </ul>
                <ul>
                  <li>{{ typing[i.split(':')[1]] }}</li>
                </ul>
              </v-card-text>

            </v-card>
            <v-form @submit.prevent="chat(i.split(':')[1])">

              <v-text-field placeholder="Send Message" @keydown="istyping('typing...',i.split(':')[1])"
                            @keyup="istyping(' ',i.split(':')[1])" v-model="mynewchat"></v-text-field>
              <v-btn type="submit">Send</v-btn>

            </v-form>
          </v-tab-item>

        </v-tabs>
      </v-card>
    </template>

  </div>
</template>

<script>
export default {
  name: "index",
  methods: {
    delchat(id, user) {
      try {
        this.socket.emit('deletechat', {
          id: id,
          name: 'Admin',
          sendmessege: true
        })
      } finally {
        this.chat(user);
      }


    },
    readitem(i) {
      try {
        this.socket.emit('chat message', {
          token: i,
          messege: '',
          name: 'Admin',
          mode: 'text',
          sendmessege: false
        })
      } finally {
        this.mynewchat = null
      }
    },
    createaudio(audio){
    return  'data:audio/mp3;'+audio;
    },
    counter(i) {
      let x = 0;
      for (let variable of i) {
        console.log(variable);
        if (variable.data.read == 'false') {

          x++;
        }

      }

      return x;
    },
    checkpople() {

    },
    chat(id) {
      let that = this;
      try {
        this.socket.emit('chat message', {
          token: id,
          messege: this.mynewchat,
          name: 'Admin',
          mode: 'text',
          sendmessege: true
        })
      } finally {
        this.mynewchat = null
      }

    },
    istyping(msg, id) {
      this.socket.emit('istypeing', {
        token: id,
        messege: msg,
        form: 'admin'

      })
    },
    timeConverter(UNIX_timestamp) {
      var a = new Date(UNIX_timestamp * 1000);
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = '(' + date + ' ' + month + ' ' + year + ')' + hour + ':' + min + ':' + sec;
      return time;
    }
  },
  data() {
    return {
      howtonline: null,
      chats: [],
      typing: [],
      mynewchat: null,

    }
  },
  watch: {
    howtonline: function (newQuestion, oldQuestion) {
      let that = this;
      if (this.howtonline != null) {
        for (const element of this.howtonline.token) {
          this.socket.on('typeingevent' + element.split(":")[1], (msg) => {
            if (msg.form != 'admin') {
              this.typing[element.split(":")[1]] = msg.body;
              this.$forceUpdate();
            }

          });
          this.socket
            .on('chatmessenegr' + element.split(":")[1], (msg, cb) => {

              this.chats[element.split(":")[1]] = msg.body;
              this.$forceUpdate();

            })
        }

      }
    }
  },

  mounted() {

    this.socket = this.$nuxtSocket({
      name: 'home',

    });
    this.checkpople();

    this.socket
      .on('howtonline', (msg, cb) => {
        this.howtonline = msg;
      })

  }
}
</script>
<style scoped>
.codecount {
  background-color: white;
  color: #3b3b3b;
  padding: 3px;
  border-radius: 5px;
  margin: 6px;
}

.tisscursur {
  cursor: pointer;
  color: black;
}

.chatbox {
  border: solid 1px #333333;
  border-radius: 4px;
  list-style: none;
}

.boxchat {
  background: rgb(195, 195, 195);
  background: linear-gradient(20deg, rgba(195, 195, 195, 1) 0%, rgba(228, 228, 228, 1) 100%);

  color: #333;

}

.boxchats {
  background-color: #333333;
  height: 40px;
  padding: 10px;
  font-family: Tahoma;
  padding-bottom: 15px;
  margin-bottom: 10px;
  padding-bottom: 10px;
}
</style>
