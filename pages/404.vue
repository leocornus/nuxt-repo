<template lang="pug">
v-container(grid-list-md text-center)
  h1 Page NOT exit!
  h2 Go back to 
    n-link(to="/") Homepage
</template>

<script>

import Profile from '@/libs/profile';

export default {

    layout: 'vuetify',

    name: "homepage",

    // turn off authtication.
    auth: false,
}
</script>

<style lang="sass">
</style>
