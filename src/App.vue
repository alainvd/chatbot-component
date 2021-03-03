<template>
  <div id="app">
    <img alt="Vue logo" src="https://source.unsplash.com/ohBhECoxQoU/400x250">

    <chat-component :env="'codeweek'"></chat-component>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import ChatComponent from "@/components/ChatComponent";

export default {
  name: 'App',
  components: {
  //  HelloWorld,
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
