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

  // using the document id as the title.
  v-card-title {{ docId }}
    v-divider( vertical ).mx-4
    v-btn(
      v-if="doc"
      :href="doc.file_download_url"
      target="_blank_"
    ) 
      v-icon(
        color="error"
      ) mdi-file-pdf
      | Download

  //v-card-text( v-if="doc" )
  // set fluid to use all spaces.
  v-container( fluid )
    v-row( v-if="doc" )
      v-col( cols="4" )
        doc-data-table(
          :doc="doc"
          :excludeFields="['file_content', 'article_titles', 'article_paragraphs']"
        )

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
