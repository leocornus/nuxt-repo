<template lang="pug">
v-container( grid-list-xs )

  // the search row, with text field and buttons.
  v-card( class="d-flex flex-row" flat tile )
    // need use dense to align the size with buttons.
    v-text-field( 
      dense
      id='input-number'
      autocomplete="off"
      v-model='inputNumber' 
      label="Type your query here"
      :loading='loading'
    )
    // search button
    v-btn( 
      color="warning" 
      dark icon
      class="pa-2"
    )
      v-icon mdi-magnify
      | search
    // setting button
    v-btn(
      color="success"
      dark icon
      class="pa-2"
      @click.stop="settingsDialog = true"
    )
      v-icon mdi-settings
      | settings

  v-dialog( v-model="settingsDialog" )
    card-settings(
      :cancelSettings="settingsCancel",
      :saveSettings="settingsSave"
    )

  // search result list with facet filters on the left side.
  v-layout( row wrap )
     // the search result list.
</template>

<script>
import PrimeNumber from '@/libs/PrimeNumber';

import SettingsCard from '@/pages/solr/card-settings.vue';

export default {
    components: {
        'card-settings': SettingsCard
    },

    layout: 'vuetify',

    name: 'solr-search',

    data () {

        return {

            inputNumber: null,
            // the switch to show or hide the settings dialog.
            settingsDialog: false,

            loading: false,

            // the color style class from Vuetify
            msgColor: "primary--text",

            // the display class for factorization section.
            factorDisplay: "d-none",
            // the message for integer factorization:
            factorizationMsg: ""
        };
    },

    computed: {

        resultMessage: function() {

            if(this.inputNumber === null || this.inputNumber === "") {

                this.msgColor = "primary--text";
                this.factorDisplay = "d-none";
                return "Waiting for the number...";
            } else {

                if (this.checkPrimeNumber(this.inputNumber)) {

                    return this.primeNumberMessage(this.inputNumber);
                } else {

                    return this.nonePrimeNumberMessage(this.inputNumber);
                }
            }
        }
    },

    methods: {

        /**
         */
        settingsCancel: function() {

            this.settingsDialog = false;
        },

        /**
         */
        settingsSave: function() {

            this.settingsDialog = false;
        },

        /**
         * utility function to check if the given number is a prime number.
         */
        checkPrimeNumber: function(theNumber) {

            console.log(theNumber);
            return PrimeNumber.isPrimeNumber(theNumber);
        },

        /**
         * the message for prime number.
         */
        primeNumberMessage: function(theNumber) {

            this.msgColor = "red--text";
            this.factorDisplay = "d-none";
            return theNumber + " is a prime number";
        },

        /**
         * the message for none prime number.
         */
        nonePrimeNumberMessage: function(theNumber) {

            // set the text color.
            this.msgColor = "green--text";

            // get ready the integer factorization.
            let factors = PrimeNumber.trialDivision(theNumber);
            this.factorizationMsg = JSON.stringify(factors);
            // show the message.
            this.factorDisplay = "";

            return theNumber + " is NOT a prime number";
        }
    }
}
</script>
