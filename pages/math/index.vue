<template lang="pug">
v-container(grid-list-md text-center)
  page-index( :pages='pages' )
</template>

<script>

import PageIndex from '@/components/PageIndex';

export default {

    layout: 'vuetify',
    name: 'MathIndex',
    auth: false,

    components: {
        'page-index': PageIndex
    },

    methods: {

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
