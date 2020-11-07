<template lang="pug">
v-container( grid-list-xs )
  ul
    li Order ID: {{ $route.params.order }}
    li Category: {{ $route.params.cat }}

  v-btn(@click="downloadFile") Download
</template>

<script>
/**
 * exploring the dynamic routes, 2 level dynamic parameters.
 * 
 * Test scenario:
 * We will get order id and category from the URL, dynamic parameters.
 * Then the Blob object will be used to get ready the content and download link.
 * The download link will be in DOM memory.
 * The download button will triger the download behavior
 */
export default {

    name: 'DynamicOrderCat',

    auth: false,

    layout: 'vuetify',

    data() {
        return {
        }
    },

    mounted() {

        //this.downloadFile();
    },

    methods: {

        /**
         * quick test to download file using the Blob object.
         */
        downloadFile() {
            // create blob.
            const blob = new Blob(["order: " + this.$route.params.order +
                "\nCategory: " + this.$route.params.cat],
                { type: "text/plain"});
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            // this will set the filename
            link.download = this.$route.params.order + "-" + this.$route.params.cat + ".txt";
            link.click();
            console.log(link);
            URL.revokeObjectURL(link.href);
        }
    }
}
</script>
