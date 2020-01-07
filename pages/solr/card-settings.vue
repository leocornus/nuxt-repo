<template lang="pug">
v-card
  v-card-title( class="headline" )
    | Search settings

  v-card-text
    v-form( v-model="valid" )
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

  v-card-actions
    v-spacer
    v-btn( color="green darken-1" text
      @click="cancelSettings"
    ) cancel
    v-btn( color="green darken-1" text
      @click="saveSettings"
    ) save

</template>

<script>

export default {
    name: "dialog-settings",

    // set the properties for this component.
    props: {
        'cancelSettings': null,
        'saveSettings': null
    },

    data() {
      return {

        pageName: 'search',
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
        perPage: 15,
        // for the dynamic component.
        currentView: 'listing-details-table',

        resultSummary: "Click search to start..",

        // the JSON editor for displaying:
        // using the mounted to initialize the Editor.
        jeQueryParams: null,

        // selectedItem will show in the details modal.
        selectedItem: {},

        // luke in the structure of b-table.
        luke: {"items":[], "fields":[]},

        // solr schema.
        schema: {"items":[], "fields":[]}
      }
    }
}
</script>
