<template lang="pug">
v-container( grid-list-xs )
  v-layout( row wrap )
    // the prime number checker card
    v-flex( xs12 sm4 )
      v-toolbar( color="indigo" dark dense light )
        v-toolbar-title Prime Number Checker
      v-card
        v-card-title( primary-title )
          v-row
            v-text-field( 
              id='input-number'
              autocomplete="off"
              v-model='inputNumber' 
              label="Give me a number:"
              :loading='loading'
            )
        v-card-text
          strong( :class="msgColor" )
            |{{ resultMessage }}
          div( :class="factorDisplay" )
            p
              h3 Integer Factorization for {{ inputNumber }}:
              h3( class="primary--text" ) {{ factorizationMsg }}

    // The card for prime number list.
    card-pns(:upToNumber="300")/
</template>

<script>
import PrimeNumber from '@/libs/PrimeNumber';

import CardPrimeNumbers from '@/pages/vuetify/card-primenumbers.vue';

export default {
    components: {
        'card-pns': CardPrimeNumbers
    },

    layout: 'vuetify',

    name: 'prime-number',

    data () {
        return {

            inputNumber: null,

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
