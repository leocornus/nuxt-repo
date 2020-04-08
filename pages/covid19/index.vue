<template lang="pug">
v-container( grid-list-xs )
  h1(class="text-center") COVID-19 Global Cases
  div(class="text-center").mb-1
    v-chip(label) Last updated:
      i {{ lastUpdated }}
    v-btn( small color="teal"
      @click="reload"
    ).ml-2.lighten-4
      v-icon(left) mdi-reload
      | Refresh in {{ timerFormat(timer) }}
  v-row
    v-col(col="4")
      v-card( class="mx-auto"
        color="warning"
        shaped
      )
        v-card-text
          div Confirmed
          p.display-2.text--primary
            span(id="confirmedId") {{ numFormater.format(total.confirmed) }}
          div New confimed
          div.display-1.white--text
            span(id="newConfirmedId") {{ numFormater.format(total.new_confirmed) }}
    v-col(col="4")
      v-card( class="mx-auto"
        color="error"
        shaped
      )
        v-card-text
          div Deaths
          p.display-2.text--primary
            span(id="deathId") {{ numFormater.format(total.death) }}
          div New deaths
          div.display-1.white--text
            span(id="newDeathId") {{ numFormater.format(total.new_death) }}
    v-col(col="4")
      v-card( class="mx-auto"
        color="success"
        shaped
      )
        v-card-text
          div Recovered
          p.display-2.text--primary
            span(id="recoveredId") {{ numFormater.format(total.recovered) }}
          div New recovered
          div.display-1.white--text
            span(id="newRecoveredId") {{ numFormater.format(total.new_recovered) }}
  v-card
    v-card-title
      h3 Cases break down by countries
      v-row(class="text-center d-none")
        v-col(col="2")
          h4 Confirmed
          v-chip( color="warning" x-large )
            span(id="confirmedId") {{ numFormater.format(total.confirmed) }}
        v-col(col="2")
          h4 New Today 
          v-chip( color="warning darken-2" large ) +
            span(id="newConfirmedId") {{ numFormater.format(total.new_confirmed) }}
        v-col(col="2")
          h4 Deaths
          v-chip( color="error" x-large )
            span(id="deathId") {{ numFormater.format(total.death) }}
        v-col(col="2")
          h4 New Deaths
          v-chip( color="error" large ) +
            span(id="newDeathId") {{ numFormater.format(total.new_death) }}
        v-col(col="2")
          h4 Recovered
          v-chip( color="success" x-large )
            span(id="n-recoveredId") {{ numFormater.format(total.recovered) }}
        v-col(col="2")
          h4 New Today 
          v-chip( color="success" large ) +
            span(id="newRecoveredId") {{ numFormater.format(total.new_recovered) }}
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
        template(v-slot:item.new_confirmed="{ item }")
          | {{ numFormater.format(item.new_confirmed) }}
        template(v-slot:item.death="{ item }")
          | {{ numFormater.format(item.death) }}
        template(v-slot:item.recovered="{ item }")
          | {{ numFormater.format(item.recovered) }}
</template>

<script>

import covid from '@/libs/covid19.js';
import {CountUp} from 'countup.js';

export default {

    auth: false,

    layout: 'vuetify',

    // components.

    // data.
    data() {
        return {

            total: {
                confirmed: 0,
                death: 0,
                recovered: 0,
                "new_confirmed": 0,
                "new_death": 0,
                "new_recovered": 0
            },

            // items per page.
            perPage: 15,
            sortBy: ["confirmed"],

            cases: [],

            lastUpdated: '',

            headers: covid.getHeaders(),

            numFormater: new Intl.NumberFormat('en-US'),

            // refresh timer, in seconds.
            timer: 180
        };
    },

    /**
     */
    created() {

        let self = this;

        covid.getCases(this, 0, function() {

            self.confirmedCount.update(self.total.confirmed);
            self.deathCount.update(self.total.death);
            self.recoveredCount.update(self.total.recovered);

            setInterval( () => self.clockTick(), 1 * 1000 );
        });
    },

    mounted() {

        this.confirmedCount = new CountUp( "confirmedId", this.total.confirmed );
        this.deathCount = new CountUp( "deathId", this.total.death);
        this.recoveredCount = new CountUp( "recoveredId", this.total.recovered);
        //console.log(confirmedCount);
    },

    methods: {

        reload() {

            let self = this;

            self.cleanData();

            covid.getCases(this, 0, function() {

                self.confirmedCount.update(self.total.confirmed);
                self.deathCount.update(self.total.death);
                self.recoveredCount.update(self.total.recovered);

                // reset timer.
                self.timer = 180;
            });
        },

        cleanData() {

            // clean total.
            this.total = {
                confirmed: 0,
                death: 0,
                recovered: 0,
                "new_confirmed": 0,
                "new_death": 0,
                "new_recovered": 0
            }
            // reset cases.
            this.cases = [];
            this.lastUpdated = '';
            // reset count.
            this.confirmedCount.reset();
            this.deathCount.reset();
            this.recoveredCount.reset();
        },

        /**
         * for each clock tick
         */
        clockTick() {

            // count down timer.
            if( this.timer > 0 )
                // count down
                this.timer --;
            else
                // reload page.
                this.reload();
        },

        /**
         * format the given seconds in clock style.
         */
        timerFormat( seconds ) {

            // string padStart will add leading 0
            const mins = (Math.floor(seconds / 60.0) + "").padStart(2, '0');
            const remains = (seconds % 60 + "").padStart(2, '0');
            return mins + ":" + remains;
        }
    }
}
</script>

<style lang="sass">
.red
  //color: red
</style>
