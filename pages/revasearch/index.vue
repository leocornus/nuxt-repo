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
      @click="handleSearchButton"
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

      // the vertical tabs.
      //v-tabs( vertical )
      v-tabs
        v-tab
          v-icon( left ) mdi-settings
          | Settings
        v-tab
          v-icon( left ) mdi-account
          | Profiles

        // the settings tab.
        v-tab-item
          v-card( flat )
            v-card-text
              v-form( v-model="valid" )
                // the collection row.
                v-row
                  v-col( cols="12" md="10" )
                    v-autocomplete(
                      v-model="profileId"
                      label="Pick Profile:"
                      :items="allProfiles"
                      item-text="name"
                      item-value="id"
                      dense
                      @change="profileChange"
                    )
                  v-col( cols="12" md="2" )
                    v-checkbox( v-model="debugQuery"
                      label="Debug"
                      dense
                    )
                // basic fields.
                v-row
                  v-col( cols="12" md="3" )
                    v-text-field( v-model="rows"
                      label="Items Per Page:"
                      dense
                    )
                  v-col( cols="12" md="9" )
                    v-text-field( v-model="sort"
                      label="Sort:"
                      dense
                    )

                // pick cities. 
                v-row
                  v-col( cols="12" md="12" )
                    v-autocomplete( v-model="cities" 
                      label="Cities:"
                      :items="allCities"
                      multiple
                      @input="cityInput = null"
                      :search-input.sync="cityInput"
                      dense
                      chips
                      small-chips
                    )
                      template( v-slot:selection="data" )
                        v-chip(
                          close
                          @click:close="removeCitySelection(data.item)"
                        )
                          | {{ data.item }}
                // queryFields qf
                // boostFunction bf
                // boostQuery bq
                // residence type, city, neighbourhood

                // price range 
                v-row
                  v-col( cols="12" md="3" )
                    v-checkbox( v-model="priceRangeOn"
                      label="Price Range"
                      dense
                    ).mt-0.pt-0
                  v-col( cols="12" md="9" )
                    v-range-slider( v-model="priceRange" 
                      :disabled="!priceRangeOn"
                      max="5000000"
                      min="10000"
                      step="10000"
                      hide-details
                      dense
                    )
                      template( v-slot:prepend )
                        span( v-text="priceRange[0]" )
                      template( v-slot:append )
                        span( v-text="priceRange[1]" )

                // facet fields.
                v-row
                  v-col( cols="12" md="12" )
                    v-autocomplete( v-model="facetFields" 
                      label="Facets:"
                      :items="allFields"
                      multiple
                      @change="facetSelectionChange"
                      @input="facetInput = null"
                      :search-input.sync="facetInput"
                      dense
                      chips
                      small-chips
                    )
                      template( v-slot:selection="data" )
                        v-chip(
                          close
                          @click:close="removeFacetSelection(data.item)"
                        )
                          | {{ data.item }}
                // queryFields qf
                // boostFunction bf
                // boostQuery bq

            //v-card-actions
              v-btn( color="green darken-1" text
                @click="settingsSave"
              ) save profile
              v-spacer

        // the account / profile tab.
        v-tab-item
          v-card( flat )
            v-card-text
              // form to load profile.
              v-form
                v-row(v-if="!$auth.loggedIn")
                  v-col( cols="12" md="9" )
                    v-text-field( v-model="profileRepo" 
                      label="Profile Repository:"
                      dense
                    )
                  v-col( cols="12" md="3" )
                    v-btn( @click="loadProfile" ) Load
                v-row
                  v-col( cols="12" md="9" )
                    v-text-field(
                      v-model="profileName" 
                      label="Edit Profile Name:"
                      dense
                    )
                    v-textarea(
                      v-if="$auth.loggedIn"
                      v-model="profileDesc" 
                      label="Profile Description:"
                    )
                  v-col( v-if="$auth.loggedIn"
                    cols="12" md="3"
                  )
                    v-btn( @click="saveProfile" ) Save Profile

      v-card-actions
        v-spacer
        v-btn( color="green darken-1" text
          @click="settingsCancel"
        ) cancel
        v-btn( color="green darken-1" text
          @click="settingsOk"
        ) Ok

  // the carousel dialog.

  // search result list with facet filters on the left side.
  v-layout( row wrap )
    // the search result list.
    v-row
      v-col( cols="12" md="3" )
        h3 Facets
        // the filters card.
        query-filters( :filters="filters"
          v-on:filter-select="removeFilter"
        )
        facet-buckets( :facets="facets" 
          v-on:bucket-select="handleBucketSelect"
        )

      v-col( cols="12" md="9" )
        h3 {{resultSummary}}
        v-pagination( v-model="currentPage" :length="totalPages" total-visible="10"
          v-if="results"
          v-on:input="simpleSearch"
        )
        listing-preview(
          v-for="(doc, index) in results"
          :doc="doc" :key="doc.id"
          :index="index" :idFieldName="idField"
        )
        v-pagination( v-model="currentPage" :length="totalPages" total-visible="10"
          v-if="results"
          v-on:input="simpleSearch"
        )
