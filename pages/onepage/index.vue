<template lang="pug">
v-app( light )
  v-parallax( height="800" src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" )
    v-layout( column align-center justify-center class="white--text")
      h1( class="mb-10 display-1 text-center") Leocornus Ltd.
      h3( class="mb-4 text-center" )
        | Open Source Experts to bring <strong>Innovation</strong>,
        | <strong>Intelligence</strong> and <strong>Efficiency</strong> on your day to day business!
      h4 Contact: <strong>hello@leocorn.com</strong>

  v-footer.blue.lighten-1
    v-layout( row wrap align-center justify-center )
      div( class="white--text ml-4 text-center" )
        p &copy; 2009 - 2020 Leocornus Ltd.
</template>

<script>
export default {
    name: "homepage",
    auth: false,
    data() {
        return {
        }
    }
}
</script>

<style lang="sass">
</style>
