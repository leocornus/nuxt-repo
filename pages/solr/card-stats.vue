<template lang="pug">
// the card to show all query filters.
v-card( v-if="stats" class="mb-3")
  // using v-data-table
  v-data-table(
    :headers="headers"
    :items="statsArray"
    hide-default-header
    hide-default-footer
  )
    template( v-slot:item.value="{ item }" )
      v-chip( :color="getValueColor(item.value)" dard
      ) {{ usCurrency.format(item.value) }}
  // using v-list.
  //v-list.blue.lighten-1
  //  v-subheader Stats
  //  v-list-item-group
  //    v-list-item(
  //      v-for="(key, i) in Object.keys(stats)"
  //      :key="'stats-' + i"
  //    )
  //      v-list-item-content {{key + "=" + stats[key]}}
</template>

<script>

export default {

    name: "stats",

    props: ["stats"],

    data() {
        return {
            headers: [
                { text: "name", value: "name" },
                { text: "value", value: "value" },
            ],

            // formater
            usCurrency: new Intl.NumberFormat('en-US', 
                { style: 'currency', currency: 'USD' })
        }
    },

    // using computed for dynamic data.
    computed: {

        statsArray: function() {

            return Object.keys(this.stats).map( key => {
                return {
                    name: key,
                    value: this.stats[key]
                }
            });
        }
    },
    
    methods: {

        getValueColor: function(theValue) {

            return theValue < 0 ? 'red' : 'success';
        }
    }
}
</script>
