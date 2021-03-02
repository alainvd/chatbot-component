<template>
    <div class="sc-message--geo" >
        <div class="sc-message--system">{{data.interpretation}}</div>
        <vue-markdown>{{data.qaContexts[0].label}}</vue-markdown>
        <a :href="'http://www.google.com/maps/place/'+data.qaContexts[0].geo[0].latitude+','+data.qaContexts[0].geo[0].longitude"
           target="_blank">🗺️</a>

    </div>

</template>

<script>
    export default {
        props: {
            data: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>
    .sc-message--system {
        padding: 8px 20px;
        border-radius: 6px;
        font-weight: 300;
        font-size: 12px;
        line-height: 1.2;
        white-space: pre-wrap;
        -webkit-font-smoothing: subpixel-antialiased;
        font-style: italic;
        opacity: .55;
    }

    .sc-message--geo {

        line-height: 1.2;
        white-space: pre-wrap;
        -webkit-font-smoothing: subpixel-antialiased;
        opacity: 1;
    }

    .sc-message--geo a {
        font-size: 30px;
    }

    .sc-message--geo a:hover {
        text-decoration: none;
    }

    .sc-message--meta {
        font-size: xx-small;
        margin-bottom: 0px;
        margin-top: 5px;
        opacity: .5;
        text-align: center;
    }
</style>
