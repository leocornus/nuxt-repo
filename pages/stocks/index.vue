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
        v-btn(@click="addTransaction") Add

  h2 Transaction History:
    v-layout( row wrap )
      v-row
        v-col( cols="12" md="3" )
          facet-buckets(
            :facets="facets"
            v-on:bucket-select="handleBucketSelect"
          )
        // all in one history
        v-col( cols="12" md="9" )
          v-data-table(
            :headers="headers"
            :items="transactions"
            :items-per-page="perPage"
          )
</template>

<script>

import axios from 'axios';

import stocks from '@/libs/stocks.js';
import FacetBucketsCard from '@/pages/solr/card-facet-buckets.vue';

export default {

    auth: false,

    layout: 'vuetify',

    components: {
    //    'card-settings': SettingsCard
    //    'listing-preview': ListingPreviewCard,
        'facet-buckets': FacetBucketsCard
    //    'query-filters': QueryFiltersCard
    },

    data() {
        return {

            menu: '',
            // conver to ISO format: YYYY-MM-DD,
            // v-date-picker is prefer ISO format.
            when: (new Date()).toISOString().split('T')[0],

            action: 'Buy',
            symbol: '',
            quantity: 0,
            price: 0,

            // items per page
            perPage: 10,

            /**
             * headers for the data table.
             * An object will be used for each column
             * the value for property value should match the property name of
             * the data object.
             */
            headers: [
                { text: "Date", value: "when" },
                { text: "Action", value: "action" },
                { text: "Symbol", value: "symbol" },
                { text: "Quantity", value: "quantity" },
                { text: "Price", value: "price" }
            ],

            /**
             * transactions in array format.
             */
            transactions: [
                {when:"2020-01-25",
                 action: "Buy",
                 symbol: "MRNA",
                 quantity: 14000,
                 price: 21.4
                }
            ],

            /**
             * facets.
             */
            facets: null,

            /**
             * filter query.
             */
            filterQuery: ""
        }
    },

    /**
     */
    created() {

        if(this.$auth.loggedIn) {
            stocks.getTransactions(this.$auth.user.email, 0, this.perPage, this);
        }
    },

    methods: {
        /**
         * add transaction.
         */
        addTransaction() {

            // get ready the payload.
            let payload = {
                when: this.when,
                action: this.action,
                symbol: this.symbol,
                quantity: this.quantity,
                price: this.price
            }

            if(this.$auth.loggedIn) {
            
                stocks.addTransaction(this.$auth.user.email,
                    this.when, this.action, this.symbol, this.price,
                    this.quantity, this);
            } else {
                this.transactions.push(payload);
            }
        },

        /**
         * handle bucket select.
         */
        handleBucketSelect(fieldName, fieldValue) {

            stocks.processBucketSelect(fieldName, fieldValue, this);
        }
    }
}
</script>

<style lang="sass">
.red
  //color: red
</style>
