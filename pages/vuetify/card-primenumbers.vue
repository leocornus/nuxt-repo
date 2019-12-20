<template lang="pug">
// The card for prime number list.
v-flex( xs12 sm4 )
  v-toolbar( color="indigo" dark dense light )
    v-toolbar-title Prime Numbers List
  v-card
    v-card-text
      v-layout( row wrap text-center )
        v-flex(
          v-for="i in 200"
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
export default {
    name: "card-pns",

    props: [],

    data () {
        return {

            primeNumbers: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37,
                41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101,
                103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157,
                163, 167, 173, 179, 181, 191, 193, 197, 199]

        };
    },

    methods: {
        /**
         * return true if the given number is a prime number.
         */
        isPrime: function(n) {

            if(this.primeNumbers.includes(n)) {
                return true;
            } else {
                return false;
            }
        }
    },
}
</script>
