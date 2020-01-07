<template lang="pug">
v-container( grid-list-xs )

  // the search row, with text field and buttons.
  v-card( class="d-flex flex-row" flat tile )
    // need use dense to align the size with buttons.
    v-text-field( 
      dense
      id='input-number'
      autocomplete="off"
      v-model='query' 
      label="Type your query here"
    )
    // search button
    v-btn( 
      color="warning" 
      dark icon
      class="pa-2"
    )
      v-icon mdi-magnify
      | search
    // setting button
    v-btn(
      color="success darken-1"
      dark icon
      class="pa-2"
      @click.stop="settingsDialog = true"
    )
      v-icon mdi-settings
      | settings

  // the settings dialog.
  v-dialog( v-model="settingsDialog" max-width="680px" persistent )
    v-card
      v-card-title( class="headline" )
        | Search settings

      v-card-text
        v-form( v-model="valid" )
          // the collection row.
          v-row
            v-col( cols="12" md="10" )
              v-text-field( v-model="collectionUrl" 
                label="Collection URL:"
                dense
              )
            v-col( cols="12" md="2" )
              v-checkbox( v-model="debugQuery"
                label="Debug"
                dense
              )
          // basic fields.
          v-row
            v-col( cols="12" md="2" )
              v-text-field( v-model="idField"
                label="ID field:"
                dense
              )
            v-col( cols="12" md="3" )
              v-text-field( v-model="perPage"
                label="Items Per Page:"
                dense
              )
            v-col( cols="12" md="7" )
              v-text-field( v-model="sort"
                label="Sort:"
                dense
              )
          // filter query
          v-row
            v-col( cols="12" md="12" )
              v-text-field( v-model="filterQuery" 
                label="Filter Query:"
                dense
              )
          // field list 
          v-row
            v-col( cols="12" md="12" )
              v-text-field( v-model="fieldList" 
                label="Field List:"
                dense
              )
          // facets
          v-row
            v-col( cols="12" md="12" )
              v-text-field( v-model="facets" 
                label="Facets:"
                dense
              )
          // queryFields qf
          // boostFunction bf
          // boostQuery bq
    
      v-card-actions
        v-spacer
        v-btn( color="green darken-1" text
          @click="settingsCancel"
        ) cancel
        v-btn( color="green darken-1" text
          @click="SettingsSave"
        ) save

  // the carousel dialog.

  // search result list with facet filters on the left side.
  v-layout( row wrap )
     // the search result list.
</template>

<script>
// import other vue component
//import SettingsCard from '@/pages/solr/card-settings.vue';

export default {

    components: {
    //    'card-settings': SettingsCard
    },

    layout: 'vuetify',

    name: 'solrsearch',

    data () {

        return {

            query: '*:*',
            // the switch to show or hide the settings dialog.
            settingsDialog: false,

            valid: false,

            idField: 'id',
            collectionUrl: 'http://search.example.com',
            // available collections, we will load it at the created hook.
            collections: [],
            collectionLabel: "Collection: ",

            query: '*:*',
            // default facet field is empty.
            facetFields: "",

            // set the default filter query to empty.
            filterQuery: "",

            // set the default sort
            sort: "",

            // set default field list to empty, which will return all fields.
            fieldList: "",
            // the boostQuery field.
            boostQuery: "",
            // the boost function field.
            boostFunction: "",
            // query fields
            queryFields: "",

            totalHits: 0,
            facets: null,
            stats: null,
            results: null,

            // debugQuery, default is false.
            // it is easier to treat it as String
            debugQuery: "false",
            // debug explain if debug query is on
            debugExplain: null,
            explainItem: null,

            // pagination properties.
            currentPage: 1,
            perPage: 15
        };
    },

    computed: {

    },

    methods: {

        /**
         */
        settingsCancel: function() {

            this.settingsDialog = false;
        },

        /**
         */
        settingsSave: function() {

            this.settingsDialog = false;
        }
    }
}
</script>
