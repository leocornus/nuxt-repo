<template lang="pug">
div( class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column" )
  header( class="masthead mb-auto" )
    div( class="inner" )
      h3( class="masthead-brand" )
      nav( class="nav nav-masthead justify-content-center" )
        a( class="nav-link active" href="#" ) Home

  main( role="main" class="inner cover" )
    h1 Leocornus Ltd.
    h3( class="cover-heading mt-4 mb-5" )
      | Open Source Experts to bring Innovation, Intelligence and Efficency on your day to day business!
    h4 Contact: hello@leocorn.com

  footer( class="mastfoot mt-auto" )
    div( class="inner" )
      p 2009 - 2020 Leocornus Ltd. All rights reserved.
</template>

<script>
export default {
    name: "homepage",
    data() {
        return {
        }
    }
}
</script>

<style lang="sass">
</style>
