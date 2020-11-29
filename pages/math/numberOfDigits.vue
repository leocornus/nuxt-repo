<template lang="pug">
v-container( grid-list-xs )
  h1 Number of digits problem

  v-layout( row wrap )
    v-flex( xs12 sm4 )
      v-toolbar( color="indigo" dark dense light )
        v-toolbar-title Number options
      v-card
        v-card-title( problem-title )
          v-row
            v-text-field( 
              id='from-number'
              autocomplete="off"
              v-model='fromNumber' 
              label="From number:"
              clearable
            )
            v-text-field( 
              id='to-number'
              autocomplete="off"
              v-model='toNumber' 
              label="To number:"
              clearable
            )
            v-text-field( 
              id='digit-number'
              autocomplete="off"
              v-model='digitNumber'
              label="Looking for digit:"
              clearable
            )
        v-card-text
          strong( :class="msgColor" )
            |{{ resultMessage }}
</template>

<script>

import NumberOfDigits from '@/libs/math/NumberOfDigits';

export default {
    auth: false,

    layout: 'vuetify',

    name: 'number-of-digit',

    data() {
        return {
            fromNumber: null,
            toNumber: null,
            digitNumber: null,

            msgColor: "primary--text",
        };
    },

    computed: {

        resultMessage: function() {

            if( (this.fromNumber === null || this.fromNumber === "") ||
                (this.toNumber === null || this.toNumber === "") ||
                (this.digitNumber === null || this.digitNumber === "")
            ) {

                this.msgColor = "primary--text";
                return "Waiting for the numbers...";
            } else {

                let total = NumberOfDigits.calcNumberOfDigits( this.fromNumber, this.toNumber,
                    this.digitNumber);
                return "Total Occurrences: " + total;
            }
        }
    },
}
</script>
