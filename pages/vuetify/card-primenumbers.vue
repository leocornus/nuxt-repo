<template lang="pug">
// The card for prime number list.
v-flex( xs12 sm8 )
  v-toolbar( color="indigo" dark dense light )
    v-toolbar-title Prime Numbers up to {{ upToNumber }}
  v-card
    v-card-text
      v-layout( row wrap text-center )
        v-flex(
          v-for="i in upToNumber"
          :key="`n${i}`"
          xs1
        )
          v-card(
            dark
            :color='`${isPrime(i) ? "danger" : "warning"}`'
          )
            // we could define a variable for a list of classname in
            // an array
            - var textClasses = ["px-0", "py-1"]
            v-card-text( class=textClasses ) {{ i }}
</template>

<script>

import PrimeNumber from '@/libs/math/PrimeNumber';

export default {
    name: "card-pns",

    props: {
        'upToNumber': {
            type: Number,
            default: 100
        }
    },

    data () {
        return {

        };
    },

    methods: {
        /**
         * return true if the given number is a prime number.
         */
        isPrime: function(n) {

            return PrimeNumber.isPrimeNumber(n);
        }
    },
}
</script>
