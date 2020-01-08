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
      @click="simpleSearch"
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
  v-dialog( v-model="settingsDialog" max-width="780px" persistent )
    v-card
      v-toolbar( flat color="primary" dark )
        v-toolbar-title Search settings

      v-tabs( vertical )
        v-tab
          v-icon( left ) mdi-settings
        v-tab
          v-icon( left ) mdi-account

        v-tab-item
          v-card( flat )
            v-card-text
              v-form( v-model="valid" )
                // the collection row.
                v-row
                  v-col( cols="12" md="10" )
                    v-text-field( v-model="collectionUrl" 
                      label="Solr Collection URL:"
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
              v-btn( color="green darken-1" text
                @click="settingsSave"
              ) save profile
              v-spacer
              v-btn( color="green darken-1" text
                @click="settingsCancel"
              ) cancel
              v-btn( color="green darken-1" text
                @click="settingsCancel"
              ) Ok

        v-tab-item
          v-card( flat )
            v-card-text
              v-form
                v-row
                  v-col( cols="12" md="12" )
                    v-text-field( v-model="profileRepo" 
                      label="Profile Repository URL:"
                      dense
                    )
                v-row
                  v-col( cols="12" md="9" )
                    v-text-field( v-model="profileName" 
                      label="Pick Profile:"
                      dense
                    )
                  v-col( cols="12" md="3" )
                    v-btn( @click="loadProfile" ) Load

  // the carousel dialog.

  // search result list with facet filters on the left side.
  v-layout( row wrap )
    h3 {{resultSummary}}
    // the search result list.
    listing-preview(
      v-for="(doc, index) in results"
      :doc="doc" :key="doc.id"
      :index="index" :idFieldName="idField"
    )
</template>

<script>

import axios from 'axios'

// import other vue component
//import SettingsCard from '@/pages/solr/card-settings.vue';
import ListingPreviewCard from '@/pages/solr/card-listing-preview.vue';

export default {

    components: {
    //    'card-settings': SettingsCard
        'listing-preview': ListingPreviewCard
    },

    layout: 'vuetify',

    name: 'solrsearch',

    data () {

        return {

            // the switch to show or hide the settings dialog.
            settingsDialog: false,

            query: '*:*',

            valid: false,

            idField: 'id',
            collectionUrl: 'http://search.example.com',
            // available collections, we will load it at the created hook.
            collections: [],
            collectionLabel: "Collection: ",

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
            resultSummary: "",

            // debugQuery, default is false.
            // it is easier to treat it as String
            debugQuery: "false",
            // debug explain if debug query is on
            debugExplain: null,
            explainItem: null,

            // pagination properties.
            currentPage: 1,
            perPage: 15,

            // the URL to profile repository
            profileRepo: '/nuxt-repo/',
            profileName: 'local.json'
        };
    },

    computed: {

    },

    methods: {

        /**
         * simple search function to demonstrate Solr search function.
         */
        simpleSearch() {

            var self = this;
            //console.log('I am in...');
            //solr.config.baseUrl = self.restBaseUrl;
            //solr.ping();

            self.resultSummary = "Searching ...";
            // set the results to null for hiding the whole section.
            self.results = null;
            self.facets = null;
            self.stats = null;

            // check the query, 
            if(!self.query) {
                // reset the query to search everything!
                self.query="*:*";
            }

            // this will show how to use query parameters in a JSON request.
            var postParams = self.buildQuery();
            // set to query params modal.
            if(self.jeQueryParams) {

                // swith back and force to refresh the view.
                self.jeQueryParams.setMode("view");
                self.jeQueryParams.set(postParams);
                self.jeQueryParams.expandAll();
                //self.jeQueryParams.setTextSelection(0,1);
                self.jeQueryParams.setMode("code");
            } 

            var endPoint = self.collectionUrl + "select";
            // track the post parameters.
            // the Object assign will merge / copy source object to target
            // object.
            //var trackPayload = Object.assign({"end_point" : endPoint},
            //                                 postParams);
            //solr.track(trackPayload);
            // the query url should be some thing like this: 
            // - 'https://one.sites.leocorn.com/rest/searchApi/search',
            // it is seems easier to use query parameters in a JSON request.
            axios.post(endPoint, postParams)
            .then(function(response) {

                //console.log(response.data);
                self.totalHits = response.data.response.numFound;

                // TODO: add explain for each doc if debug query is on.
                self.results = response.data.response.docs;
                if( response.data.hasOwnProperty('debug') ) {
                    self.debugExplain = response.data.debug;
                    //self.fieldList = self.fieldList + ',ex';
                    //self.results = response.data.response.docs.map( doc => {
                    //    // add the explain or scoring
                    //    doc['ex'] = response.data.debug.explain[doc[self.idField]];
                    //    //console.log(doc['ex']);
                    //    return doc;
                    //});
                }
                //console.log(self.results);

                // check if we have facets in response.
                // Object hasOwnProperty is like hasKey but more complex.
                if(response.data.hasOwnProperty('facet_counts')) {
                //self.facets = response.data.facets;
                    //self.facets = self.getReadyFacets(response.data.facet_counts.facet_fields);
                }
                //self.stats = self.facets[self.facets.length - 1].statistics;
                //console.log("statistics: " + self.stats);
                //self.resultSummary = "Found " + self.totalHits + " docs in total!"
                var startRow = postParams.params.start;
                self.resultSummary =
                    "Showing " + (startRow + 1) + " - " +
                    Math.min(startRow + self.perPage, self.totalHits) + " of " +
                    self.totalHits + " Items";
                if(self.totalHits > 0) {
                    console.log('total hits: ' + self.totalHits);
                    //console.log(JSON.stringify(self.facets));
                    //console.log(JSON.stringify(response.data.documents[0]));
                    //console.log(response.data.documents[0].fields['title']);
                }
            })
            .catch(function(error) {
                self.resultSummary = "Query Error!";
                console.log(error);
            });
        },

        /**
         * create a facility function to get ready post query.
         */
        buildQuery() {

            let thisVm = this;

            // calculate the start row.
            var startRow = (thisVm.currentPage - 1) * thisVm.perPage;

            // the parameters for query.
            // we will use Object assign to merge them all together.
            var params = Object.assign({
              rows: thisVm.perPage,
              defType: "edismax",
              start: startRow,
              sort: thisVm.sort,
              debugQuery: thisVm.debugQuery
            }, thisVm.getFacetFields(), thisVm.getFieldList(),
               thisVm.getFilterQuery(), thisVm.getBoostQuery(),
               thisVm.getBoostFunction(), thisVm.getQueryFields());

            // this will show how to use query parameters in a JSON request.
            var postParams = {
                query: thisVm.query,
                // we could mix parameters and JSON request.
                params: params
            }

            return postParams;
        },

        /**
         * this will return the facet fields query parameters.
         */
        getFacetFields() {

            if(this.facetFields === "") {
                // return an empty object.
                return {};
            } else {
                return {
                  facet: "on",
                  // set to negative number to return unlimit facets
                  "facet.limit": -1,
                  // using array for multiple values
                  // in association with multiple values in HTTP parameters.
                  // ?facet_field=project_id&facet_field=customer_id
                  //"facet.field":["project_id", "customer_id"]
                  // here is for single value
                  //"facet.field":"customer_id"
                  "facet.field": this.facetFields.split(",")
                };
            }
        },

        /**
         * get field list.
         * the return value will be the object like this:
         * - fl: ["id","project_id"],
         */
        getFieldList() {

            if(this.fieldList === "") {
                // not fieldList specified, return an enpty object.
                return {};
            } else {
                // always add the id field to the field list..
                let fields = this.fieldList.split(",");
                if(!fields.includes(this.idField)) {
                    fields.push(this.idField);
                }
                return {
                  // field list, control what fields to return in response.
                  fl: fields
                };
            }
        },

        /**
         * return the boost function.
         */
        getBoostFunction() {

            if(this.boostFunction === "") {
                return {};
            } else {
                return {
                    "bf": this.boostFunction
                }
            }
        },

        /**
         * return the boost query.
         */
        getBoostQuery() {

            if(this.boostQuery === "") {
                return {};
            } else {
                return {
                    "bq": this.boostQuery
                }
            }
        },

        /**
         * return the boost query.
         */
        getQueryFields() {

            if(this.queryFields === "") {
                return {};
            } else {
                return {
                    "qf": this.queryFields
                }
            }
        },

        /**
         * prepare the filter query for search.
         */
        getFilterQuery() {

            if(this.filterQuery === "") {
                return {};
            } else {
                return {
                  // filter query list.
                  //fq: ["c4c_type:project"],
                  fq: this.filterQuery.split(",")
                }
            }
        },

        /**
         * process the facet_fields response to different format.
         *
         *  [
         *    { label:"field name",
         *      buckets: [
         *        {value: "field value one",
         *         count: 120},
         *        {value: "field value two",
         *         count: 20},
         *      ]
         *    }
         *  ]
         */
        getReadyFacets(facetFields) {

            // we will return the facets as array.
            var retFacets = [];
            // key is the field name.
            Object.keys(facetFields).forEach(function(fieldName) {

                var buckets = facetFields[fieldName];
                // get ready the buckets for each field.
                var facetBuckets = [];
                for(var i=0; i < buckets.length; i = i+2) {

                    if (buckets[i + 1] < 1) {

                       continue;
                    }

                    facetBuckets.push(
                      {
                        value: buckets[i],
                        count: buckets[i + 1]
                      }
                    );
                }

                // get ready the facet object.
                var facetItem = {
                  label: fieldName,
                  name: fieldName,
                  buckets: facetBuckets
                };

                retFacets.push(facetItem);
            });

            return retFacets;
        },

        /**
         */
        settingsCancel: function() {

            this.settingsDialog = false;
        },

        /**
         */
        settingsSave: function() {

            let self = this;

            console.log(self._data);
            let keys = Object.keys(self._data)
                .filter( key =>  typeof(self._data[key]) !== 'function');
            console.log(keys);

            let profile = keys.reduce( function(obj, key) {
                return {
                    ...obj,
                    [key]: self._data[key]
                };
            }, {});

            console.log(profile);
            console.log(JSON.stringify(profile));

            this.settingsDialog = false;
        },

        /**
         * function to load profile.
         */
        loadProfile: function() {

            let self = this;

            const theProfile = self.profileRepo + self.profileName;
            axios.get(theProfile).
                then(function(response) {
                    console.log(response.data);
                    //console.log(JSON.parse(response.data));
                    Object.keys(response.data).forEach( function(key) {

                        self[key] = response.data[key];
                    });
                });
        }
    }
}
</script>
