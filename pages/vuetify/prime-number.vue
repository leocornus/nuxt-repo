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
              v-model='inputNumber' 
              label="Give me a number:"
              :loading='loading'
            )
        v-card-text
          |<strong>{{ resultMessage }}</strong>

    // The card for prime number list.
    card-pns(:upToNumber="200")/
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

            loading: false
        };
    },

    computed: {

        resultMessage: function() {

            if(this.inputNumber === null) {
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

            return theNumber + " is a prime number";
        },

        /**
         * the message for none prime number.
         */
        nonePrimeNumberMessage: function(theNumber) {

            return theNumber + " is NOT a prime number";
        }
    },
}
</script>
