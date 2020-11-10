<template lang="pug">
v-container(
  justify="center"
  class="fill-height fill-width"
)
  h1 {{ $route.params.cat }}
  v-row()
    v-col(
      v-for="(member, index) in members"
      :key="member" 
      class="d-flex child-flex"
    )
      v-card
        async-img(
          :imageId="member"
          size="250"
          height="250"
        )
        v-card-actions
          v-spacer
          v-btn( icon )
            v-icon mdi-heart
          v-btn( icon )
            v-icon mdi-bookmark
          v-btn( icon )
            v-icon mdi-share-variant

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
