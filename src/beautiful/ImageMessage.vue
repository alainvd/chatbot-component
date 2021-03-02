<template>
    <div class="sc-message--system" v-html="image">

    </div>
</template>

<script>


    export default {

        props: {
            data: {
                type: Object,
                required: true
            }
        },
        computed: {
            image() {
                return '<img style="max-width: 100%" src="' + this.data.image + '">';


            }
        }
    }
</script>
