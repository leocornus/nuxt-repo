<template lang="pug">
div
  v-app-bar(
    id="home-app-bar"
    app
    color="white"
    elevation="1"
    height="80"
  )
    v-img(
      :src="require('@/assets/logo.svg')"
      class="mr-3 hidden-xs-only"
      contain
      max-width="52"
      width="100%"
    )
</template>

<script>
  export default {
    name: 'ZeroAppBar',

    data: () => ({
      drawer: null,
      items: [
        'Home',
        'About',
        'Contact',
        'Pro',
      ],
    }),
  }
</script>
