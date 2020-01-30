<template lang="pug">
// Simple layout for Vuetify playground
v-app
  v-app-bar(color='indigo' dark fixed app dense)
    v-app-bar-nav-icon/
    v-toolbar-title Leocornus Development
    v-spacer
    v-btn(icon to="/" nuxt)
      v-icon mdi-home
    // sign in button for not logged in user.
    v-btn(
      v-if="!$auth.loggedIn" 
      color='indigo'
      depressed
      @click="login"
    )
      | Sign In
    v-menu(
      v-if="$auth.loggedIn"
      left bottom offset-y transition="scale-transition"
    )
      template( v-slot:activator="{ on }" )
        v-btn(
          v-if="$auth.loggedIn" 
          v-on="on"
          color="indigo"
          depressed
        )
          v-avatar(
            size="32"
          )
            img(:src="$auth.user.picture")
            v-icon mdi-menu-down
      v-card
        v-list
          v-list-item
            v-list-item-avatar
              img( :src="$auth.user.picture" )
            v-list-item-content
              v-list-item-title {{$auth.user.name}}
              v-list-item-subtitle {{$auth.user.email}}
          v-list-item( @click="logout" )
            v-list-item-title Logout

        v-divider

  v-content
    Nuxt/

  v-footer(color="indigo" app padless)
    v-layout(justify-center row wrap)
      v-flex(py-3 text-center white--text xs12)
        | &copy;{{new Date().getFullYear()}} - <strong>Leocornus LTD.</strong>
</template>

<script>
export default {
    methods: {
        login: function() {

            return this.$auth.loginWith('auth0')
                .catch(error => {
                    console.log(error);
                });
        },

        logout: function() {

            return this.$auth.logout();
        }
    }
}
</script>
