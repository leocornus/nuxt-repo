<template lang="pug">
// The Document View Card will show the document details.
// It can be used in a full screen dialog.
v-card
  v-toolbar(
    flat
    color="primary"
    dark
  )
    v-btn(
      icon
      dark
    )
      v-icon mdi-file-document
    v-toolbar-title Document Details
    v-spacer
    v-btn(
      text
      @click="$emit('dialog-cancel')"
    )
      v-icon( left ) mdi-close
      | Close

  v-card-title {{ docId }}

  //v-card-text( v-if="doc" )
  // set fluid to use all spaces.
  v-container( fluid )
    v-row( v-if="doc" )
      v-col( cols="4" )
        doc-data-table(
          :headers="headers"
          :tableItems="tableItems"
        )
        // using two lines v list.
        //v-list(
        //  subheader
        //  two-line
        //)
          v-subheader( inset ) Metadata
          v-list-item(
            v-for="meta in fields.metadata"
            :key="meta"
          )
            v-list-item-content
              v-list-item-title {{ doc[meta] }}
              v-list-item-subtitle {{ meta }}

          v-divider( inset )

          v-subheader( inset ) File Metadata
          v-list-item(
            v-for="meta in fields.fileMetadata"
            :key="meta"
          )
            v-list-item-content
              v-list-item-title {{ doc[meta] }}
              v-list-item-subtitle {{ meta }}

      v-col( cols="8" )
        // using textarea is easier to control.
        v-textarea(
          rows="32"
          label="File Content"
          filled
          outlined
          :value="doc.file_content"
        )
  //pre {{ doc.file_content }}

  //v-card-actions
    v-spacer
    v-btn(
      color="green darken-1"
      @click="$emit('dialog-cancel')"
    ) Ok
    v-spacer
</template>

<script>

import axios from 'axios';

import DocDataTableCard from '@/components/solr/DocDataTableCard.vue';

export default {

    name: "DocumentViewCard",

    components: {
        'doc-data-table': DocDataTableCard
    },

    props: {

        docId: {
            type: String,
            default: 'fileid'
        },

        collUrl: {
            type: String,
            default: "https://www.example.com/search"
        }
    },

    data: function() {

        return {

            // the document.
            doc: null,

            // define the headers for the table.
            headers: [
                { text: "Key", value: "key" },
                { text: "Value", value: "value" }
            ],

            // search filter for data table.
            search: ''
        };
    },
    
    computed: {

        /**
         * Calculate the fields from the document
         * It is basically the keys of the document object.
         * {
         *     metadata: [id],
         *     fileMetadata: [file_name, file_size]
         * }
         */
        fields: function() {

            // set the empty fields.
            let keys = {
                metadata: [],
                fileMetadata: []
            };

            if( this.doc ) {

                Object.keys( this.doc ).forEach( key => {

                    if( key == 'file_content' ) {
                        // skip the file_content field.
                        // do nothing here.
                    } else if( key.startsWith('file') ) {
                        keys.fileMetadata.push(key);
                    } else {
                        keys.metadata.push(key);
                    }
                } );
            }

            return keys;
        },

        /**
         * preparing the items for data table.
         */
        tableItems: function() {

            // set the empty array.
            let items = [];
            if( this.doc ) {

                items = Object.entries( this.doc )
                .filter( entry => {
                        return entry[0] != 'file_content' ;
                } )
                .map( entry => {
                    return {
                        "key": entry[0],
                        "value": entry[1]
                    };
                } );
            }

            return items;
        }
    },

    /**
     * watcher function.
     * read more from here: https://vuejs.org/v2/guide/computed.html
     */
    watch: {

        docId: function( newId, oldId) {

            // set the doc to null will we loading....
            this.doc = null

            this.loadDocument();
        }
    },

    /**
     * we need this method to load the document at the very first time.
     */
    mounted: function() {

        this.loadDocument();
    },

    methods: {

        /*mounted*
         * load the full document from server.
         */
        loadDocument: function() {

            let vm = this;

            axios.post( vm.collUrl + "select", { query: 'id:"' + vm.docId + '"' } )
            .then( response => {
                vm.doc = response.data.response.docs[0];
            } )
            .catch( error => {
                // show error message.
                console.log( error );
            } );
        },
    }
}
</script>
