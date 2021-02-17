<template lang="pug">
// The Doc(ument) Article Tab Card is simple component to show
// the given document in tab view.
v-container( fluid )
  v-row( v-if="articleTitles.length > 1" )
    v-col(
      cols="8"
    )
      v-card
        v-card-title
          v-text-field(
            v-model="search"
            append-icon="mdi-magnify"
            label="Search Article"
            single-line
            hide-details
            clearable
          )
        //  show-expand
        //  single-expand
        v-data-table(
          hide-default-header
          hide-default-footer
          :single-expand="false"
          :expanded.sync="expanded"
          :headers="headers"
          :items="articleTitles"
          :search="search"
          item-key="title"
          :items-per-page="100"
          show-expand
        )
          // customize the expanded item row.
          template(
            v-slot:expanded-item="{ headers, item }"
          ) 
            td( :colspan="headers.length" )
              v-textarea(
                rows="12"
                filled
                outlined
                :value="articlePara(item.title)"
              ).pt-4
          // customize each table row to make it clickable.
          //template(
            v-slot:item="{ item, expand, isExpanded }"
          //)
            tr
              td( @click="expand(!isExpanded)" ) {{ item.title }}

// The tabs implementation not working well.
// leave here for reference.
//v-card
  // Vertical tab will NOT need v-tabs-items.
  v-tabs(
    vertical
  )
    v-tab(
      v-for="(article, index) in doc.article_titles"
      :key="index"
    ) {{ article }}

    v-tab-item(
      v-for="(para, index) in doc.article_paragraphs"
      :key="index"
    )
      v-card( flat )
        v-card-text(
          v-text="para"
        )
</template>

<script>

export default {

    name: "DocArticlesCard",

    props: {
        doc: {
            type: Object,
            default: {
                id: 'abcd',
                article_titles: ['title one'],
                article_paragraphs: ['para one']
            }
        }
    },

    data: function() {

        return {

            // the model to track tabs.
            tab: null,

            // headers, just one column.
            headers: [
                { text: "Article", value:"title" },
                { text: "", value: "data-table-expand" },
            ],

            // the model for search filter of the data-table.
            search: '',

            expanded: [],
        }
    },

    computed: {
        /**
         */
        articleTitles: function() {

            let self = this;
            let titles = [];

            if( self.doc.hasOwnProperty( 'article_titles' ) ) {

                titles = self.doc["article_titles"].map( title => {

                    return {
                        "title": title
                    }
                });
            }

            return titles;
        }
    },

    methods: {
        /**
         */
        articlePara: function( item ) {

            let index = this.doc["article_titles"].indexOf( item );
            return this.doc['article_paragraphs'][index];
        }
    }
}
</script>
