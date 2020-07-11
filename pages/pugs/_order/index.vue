<template lang="pug">
v-container( grid-list-xs )
  ul
    li Order ID: {{ $route.params.order}}
</template>

<script>

import axios from 'axios';

export default {

    name: 'DynamicOrder',

    auth: false,

    layout: 'vuetify',

    data() {
        return {
        }
    },

    created() {

        this.downloadFile();
    },

    mounted() {

        this.downloadFile();
    },

    methods: {

        downloadFile() {
            let url = "/template/clist.m3u";
            axios.get(url, {responseType: 'blob'})
            .then( response => {
                const blob = new Blob( [response.data],
                    {type: 'text/plain'});
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = this.$route.params.order + ".m3u";
                link.click();
                URL.revokeObjectURL(link.href);
            })
            .catch(console.error);
        }
    }
}
</script>
