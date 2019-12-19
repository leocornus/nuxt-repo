<template lang="pug">
// Simple layout for Vuetify playground
v-app
  v-app-bar(color='indigo' dark fixed app dense)
    v-app-bar-nav-icon/
    v-toolbar-title Toolbar Grid Footer
    v-spacer
    v-btn(icon)
      v-icon mdi-magnify
    v-btn(icon)
      v-icon mdi-dots-vertical

  v-content
    Nuxt/

  v-footer(color="indigo" app padless)
    v-layout(justify-center row wrap)
      v-flex(py-3 text-center white--text xs12)
        | &copy;{{new Date().getFullYear()}}- <strong>Leocornus LTD.</strong>
</template>

<script>
export default {
}
</script>
