<template>
  <div id="app">
    <chat-component :env="environment"></chat-component>
  </div>
</template>

<script>
import ChatComponent from "@/components/ChatComponent";

export default {
  name: 'App',
  props: ['environment'],
  components: {
    ChatComponent
  }
}
</script>

