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
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="290px"
          dense
        )
          template( v-slot:activator="{ on }" )
            v-text-field(
              v-model="date"
              label="Picker in menu"
              prepend-icon="mdi-calendar-range"
              readonly
              v-on="on"
            )
          v-date-picker( v-model="date" no-title scrollable)
            v-spacer
            v-btn(text color="primary" @click="menu = false") Cancel
            v-btn( text color="primary" @click="$refs.menu.save(date)") OK

      v-col(cols="2")
        v-select(
          label="Action:" 
          :items="['Buy','Sell']"
        )
      v-col(cols="2")
        v-text-field(label="Symbol:" )
      v-col(cols="2")
        v-text-field(label="Quantity:" )
      v-col(cols="2")
        v-text-field(label="Price / Share:" )
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
            name: 'Pug World'
        }
    }
}
</script>

<style lang="sass">
.red
  //color: red
</style>