</template>

<script>

import axios from 'axios';

import config from '@/libs/config';
// import other vue component
//import SettingsCard from '@/pages/solr/card-settings.vue';
import ListingPreviewCard from '@/pages/solr/card-listing-preview.vue';
import FacetBucketsCard from '@/pages/solr/card-facet-buckets.vue';
import QueryFiltersCard from '@/pages/solr/card-query-filters.vue';

export default {

    auth: false,

    components: {
    //    'card-settings': SettingsCard
        'listing-preview': ListingPreviewCard,
        'facet-buckets': FacetBucketsCard,
        'query-filters': QueryFiltersCard
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
            collectionUrl: config.searchUrl,
            // available collections, we will load it at the created hook.
            collections: [],
            collectionLabel: "Collection: ",

            // all available fields, get from solr schema.
            allFields: ["abc","cde"],
            // default facet field is empty.
            facetFields: [],
            // facet input.
            facetInput: null,

            // autocomplete for citeis.
            allCities: ["Toronto", "Markham"],
            cities: ["Toronto", "Markham"],
            cityInput: null,

            // autocomplete for citeis.
            allNeighbours: ["Toronto", "Markham"],
            neighbours: ["Toronto", "Markham"],
            neighbourInput: null,

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

            // price range for the v-range-slider
            // default is not use price range.
            priceRangeOn: false,
            priceRange: [500000, 1000000],

            totalHits: 0,
            totalPages: 0,
            facets: null,
            stats: null,
            results: null,
            resultSummary: "",

            // debugQuery, default is false.
            // it is easier to treat it as String
            debugQuery: false,
            // debug explain if debug query is on
            debugExplain: null,
            explainItem: null,

            // pagination properties.
            currentPage: 1,
            // items per page.
            rows: 15,

            // the URL to profile repository
            profileRepo: '/',
            // profile description
            profileDesc: '',
            // bind to the autocomplete value.
            profileId: '',
            // the profile autocomplete text and
            // the name for profile editing
            profileName: 'local.json',
            // array of objects with profile {id, name}
            allProfiles: []
        };
    },

    /**
     * initialization after created.
     */
    created() {

        let self = this;

        // load all profiles.
        if(self.$auth.loggedIn) {

            self.loadAllProfiles();
            // load all cities.
            config.getAllCities(cities => {
                self.allCities = cities;
            });

            self.allFields = config.getAllFields();
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

                // calculate the total page numbers.
                self.totalPages = Math.ceil(self.totalHits / self.rows)

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
                    self.facets = self.getReadyFacets(response.data.facet_counts.facet_fields);
                }
                //self.stats = self.facets[self.facets.length - 1].statistics;
                //console.log("statistics: " + self.stats);
                //self.resultSummary = "Found " + self.totalHits + " docs in total!"
                var startRow = postParams.params.start;
                self.resultSummary =
                    "Showing " + (startRow + 1) + " - " +
                    Math.min(startRow + self.rows, self.totalHits) + " of " +
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
            var startRow = (thisVm.currentPage - 1) * thisVm.rows;

            // the parameters for query.
            // we will use Object assign to merge them all together.
            var params = Object.assign({
              rows: thisVm.rows,
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

            if(this.facetFields.length < 1) {
                // return an empty object.
                return {};
            } else {
                return {
                  facet: "on",
                  // set to negative number to return unlimit facets
                  "facet.limit": -1,
                  // TODO: set the sort option for facets.
                  // using array for multiple values
                  // in association with multiple values in HTTP parameters.
                  // ?facet_field=project_id&facet_field=customer_id
                  //"facet.field":["project_id", "customer_id"]
                  // here is for single value
                  //"facet.field":"customer_id"
                  "facet.field": this.facetFields
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

            let query = [];

            // remove the price range and cities first.
            if(this.filterQuery != "") {
                query = this.filterQuery.split("||")
                if(query.length > 0) {
                    query = query.filter(item => !(item.startsWith("listvalue_i") || 
                        item.startsWith("city") ));
                }
                this.filterQuery = query.join("||");
            }

            // add the priceRange as filter query.
            if(this.priceRangeOn) {

                let range = "listvalue_i:[" + this.priceRange[0] +
                    " TO " + this.priceRange[1] + "]";
                query.push(range);

                // prepare the price range query.
                this.filterQuery = query.join("||");
            }

            // add the cities filter.
            if(this.cities.length > 0) {

                query.push("city:(\"" + this.cities.join("\",\"") + "\")");
                this.filterQuery = query.join("||");
            }

            if(this.filterQuery === "") {
                return {};
            } else {
                return {
                  // filter query list.
                  //fq: ["category:project"],
                  fq: this.filterQuery.split("||")
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

        handleSearchButton() {

            // reset current page.
            this.currentPage = 1;
            // load items to refresh the list.
            this.simpleSearch();
        },

        /**
         * handle the bucket select event.
         */
        handleBucketSelect(fieldName, bucketValue) {

            var fq = fieldName + ':"' + bucketValue + '"';
            this.filterQuery = this.filterQuery === "" ? 
                fq : this.filterQuery + "||" + fq;

            // reset current page.
            this.currentPage = 1;
            // load items to refresh the list.
            this.simpleSearch();
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

            // remove the fields from settings modal.
            let fieldName = filter.split(":")[0];
            switch(fieldName) {
            //    case 'city':
            //        this.city = "";
            //        break;
            //    case 'neighbourhoodname':
            //        this.neighbourhood = "";
            //        break;
            //    case 'residencetype':
            //        this.residenceType = "";
            //        break;
                case 'listvalue_i':
                    this.priceRangeOn = false;
                    break;
                default:
                    // Do nothing here, just skip!
                    break;
            }

            // reset current page.
            this.currentPage = 1;
            // load the resule set.
            this.simpleSearch();

        },

        /**
         * handle remove facet selection on settings dialog.
         */
        removeCitySelection: function(city) {

            //console.log("selected facet:", facet);
            const index = this.cities.indexOf(city);
            // replace one element at index position.
            if( index >=0 ) this.cities.splice(index, 1);
        },

        /**
         * handle remove facet selection on settings dialog.
         */
        removeFacetSelection: function(facet) {

            console.log("selected facet:", facet);
            const index = this.facetFields.indexOf(facet);
            // replace one element at index position.
            if( index >=0 ) this.facetFields.splice(index, 1);
        },

        /**
         * handle facet selection change from the autocomplete component.
         */
        facetSelectionChange: function() {

            //console.log(this.facetFields);
        },

        /**
         * method to handle cancel button on Settings dialog.
         */
        settingsCancel: function() {

            this.settingsDialog = false;
        },

        /**
         * method to handle ok button on settings dialog.
         */
        settingsOk: function() {

            this.settingsDialog = false;
            this.simpleSearch();
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

            //this.settingsDialog = false;
        },

        /**
         * function to load profile.
         */
        loadProfile: function() {

            let self = this;

            const theProfile = self.profileRepo + self.profileName;
            axios.get(theProfile).
                then(function(response) {
                    //console.log(response.data);
                    //console.log(JSON.parse(response.data));
                    Object.keys(response.data).forEach( function(key) {

                        // handle files separately:
                        if( key === "files" ) {
                            response.data[key].forEach( function(file) {
                                axios.get( self.profileRepo + file.fileName ).
                                    then( function( fileRes ) {

                                        //console.log( fileRes.data.split("\n") );
                                        self[file.fieldName] = fileRes.data.split("\n");
                                    });
                            });
                        } else {

                            // simple copy all other fields.
                            self[key] = response.data[key];
                        }
                    });

                    // TODO: load all available fields.

                    // TODO: load all cities.
                });
        },

        /**
         * function to save profile.
         */
        saveProfile: function() {

            // preparing the payload.
            let queryParams = this.buildQuery();
            console.log(JSON.stringify(queryParams));

            // account
            let account = this.$auth.user.email;
            // profile name.
            //this.profileName
            // description, comments.
            //this.description
            // update profile.
            config.updateProfile(account, this.profileName, this.profileDesc,
                this.collectionUrl, queryParams);

            // reload all profiles.
            // only logged in users can save profile!
            // we don't need chech authentication here.
            this.loadAllProfiles();
        },

        /**
         * load all profiles.
         */
        loadAllProfiles: function() {

            let self = this;

            config.getAllProfiles(self.$auth.user.email, function(profiles, error) {
                if(profiles) {
                    //self.allProfiles = profiles.map( profile => profile.name );
                    self.allProfiles = profiles;
                    // load the first profile.
                    config.loadProfile2Page(profiles[0], self);
                }
            });
        },

        /**
         * handle profile change.
         */
        profileChange: function(item) {

            let self = this;

            // load profile for the selected item.
            config.getProfile(item, function(profile, error) {

                if(profile) {
                    config.loadProfile2Page(profile, self);
                } else {
                    console.log(error);
                }
            });
        }
    }
}
</script>
