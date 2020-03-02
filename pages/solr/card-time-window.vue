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
      
      // time window type.
      v-chip-group(
        v-model="windowType"
        mandatory
        active-class="deep-purple--text text--accent-4"
      )
        v-chip(
          value="relative"
          @click="$emit('time-window-type', 'relative')"
        ) Relative
        v-chip(
          value="absolute"
          @click="$emit('time-window-type', 'absolute')"
        ) Absolute
        v-chip(
          value="since"
          @click="$emit('time-window-type', 'since')"
        ) Since
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
            dateRange: ["*", "*"]
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
        }
    }
}
</script>
