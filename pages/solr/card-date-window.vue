<template lang="pug">
// the card to show time window.
v-expansion-panels(dense)
  v-expansion-panel
    v-expansion-panel-header Date Window
    v-expansion-panel-content
      v-menu(
        ref="fromPicker"
        v-model="fromPicker"
        :close-on-content-click="false"
        :return-value.sync="from"
        transition="scale-transition"
        offset-y
        min-width="290px"
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
      v-btn(
        dark
        color="success"
        @click="handleAbsoluteDates"
      )
        v-icon mdi-check
      v-btn(
        dark
        color="error"
        @click="handleCleanDates"
      )
        v-icon mdi-calendar-remove
      v-btn(
        dark
        color="primary"
        @click="handleToday"
      )
        v-icon mdi-calendar-today
</template>

<script>

export default {

    name: "date-window",

    props: [],

    data() {
        return {

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
         */
        handleAbsoluteDates() {

            let rangeFrom = this.from === "" ? "*" : this.from + "T00:00:00Z";
            let rangeTo = this.to === "" ? "*" : this.to + "T00:00:00Z";
            //console.table({"from": this.from, "to": this.to});
            this.dateRange = [rangeFrom, rangeTo];

            // emit the date change event.
            this.$emit('dates-change', this.dateRange);
        },

        /**
         */
        handleCleanDates() {

            this.from = "";
            this.to = "";
            this.dateRange = ["*", "*"];

            // emit the date change event.
            this.$emit('dates-change', this.dateRange);
        },

        /**
         * handle today button.
         */
        handleToday() {

            // set to today,
            this.from = this.to = (new Date()).toISOString().split("T")[0];

            this.handleAbsoluteDates();
        }
    }
}
</script>
