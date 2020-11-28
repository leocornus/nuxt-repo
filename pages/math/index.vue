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
      // set to 5 columns for each row.
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

        // using reduce to do filter and map at the same time.
        this.pages = pages.keys().reduce( (result, page) => {

            // skip the index page.
            if( page !== './index.vue' )
                result.push( page
                    .replace(/\.vue/, '')
                    .replace(/^\.\//, '') );

            // need return the result.
            return result;
        }, [] );
    },
}
</script>
