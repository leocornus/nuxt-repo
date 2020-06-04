<template lang="pug">
// Simple layout for Vuetify playground
v-app
  home-app-bar

  v-content
    Nuxt/
</template>

<script>
export default {

    name: "ZeroLayout",

    components: {
        HomeAppBar: () => import('@/components/zero/AppBar')
    }
}
</script>
