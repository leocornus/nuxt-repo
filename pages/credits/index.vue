<template lang="pug">
v-container( grid-list-xs )
  h2 Add Accomplishment
  v-form
    v-row(align="end")
      v-col(cols="9")
        v-text-field(
          label="Accomplishment Description"
        )
        v-text-field(
          label="Credit earned"
        )
      v-col(cols="3")
        v-btn(color="primary") Add

  h2 Accomplishments
  v-data-table(
    :headers="headers"
    :items="jobs"
    :item-per-page="perPage"
  )
</template>

<script>

export default {

    auth: false,
    layout: 'vuetify',

    data() {

         return {
             headers: [
                { text: "Accomplishment", value: "accomplishment" },
                { text: "Credit", value: "credit" }
             ],
             jobs: [
                 {accomplishment: '',
                  credit: 1
                 }
             ],
             perPage: 15
         };
    },

    methods: {

        addAccomplishment() {

        }
    }
}

</script>

<style lang="sass">
</style>
