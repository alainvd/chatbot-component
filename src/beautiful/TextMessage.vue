<template>
    <div class="sc-message--text" :style="messageColors">
        <vue-markdown :anchorAttributes="{  target: '_blank'}">{{messageText}}</vue-markdown>


    </div>
</template>

<script>
    import escapeGoat from 'escape-goat'
    import Autolinker from 'autolinker'
    import VueMarkdown from 'vue-markdown'

    const fmt = require('msgdown')

    export default {
        components: {
            VueMarkdown
        },
        props: {
            data: {
                type: Object,
                required: true
            },
            messageColors: {
                type: Object,
                required: true
            },
            messageStyling: {
                type: Boolean,
                required: true
            }
        },
        computed: {
            messageText() {

                 return this.data.text;
                // const escaped = escapeGoat.escape(this.data.text)
                //const escaped = this.data.text;

                // console.log(escaped);


                // return Autolinker.link(this.messageStyling ? fmt(escaped) : escaped, {
                //   className: 'chatLink',
                //   truncate: { length: 50, location: 'smart' }
                // })

            }
        }
    }
</script>

<style scoped>
    a.chatLink {
        color: inherit !important;
    }
</style>
