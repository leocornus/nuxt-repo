<template lang="pug">
v-container( grid-list-xs )
  v-row
    v-text-field( 
      v-model='inputNumber' 
      label="Give me a number:"
      loading
    )
  v-layout
    v-flex( xs12 sm4 )
      v-toolbar( color="indigo" dark dense light wihte--text )
        v-toolbar-title Prime Number
      v-card
        v-card-title( primary-title ) get ready

</template>

<script>
export default {
    layout: 'vuetify',

    name: 'prime-number',

    data () {
        return {
            inputNumber: '',
        };
    },

    methods: {
    },
}
</script>
