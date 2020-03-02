<template lang="pug">
// the card to show time window.
v-expansion-panels
  v-expansion-panel
    v-expansion-panel-header Time Window
    v-expansion-panel-content
      // relative time window
      v-btn-toggle(
        v-if="windowType === 'relative'"
        v-model="toggleExclusive"
        active-class="primary--text"
        mandatory
        dense
      )
        v-btn(
          @click = "handleRelativeDates(0)"
        ) All
        v-btn(
          @click = "handleRelativeDates(1)"
        ) Today
        v-btn(
          @click = "handleRelativeDates(7)"
        ) 7 Days
        v-btn(
          @click = "handleRelativeDates(30)"
        ) 30 Days
        v-btn(
          @click = "handleRelativeDates(60)"
        ) 2 Monthes
        v-btn(
          @click = "handleRelativeDates(90)"
        ) 3 Monthes

      // absolute date pickers.
      v-row(
        v-if="windowType === 'absolute'"
      )
        v-col(
          cols="2"
        ).py-0
          v-menu(
            ref="fromPicker"
            v-model="fromPicker"
            :close-on-content-click="false"
            :return-value.sync="from"
            transition="scale-transition"
            offset-y
            min-width="290px"
            dense
          )
            template( v-slot:activator="{ on }" )
              v-text-field(
                v-model="from"
                label="FROM"
                prepend-icon="mdi-calendar-range"
                readonly
                v-on="on"
              ).py-0
            // the model should be in ISO format.
            v-date-picker(
              v-model="from"
              scrollable
              color="green lighten-1"
              @click:date="$refs.fromPicker.save(from)"
            )
        v-col(
          cols="2"
        ).py-0
          v-menu(
            ref="toPicker"
            v-model="toPicker"
            :close-on-content-click="false"
            :return-value.sync="to"
            transition="scale-transition"
            offset-y
            min-width="290px"
          )
            template( v-slot:activator="{ on }" )
              v-text-field(
                v-model="to"
                label="TO"
                prepend-icon="mdi-calendar-range"
                readonly
                v-on="on"
              ).py-0
            // the model should be in ISO format.
            v-date-picker(
              v-model="to"
              scrollable
              color="green lighten-1"
              @click:date="$refs.toPicker.save(to)"
            )
        v-col(
          cols="2"
        ).py-0
          v-btn(
            dark
            color="indigo"
            @click="handleAbsoluteDates"
          )
            v-icon mdi-check

      // time window type.
      v-chip-group(
        v-model="windowType"
        mandatory
        active-class="deep-purple--text text--accent-4"
      )
        v-chip(
          value="relative"
        ) Relative
        v-chip(
          value="absolute"
        ) Absolute
        //v-chip(
        //  value="since"
        //) Since
</template>

<script>

export default {

    name: "time-window",

    props: [],

    data() {
        return {
            // window type
            windowType: 'relative',

            toggleExclusive: undefined,

            // Date range, from to,
            dateRange: ["*", "*"],

            // absolute date range picker.
            from: "",
            fromPicker: "",
            to: "",
            toPicker: ""
        }
    },

    // using computed for dynamic data.
    computed: {

    },
    
    methods: {

        /**
         * handle relative days selection event for time window
         */
        handleRelativeDates(dates) {

            //console.log(dates);
            if(dates < 1) {
                this.dateRange = ["*", "*"];
            } else if(dates == 1) {
                this.dateRange = ["NOW-" + dates + "DAY", "*"];
            } else {
                this.dateRange = ["NOW-" + dates + "DAYS", "*"];
            }

            //stocks.getTransactions(this, 0);
            // emit the date change event.
            this.$emit('dates-change', this.dateRange);
        },

        /**
         */
        handleAbsoluteDates() {

            //console.table({"from": this.from, "to": this.to});
            this.dateRange = [this.from + "T00:00:00Z", this.to + "T00:00:00Z"];

            // emit the date change event.
            this.$emit('dates-change', this.dateRange);
        }
    }
}
</script>
