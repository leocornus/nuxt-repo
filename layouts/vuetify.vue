<template lang="pug">
// Simple layout for Vuetify playground
v-app
  v-app-bar(color='indigo' dark fixed app dense)
    v-app-bar-nav-icon/
    v-toolbar-title Leocornus Sandbox
    v-spacer
    v-btn(
      to="/" nuxt
      color='indigo'
      depressed
    )
      v-icon mdi-home
      | Home
    v-btn(
      to="/d3" nuxt
      color='indigo'
      depressed
    )
      v-icon mdi-home-analytics
      | D3
    v-btn(
      to="/math" nuxt
      color='indigo'
      depressed
    )
      v-icon mdi-math-integral-box
      | Math 
    v-btn(
      to="/games" nuxt
      color='indigo'
      depressed
    )
      v-icon mdi-gamepad-variant
      | Games
    // sign in button for not logged in user.
    v-btn(
      v-if="!$auth.loggedIn" 
      color='indigo'
      depressed
      @click="login"
    ) Sign In
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
          v-list-item( to="/solrsearch" )
            v-list-item-icon
              v-icon mdi-note-search
            v-list-item-content
              v-list-item-title Solr Search 
          v-list-item( @click="logout" )
            v-list-item-icon
              v-icon mdi-logout
            v-list-item-content
              v-list-item-title Logout

        v-divider

  v-content
    Nuxt/

  v-footer(color="indigo" app padless)
    v-layout(justify-center row wrap)
      v-flex(py-3 text-center white--text xs12)
        | &copy;{{new Date().getFullYear()}} - <strong>
        | <a href="https://leocorn.com"
        | style="color: white; text-decoration: none">Leocornus LTD.</a></strong>
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
