<template lang="pug">
v-container(grid-list-md text-center)

  h1.mt-12 Login Required!
  v-btn(
    @click="login"
    color="primary"
    x-large
  ).mt-10
    v-icon(
      left
    ) mdi-login
    | Login to Leocornus Sandbox

  v-chip(
    v-if="$auth.loggedIn"
    color="primary"
    v-text="$auth.user"
  )
</template>

<script>
export default {

    layout: 'vuetify',
    name: 'LoginPage',

    methods: {
        login: function() {

            return this.$auth.loginWith('auth0')
                .catch(error => {
                    console.log(error);
                });
        }
    }
}
</script>
