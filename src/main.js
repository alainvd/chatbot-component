import Vue from 'vue'
import App from './App.vue'
//import axios from 'axios'
window.axios = require('axios');

import vueCustomElement from 'vue-custom-element'
import VueMarkdown from 'vue-markdown'
import Chat from './beautiful';

import VueSession from 'vue-session'
var options = {
    persist: true
}

Vue.use(VueSession, options);

//Vue.prototype.$axios = axios

Vue.use(Chat);

//Vue.component('chatComponent', require('./components/ChatComponent.vue'));

Vue.config.productionTip = false

Vue.use(vueCustomElement);

Vue.customElement('doris-chatbot', App);


