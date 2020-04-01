<template lang="pug">
v-container( grid-list-xs )
  h2 Add Accomplishment
  v-form(v-model="formValid")
    v-row(align="end")
      v-col(cols="12")
        v-text-field(
          label="Accomplishment Description"
          v-model="accomplishment"
          required
          :rules="[v => !!v || 'Description is required']"
        )
    v-row
      v-col(cols="3")
        v-menu(
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="day"
          transition="scale-transition"
          offset-y
          min-width="290px"
        )
          template( v-slot:activator="{ on }" )
            v-text-field(
              v-model="day"
              label="Pick the date"
              prepend-icon="mdi-calendar-range"
              readonly
              v-on="on"
            )
          // the model should be in ISO format.
          v-date-picker(
            v-model="day"
            scrollable
            color="green lighten-1"
            @click:date="$refs.menu.save(day)"
          )
      v-col(cols="3")
        v-menu(
          ref="menut"
          v-model="menut"
          :close-on-content-click="false"
          :return-value.sync="time"
          transition="scale-transition"
          offset-y
          min-width="290px"
        )
          template( v-slot:activator="{ on }" )
            v-text-field(
              v-model="time"
              label="Pick the time"
              prepend-icon="mdi-calendar-clock"
              readonly
              v-on="on"
            )
          // the model should be in ISO format.
          v-time-picker(
            v-model="time"
            scrollable
            color="green lighten-1"
            @click:minute="$refs.menut.save(time)"
          )
      v-col(cols="3")
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
    span(v-if="$auth.loggedIn") for {{ $auth.user.name }}
  v-layout( row wrap )
    v-row
      v-col(cols="12" md="3")
        date-window(
          v-on:dates-change="handleDatesChange"
        )
        stats(
          :stats="summary"
        )
      v-col(cols="12" md="9")
        v-data-table(
          :headers="headers"
          :items="jobs"
          :item-per-page="perPage"
        )
          template(v-slot:item.credit="{item}")
            v-chip(
              :color="item.credit < 0  ? 'error' : 'success'"
              dark
            ) {{ item.credit}}
</template>

<script>

import credits from '@/libs/credits.js';
import StatsCard from '@/pages/solr/card-stats.vue';
import DateWindowCard from '@/pages/solr/card-date-window.vue';

export default {

    auth: false,
    layout: 'vuetify',

    components: {
        'date-window': DateWindowCard,
        'stats': StatsCard
    },

    data() {

         return {

             menu: '',
             // conver to ISO format: YYYY-MM-DD,
             // v-date-picker is prefer ISO format.
             //day: (new Date()).toISOString().split('T')[0],
             day: credits.getToday(),

             menut: "",
             // the time format will like the following
             //time: "12:00",
             time: credits.getCurrentTime(),

             formValid: true,
             accomplishment: '',
             credit: 1,
             creditRules: [
                 v => !!v || 'Credit is required!',
                 v => /^-?[0-9]*(\.\d+)?$/.test(v) || 'Credit should be integer or decimal'
             ],

             headers: [
                 // text will be the label and 
                 // value will be the property name of the object.
                 { text: "Day", value: "day" },
                 //{ text: "Time", value: "time" },
                 { text: "Accomplishment", value: "accomplishment" },
                 { text: "Credit", value: "credit" }
             ],

             jobs: [
                 //{accomplishment: '',
                 // credit: 1
                 //}
             ],

             //summary: null,
             summary: {
                 "Job Count": 4,
                 "Total Credits:": 23.5,
                 "Negative Credits:": -22
             },

             start: 0,
             perPage: 15,

             /**
              * date range array, [from, to]
              * defalt is all days
              */
             dateRange: ["*", "*"]
         };
    },

    methods: {

        addAccomplishment() {

            if(this.$auth.loggedIn) {

                credits.addAccomplishment(this);
            } else {

                this.jobs.push({
                    day: this.day,
                    time: this.time,
                    accomplishment: this.accomplishment,
                    credit: this.credit
                });

                this.resetFields();
            }
        },

        resetFields() {

            // reset all fields.
            this.accomplishment = "";
            this.credit = "";
            this.day = credits.getToday();
            this.time = credits.getCurrentTime();
        },

        /**
         */
        handleDatesChange(newRange) {

            this.dateRange = newRange;

            if(this.$auth.loggedIn) {
                credits.getAccomplishments(this);
            }
        }
    },

    /**
     */
    created() {

        if(this.$auth.loggedIn) {
            credits.getAccomplishments(this);
        }
    }
}

</script>

<style lang="sass">
.credit
  background-color: red
  color: white
</style>
