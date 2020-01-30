<template lang="pug">
v-container(grid-list-md text-center)
  h2 Login
  hr
  v-btn(@click="login") Login Auth0

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
