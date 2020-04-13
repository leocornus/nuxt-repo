<template lang="pug">
v-container(grid-list-md text-center)
  v-list
    v-list-item
      a(href="https://covid19.leocorn.com") COVID-19 Cases Live Site (https:/covid19.leocorn.com)
    v-list-item
      n-link(to="/covid19") COVID-19 Cases (DEV Site)
    v-list-item
      n-link(to="/vuetify/prime-number") Prime Number Checker
    v-list-item
      n-link(to="/d3") D3 demo
    v-list-item
      n-link(to="/revasearch") Reva Search
    v-list-item
      n-link(to="/clocks") Clocks and Timers
    v-list-item
      n-link(to="/login") Login
</template>

<script>

import Profile from '@/libs/profile';

export default {

    layout: 'vuetify',

    name: "homepage",

    // turn off authtication.
    auth: false,

    data() {
        return {
            profileName: Profile.name
        }
    }
}
</script>

<style lang="sass">
</style>
