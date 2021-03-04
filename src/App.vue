<template>
  <div id="app">
    <chat-component :env="environment"></chat-component>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import ChatComponent from "@/components/ChatComponent";

export default {
  name: 'App',
  props: ['environment'],
  components: {
    ChatComponent
  }
}
</script>

<style>
@import './assets/css/app.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
