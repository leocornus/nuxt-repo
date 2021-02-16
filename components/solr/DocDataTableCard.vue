<template lang="pug">
// The Doc(ument) Data Table Card will show all field / values
// for the document in a data table list.
v-card
  v-card-title
    v-spacer
    v-text-field(
      v-model="search"
      append-icon="mdi-magnify"
      label="Search Metadata"
      single-line
      hide-details
      clearable
    )
  // the data table view.
  v-data-table(
    :headers="headers"
    :items="tableItems"
    :search="search"
    item-key="key"
    :items-per-page="itemsPerPage"
  )
    // customize the value column to have a href link for
    // download url.
    template(
      v-slot:item.value="{ item }"
    ) 
      span( v-if=" item.key == 'file_download_url' ")
        a(
          :href="item.value"
          target="_blank_"
        ) {{ item.value }}
      span(
        v-else-if=" item.key.includes('size') "
      ) 
        strong {{ new Intl.NumberFormat().format(item.value) }}
      span( v-else )
        strong {{ item.value }}
</template>
<script>

export default {

    name: "DocDataTableCard",

    props: {
        doc: {
            type: Object,
            default: {
                id: 'abcd',
                name: 'doc name'
            }
        },

        itemsPerPage: {
            type: String,
            default: "15"
        }
    },

    data: function() {

        return {
            // define headers for the data table.
            headers: [
                { text: "Key", value: "key" },
                { text: "Value", value: "value" }
            ],

            // the model for search filter of the data-table.
            search: ''
        };
    },

    computed: {
        /**
         * preparing the items for data table.
         */
        tableItems: function() {

            // set the empty array.
            let items = [];
            if( this.doc ) {

                items = Object.entries( this.doc )
                .filter( entry => {
                    // exclude the following fields.
                    return ![
                        'file_content', 
                        'article_titles', 
                        'article_paragraphs'
                    ].includes(entry[0]);
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
}
</script>
