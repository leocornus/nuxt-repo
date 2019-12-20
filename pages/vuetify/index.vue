<template lang="pug">
v-container(grid-list-md text-center)
  v-layout(row wrap)
    v-flex(xs12)
      v-card(dark color="red")
        v-card-text(class="px-0") {{message}}
    v-flex(v-for="i in 12 * 20" :key="`b${i}`" xs1)
      v-card(dark :color="`#${(i * 50).toString(16)}`")
        v-card-text(class="px-0") {{i}}
</template>

<script>
export default {
  // set the layout, the file name in layouts folder.
  layout: 'vuetify',

  name: 'VuetifyScratchPad',

  data () {
    return {
      message: '',
    };
  },

  methods: {
  },

  created() {

    this.message = "this.$localSettings.applicationName";
  }
}
</script>
