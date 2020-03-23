<template lang="pug">
v-container( grid-list-xs )
  v-row
    v-col( cols="12" md="12" )
      v-data-table(
         :headers="headers"
         :items="cases"
         :items-per-page="perPage"
         hide-default-footer
      )
</template>

<script>

import covid from '@/libs/covid19.js';

export default {

    auth: false,

    layout: 'vuetify',

    // components.

    // data.
    data() {
        return {

            // items per page.
            perPage: 25,

            cases: [],

            headers: [
                { text: "Country", value: "country_region"},
                { text: "Confirmed", value: "confirmed"},
                { text: "Deaths", value: "death"},
                { text: "Recovered", value: "recovered"}
            ]
        };
    },

    /**
     */
    created() {

        covid.getCases(this, 0);
    }
}
</script>

<style lang="sass">
.red
  //color: red
</style>
