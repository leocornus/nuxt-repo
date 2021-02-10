<template lang="pug">
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
  v-row( v-if="doc" )
    v-col( cols="4" )

    v-col( cols="8" )
      // using textarea is easier to control.
      v-textarea(
        rows="30"
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

export default {

    name: "DocumentViewCard",

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
            doc: null
        };
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

    methods: {

        /**
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
            } );
        },
    }
}
</script>
