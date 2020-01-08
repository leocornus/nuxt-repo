/**
 * configuration for Nuxt.js
 */
export default {

    // set to Single Page application mode.
    mode: 'spa',

    server: {
        // port: 3000, // default is 3000
        host: '0.0.0.0' // default is localhost
    },

    buildModules: [
        // load the nuxtjs vutify-module
        // https://github.com/nuxt-community/vuetify-module
        '@nuxtjs/vuetify'
    ],

    router: {
        // tweak the base, if we plan to deploy on a subfolder
        // /demo/nuxt
        base: process.env.NODE_ENV === 'DEV' ? '/' : '/nuxt-repo/'
    },

    /**
     * options to set up vuetify, details on page
     *  - https://github.com/nuxt-community/vuetify-module
     */
    vuetify: {

        // we could set up default assets here.
        // By default, automatically handle Roboto font & Material Design Icons
    }
}
