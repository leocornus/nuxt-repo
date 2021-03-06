/**
 * configuration for Nuxt.js
 */
export default {

    // set to Single Page application mode.
    //mode: 'spa', --- deprecated! replace with ssr
    // set to false for spa mode.
    ssr: false,

    server: {
        //port: 80, // default is 3000
        host: '0.0.0.0' // default is localhost
    },

    buildModules: [
        // load the nuxtjs vutify-module
        // https://github.com/nuxt-community/vuetify-module
        '@nuxtjs/vuetify',
        // Axios module.
        '@nuxtjs/axios',
        // Auth module.
        '@nuxtjs/auth'
    ],

    /**
     * load plugins.
     * some global components.
     */
    plugins: [
        '~/plugins/index'
    ],

    /**
     * options for auth module.
     */
    auth: {
        strategies: {
            // disable local scheme.
            local: false,

            // config the auth0 scheme.
            auth0: {
                domain: 'dev-leocorn-com.auth0.com',
                client_id: 'FQupK3vGeFus6SLDbv2vshp0ttvA1Bz9'
            }
        },

        redirect: {
            login: '/login',
            logout: '/',
            callback: '/login/',
            home: '/'
        }
    },

    /**
     * configuration for axios moudle.
     */
    axios: {
        // local development environment
        baseURL: 'http://192.168.0.25:3005'
    },

    router: {
        // tweak the base, if we plan to deploy on a subfolder
        // /demo/nuxt
        base: process.env.NODE_ENV === 'DEV' ? '/' : '/nuxt-repo/',

        // enable the middleware
        middleware: ['auth']
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
