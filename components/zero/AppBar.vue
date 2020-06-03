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
    v-img(
      :src="require('@/assets/zero-logo-light.svg')"
      contain
      max-width="128"
      width="100%"
    )

    v-spacer

    div
      v-tabs(
        optional
        class="hidden-sm-and-down"
      )
        v-tab(
          v-for="(name, i) in items"
          :key="i"
          :to="{ name }"
          :exact="name === 'Home'"
          :ripple="false"
          active-class="text--primary"
          class="font-weight-bold"
          min-width="96"
          text
        ) {{ name }}
</template>

<script>
  export default {
    name: 'ZeroAppBar',

    data: () => ({
      drawer: null,
      items: [
        'Home',
        //'About',
        //'Contact',
        //'Pro',
      ],
    }),
  }
</script>
