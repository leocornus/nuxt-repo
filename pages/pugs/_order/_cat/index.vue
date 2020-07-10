<template lang="pug">
v-container( grid-list-xs )
  ul
    li Order ID: {{ $route.params.order }}
    li Category: {{ $route.params.cat }}

  v-btn(@click="downloadFile") Download
</template>

<script>

export default {

    name: 'DynamicOrder',

    auth: false,

    layout: 'vuetify',

    data() {
        return {
        }
    },

    methods: {

        downloadFile() {
            // create blob.
            const blob = new Blob(["order: " + this.$route.params.order +
                "\nCategory: " + this.$route.params.cat],
                { type: "text/plain"});
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            // this will set the filename
            link.download = "filename.txt";
            link.click();
            URL.revokeObjectURL(link.href);
        }
    }
}
</script>
