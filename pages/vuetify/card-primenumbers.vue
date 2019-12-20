<template lang="pug">
// The card for prime number list.
v-flex( xs12 sm8 )
  v-toolbar( color="indigo" dark dense light )
    v-toolbar-title Prime Numbers List
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
            :color='`${isPrime(i) ? "danger" : "success"}`'
          )
            v-card-text( class="px-0 py-1") {{ i }}
</template>

<script>

import PrimeNumber from '@/libs/PrimeNumber';

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
