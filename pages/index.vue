<template lang="pug">
v-container(grid-list-md text-center)
  v-list
    v-list-item
      n-link(to="/revasearch") Reva Search
    v-list-item
      n-link(to="/login") Login
</template>

<script>
export default {

    layout: 'vuetify',

    name: "homepage",

    // turn off authtication.
    auth: false,

    data() {
        return {
        }
    }
}
</script>

<style lang="sass">
</style>
