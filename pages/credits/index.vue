<template lang="pug">
v-container( grid-list-xs )
  h2 Add Accomplishment
  v-form
    v-row(align="end")
      v-col(cols="9")
        v-text-field(
          label="Accomplishement Description"
        )
        v-text-field(
          label="Credit earned"
        )
      v-col(cols="3")
        v-btn(color="primary") Add
</template>

<script>

export default {

    auth: false,
    layout: 'vuetify',

    data() {
         return {
         };
    }
}
</script>

<style lang="sass">
</style>
