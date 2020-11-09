<template lang="pug">
v-container( grid-list-xs )
  h1 {{ $route.params.cat }}
  v-row()
    template(
      v-for="(member, index) in members"
    )
      v-col( :key="member" )
        async-img(
          :imageId="member"
          size=200
        )

      v-responsive(
        v-if="((index + 1) % 4) === 0"
        :key="`width-${index}`"
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
