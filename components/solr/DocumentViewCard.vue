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
      v-icon mdi-cog
    v-toolbar-title {{ docId }}
    v-spacer
    v-btn(
      icon
      dark
      @click="$emit('dialog-cancel')"
    )
      v-icon mdi-close

  v-card-text
      pre( v-if="doc" ) {{ doc.file_content }}
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
