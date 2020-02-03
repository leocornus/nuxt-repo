<template lang="pug">
v-container(grid-list-md text-center)
  v-list
    v-list-item
      n-link(to="/revasearch") Reva Search
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
