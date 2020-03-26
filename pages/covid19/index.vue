<template lang="pug">
v-container( grid-list-xs )
  h2(class="text-center") COVID-19 Global Cases
  div(class="text-center").mb-1
    v-chip(label) Last updated:
      i {{ lastUpdated }}
    v-btn( small color="teal"
      @click="reload"
    ).ml-2.lighten-4
      v-icon(left) mdi-reload
      | Refresh
  v-card
    v-card-title
      //h3 Global Cases
      v-row(class="text-center")
        v-col(col="2")
          h4 Confirmed
          v-chip( color="warning" x-large ) {{ numFormater.format(total.confirmed) }}
        v-col(col="2")
          h4 Deaths
          v-chip( color="error" x-large ) {{ numFormater.format(total.death) }}
        v-col(col="2")
          h4 Recovered
          v-chip( color="success" x-large ) {{ numFormater.format(total.recovered) }}
    v-card-text
      v-data-table(
         :headers="headers"
         :items="cases"
         :items-per-page="perPage"
         :sortBy="sortBy"
         sortDesc
      )
        // set the number format.
        template(v-slot:item.confirmed="{ item }")
          | {{ numFormater.format(item.confirmed) }}
        template(v-slot:item.death="{ item }")
          | {{ numFormater.format(item.death) }}
        template(v-slot:item.recovered="{ item }")
          | {{ numFormater.format(item.recovered) }}
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

            total: {
                confirmed: 100,
                death: 23,
                recovered: 58
            },

            // items per page.
            perPage: 15,
            sortBy: ["confirmed"],

            cases: [],

            lastUpdated: '',

            headers: covid.getHeaders(),

            numFormater: new Intl.NumberFormat('en-US')
        };
    },

    /**
     */
    created() {

        covid.getCases(this, 0);
    },

    methods: {

        reload() {

            covid.getCases(this, 0);
        }
    }
}
</script>

<style lang="sass">
.red
  //color: red
</style>
