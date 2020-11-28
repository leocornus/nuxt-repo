<template lang="pug">
v-container(grid-list-md text-center)
  v-row
    template(
      v-for="(page, index) in pages"
    )
      v-col(
        :key="index"
      )
        v-card
          v-card-text
            nuxt-link( :to="$route.path + '/' + page" ) {{ page }}
      // set to two columns for each row.
      v-responsive(
        v-if="((index + 1) % 5) === 0"
        :key="`width-${index}`"
        width="100%"
      )
</template>

<script>

export default {

    layout: 'vuetify',
    name: 'MathIndex',
    auth: false,

    methods: {

        pagesList: function() {

        }
    },

    /**
     * before the page loaded.
     */
    beforeMount() {

        // load all files in current folder
        let pages = require.context('./', true, /\.vue$/);
        //console.log(pages);

        this.pages = pages.keys().map( page => {

            if( page === './index.vue' )
                return;

            return page
                .replace(/index.vue/, '')
                .replace(/\.vue/, '')
                .replace(/^\.\//, '');
        } );
    },
}
</script>
