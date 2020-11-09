<template lang="pug">
v-container( grid-list-xs )
  h1 {{ $route.params.cat }}
  v-card(
    v-for="(member, index) in members"
    :key="index"
  )
    v-card-title {{ member }}
    async-img(
      :imageId="member"
      size=300
    )
</template>

<script>

import AsyncImage from '@/components/demo/AsyncImage.vue';

export default {

    name: 'DemoCategory',
    auth: false,
    layout: 'vuetify',

    components: {

        "async-img": AsyncImage
    },

    data() {

        return {

            members: []
        };
    },

    mounted() {

        let self = this;

        self.$axios.get( '/w/album/' + self.$route.params.cat )
        .then( response => {

            self.members = response.data.ids;
        } );
    },

    methods: {

        /**
         */
        hello() {
        }
    }
}
</script>
