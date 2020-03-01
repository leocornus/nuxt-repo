<template lang="pug">
v-container( grid-list-xs )
  h2 Add Transaction:
  v-form(v-model="valid")
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
          v-date-picker(
            v-model="when"
            scrollable
            color="green lighten-1"
            @click:date="$refs.menu.save(when)"
          )

      v-col(cols="2")
        v-select(
          v-model="action"
          label="Action:" 
          :items="['Buy','Sell']"
          :rules="[v => !!v || 'Action is required']"
          required
        )
      v-col(cols="2")
        v-text-field(
          v-model="symbol"
          label="Symbol:"
          :rules="[v => !!v || 'Symbol is required']"
          required
        )
      v-col(cols="2")
        v-text-field(
          v-model="quantity"
          label="Quantity:"
          :rules="quantityRules"
          required
        )
      v-col(cols="2")
        v-text-field(
          v-model="price"
          label="Price / Share:"
          :rules="priceRules"
          required
        )
      v-col(cols="2")
        v-btn(
          :disabled="!valid"
          color="success"
          @click="addTransaction"
        ) Add
        v-btn(
          color="primary"
        ) Settings

  h2 Transaction History:
  v-layout( row wrap )
    v-row
      v-col( cols="12" md="12")
        time-window(
          v-on:time-window-type="handleTimeWindowType"
          v-on:relative-select="handleRelativeDates"
        )
      v-col( cols="12" md="3" )
        query-filters(
          :filters="filters"
          v-on:filter-select="removeFilter"
        )
        // the statistics card.
        stats(
          :stats="summary"
        )
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
          dense
          hide-default-footer
        )
          template(v-slot:item.actions="{ item }")
            //v-icon(
            //  small
            //  class="mr-2"
            //  @click="editItem(item)"
            //) mdi-file-edit
            v-icon(
              small
              @click="deleteItem(item)"
            ) mdi-delete
          template(v-slot:item.value="{ item }")
            | {{ transactionValue(item) }}
</template>

<script>

import axios from 'axios';

import stocks from '@/libs/stocks.js';
import FacetBucketsCard from '@/pages/solr/card-facet-buckets.vue';
import QueryFiltersCard from '@/pages/solr/card-query-filters.vue';
import StatsCard from '@/pages/solr/card-stats.vue';
import TimeWindowCard from '@/pages/solr/card-time-window.vue';

export default {

    auth: false,

    layout: 'vuetify',

    components: {
    //    'card-settings': SettingsCard
    //    'listing-preview': ListingPreviewCard,
        'facet-buckets': FacetBucketsCard,
        'query-filters': QueryFiltersCard,
        'time-window': TimeWindowCard,
        'stats': StatsCard
    },

    data() {
        return {

            // validate the form.
            valid: true,

            menu: '',
            // conver to ISO format: YYYY-MM-DD,
            // v-date-picker is prefer ISO format.
            when: (new Date()).toISOString().split('T')[0],

            action: 'Buy',
            symbol: '',
            quantity: 0,
            quantityRules: [
              v => !!v || 'Quantity is required',
              v => /^\d+$/.test(v) || 'Quantity must be integer',
            ],
            price: 0,
            priceRules: [
              v => !!v || 'Price is required',
              // need the starts and ends to make procise match
              v => /^[0-9]*\.[0-9]+$/.test(v) || 'Price must be float',
            ],

            // items per page
            perPage: 100,

            // sum of the transactions' values
            summary: null,

            // formater
            format: new Intl.NumberFormat('en-US', 
                { style: 'currency', currency: 'USD' }),

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
                { text: "Price", value: "price" },
                { text: 'Value', value: 'value', sortable: false },
                { text: 'Actions', value: 'actions', sortable: false },
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
            filterQuery: "",

            /**
             * date range array, [from, to]
             * defalt is all days
             */
            dateRange: ["*", "*"]
        }
    },

    /**
     */
    created() {

        if(this.$auth.loggedIn) {
            stocks.getTransactions(this, 0);
        }
    },

    computed: {

        /**
         * return the filter querys.
         */
        filters: function() {

            if(this.filterQuery === "") {
                return null;
            } else {
                return this.filterQuery.split("||");
            }
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
                this.resetFields();
            }
        },

        /**
         * handle bucket select.
         */
        handleBucketSelect(fieldName, fieldValue) {

            stocks.processBucketSelect(fieldName, fieldValue, this);
        },

        /**
         * handle remove filter.
         */
        removeFilter(filter) {

            // remove the filter from the filterQuery.
            var fqs = this.filterQuery.split("||").filter(fq => fq != filter);
            // join will use , as the default separator
            // reset the filterQuery.
            this.filterQuery = fqs.join("||");

            // reload all transactions
            stocks.getTransactions(this, 0);
        },

        /**
         * utility method to reset all form fields.
         */
        resetFields() {

            // set to today.
            this.when = (new Date()).toISOString().split('T')[0];
            this.action = "";
            this.symbol = "";
            this.quantity = 0;
            this.price = 0;
        },

        /**
         * edit item
         */
        editItem(item) {
            console.log("edit", item);
        },

        /**
         * delete item
         */
        deleteItem(item) {

            //console.log("delete", item);
            stocks.removeTransaction(item, this);
        },

        /**
         * calcuate transaction value
         */
        transactionValue(item) {

            // format the number
            return this.format.format(stocks.transactionValue(item));
        },

        /**
         * handle relative days selection event for time window
         */
        handleRelativeDates(dates) {

            console.log(dates);
        },

        /**
         * handle time window type change.
         */
        handleTimeWindowType(type) {

            console.log(type);
        }
    }
}
</script>

<style lang="sass">
.red
  //color: red
</style>
