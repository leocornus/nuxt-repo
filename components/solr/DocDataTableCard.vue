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
        headers: {
            type: Array,
            default: [
                { text: "Key", value: "key" },
                { text: "Value", value: "value" }
            ],
        },

        tableItems: {
            type: Array,
            default: [
                { key: 'fieldName', value: 'fieldValue' }
            ],
        },

        itemsPerPage: {
            type: String,
            default: "15"
        }
    },

    data: function() {

        return {
            // the model for search filter of the data-table.
            search: ''
        };
    },
}
</script>
