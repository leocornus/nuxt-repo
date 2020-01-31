<template lang="pug">
v-container( grid-list-xs )
  h1 Hello {{ name }}!
  h3 Client IP: {{clientIp}}
</template>

<script>

import axios from 'axios';

export default {

    auth: false,

    layout: 'vuetify',

    data() {
        return {
            name: 'Pug World'
        }
    },

    asyncData() {

        return axios.get('https://www.cloudflare.com/cdn-cgi/trace')
            .then(function(res) {
                //console.log(res);
                let all = res.data.split("\n")[2];
                return {clientIp: all.split("=")[1]};
            });
    }
}
</script>

<style lang="sass">
.red
  //color: red
</style>
