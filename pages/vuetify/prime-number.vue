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
          |{{ resultMessage }}

    // The card for prime number list.
    card-pns/
</template>

<script>
import CardPrimeNumbers from '@/pages/vuetify/card-primenumbers.vue'

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
                this.checkPrimeNumber(this.inputNumber);
                return "Checking ...";
            }
        }
    },

    methods: {
        checkPrimeNumber: function(theNumber) {

            console.log(theNumber);
        }
    },
}
</script>
