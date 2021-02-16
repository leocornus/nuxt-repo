<template lang="pug">
// The Doc(ument) List Card is simple component to show
// the given document in 2 lines v-list.
v-card
  // using two lines v list.
  v-list(
    subheader
    two-line
  )
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
</template>
<script>
export default {

    name: "DocListCard",

    props: {
        doc: {
            type: Object,
            default: {
                id: 'abcd',
                name: 'doc name'
            }
        },

        excludeFields: {
            type: Array,
            default: []
        }
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

            let self = this;

            // set the empty fields.
            let keys = {
                metadata: [],
                fileMetadata: []
            };

            if( self.doc ) {

                Object.keys( self.doc ).forEach( key => {

                    if( self.excludeFields.includes( key ) ) {
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
    },
}
</script>
