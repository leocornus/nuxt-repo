<template lang="pug">
v-container( grid-list-xs )
  h1 List of Square Root

  v-layout( row wrap )
    v-flex( xs12 sm4 )
      v-toolbar( color="indigo" dark dense light )
        v-toolbar-title Square Root
      v-card
        v-card-title( problem-title )
          v-row
            v-text-field( 
              id='up-to-number'
              autocomplete="off"
              v-model='upToNumber' 
              label="Up to number:"
              :loading='loading'
              clearable
            )
        v-card-text
          strong(
            :class="msgColor" 
            v-html="resultMessage"
          )
</template>

<script>

export default {
    auth: false,

    layout: 'vuetify',

    name: 'list-of-square-root',

    data() {
        return {
            upToNumber: 20,
            msgColor: "primary--text",
        };
    },

    computed: {

        resultMessage: function() {

            if( (this.upToNumber === null)
            ) {

                this.msgColor = "primary--text";
                return "Waiting for the numbers...";
            } else {

                let root = [];
                for ( let n = 1; n <= this.upToNumber; n++) {
                    root.push('Square root of ' + n + ": " + Math.sqrt(n));
                }

                return root.join("<br/>");
            }
        }
    },
}
</script>
