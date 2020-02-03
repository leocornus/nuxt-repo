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
        v-text-field(label="Action:" dense)
      v-col(cols="2")
        v-text-field(label="Symbol:" dense)
      v-col(cols="2")
        v-text-field(label="Quantity:" dense)
      v-col(cols="2")
        v-text-field(label="Price / Share:" dense)
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
    },

    asyncData() {

        return axios.get('https://www.cloudflare.com/cdn-cgi/trace')
            .then(function(res) {
                //console.log(res);
                let all = res.data.split("\n")[2];
                return {clientIp: all.split("=")[1]};
            });
    }
}
</script>

<style lang="sass">
.red
  //color: red
</style>
