<template lang="pug">
v-container( grid-list-xs )
  h2 Add Accomplishment
  v-form(v-model="formValid")
    v-row(align="end")
      v-col(cols="9")
        v-text-field(
          label="Accomplishment Description"
          v-model="accomplishment"
          required
          :rules="[v => !!v || 'Description is required']"
        )
        v-text-field(
          label="Credit earned"
          v-model="credit"
          required
          :rules="creditRules"
        )
      v-col(cols="3")
        v-btn(
          :disabled="!formValid"  
          color="primary"
          @click="addAccomplishment"
        ) Add

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
             formValid: true,
             accomplishment: '',
             credit: 1,
             creditRules: [
                 v => !!v || 'Credit is required!',
                 v => /^-?[0-9]*(\.\d+)?$/.test(v) || 'Credit should be integer or decimal'
             ],

             headers: [
                { text: "Accomplishment", value: "accomplishment" },
                { text: "Credit", value: "credit" }
             ],
             jobs: [
                 //{accomplishment: '',
                 // credit: 1
                 //}
             ],
             perPage: 15
         };
    },

    methods: {

        addAccomplishment() {

            this.jobs.push({
                accomplishment: this.accomplishment,
                credit: this.credit
            });

            // reset all fields.
            this.accomplishment = "";
            this.credit = "";
        }
    }
}

</script>

<style lang="sass">
</style>
