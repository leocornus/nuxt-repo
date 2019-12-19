<template lang="pug">
// Simple layout for Vuetify playground
v-app
  v-app-bar(color='indigo' dark fixed app)
    v-app-bar-nav-icon/
    v-toolbar-title Toolbar Grid Footer
    v-spacer
    v-btn(icon)
      v-icon mdi-magnify
    v-btn(icon)
      v-icon mdi-dots-vertical

  v-content
    Nuxt/

  v-footer(height="auto" color="indigo" app)
    v-layout(justify-center row wrap)
      v-flex(py-3 text-xs-center white--text xs12)
        | &copy;2019 - <strong>Leocornus LTD.</strong>
</template>

<script>
export default {
}
</script>
