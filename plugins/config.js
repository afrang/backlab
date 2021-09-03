import Vue from 'vue'
Vue.prototype.$url = 'https://api.raziantibody.com/';
Vue.prototype.$storage ='https://api.raziantibody.com';
Vue.prototype.$domain ='https://api.raziantibody.com';
export default ({app}) => {
  app.$url = 'https://api.raziantibody.com/';
}

