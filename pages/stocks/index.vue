<template lang="pug">
v-container( grid-list-xs )
  h2 Add Transaction:
  v-form
    v-row
      v-col(cols="2")
        v-menu(
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="when"
          transition="scale-transition"
          offset-y
          min-width="290px"
    )
          template( v-slot:activator="{ on }" )
            v-text-field(
              v-model="when"
              label="Pick the date"
              prepend-icon="mdi-calendar-range"
              readonly
              v-on="on"
            )
          // the model should be in ISO format.
          v-date-picker( v-model="when" no-title scrollable)
            v-spacer
            v-btn(text color="primary" @click="menu = false") Cancel
            v-btn( text color="primary" @click="$refs.menu.save(when)") OK

      v-col(cols="2")
        v-select(
          v-model="action"
          label="Action:" 
          :items="['Buy','Sell']"
        )
      v-col(cols="2")
        v-text-field(v-model="symbol" label="Symbol:" )
      v-col(cols="2")
        v-text-field(v-model="quantity" label="Quantity:" )
      v-col(cols="2")
        v-text-field(v-model="price" label="Price / Share:" )
      v-col(cols="2")
        v-btn() Add

  h2 Transaction History:
</template>

<script>

import axios from 'axios';

export default {

    auth: false,

    layout: 'vuetify',

    data() {
        return {

            menu: '',
            // conver to ISO format: YYYY-MM-DD,
            // v-date-picker is prefer ISO format.
            when: (new Date()).toISOString().split('T')[0],

            action: 'Buy',
            symbol: '',
            quantity: 0,
            price: 0
        }
    }
}
</script>

<style lang="sass">
.red
  //color: red
</style>
