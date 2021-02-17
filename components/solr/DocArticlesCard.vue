<template lang="pug">
// The Doc(ument) Article Tab Card is simple component to show
// the given document in tab view.
v-container( fluid )
  v-row
    v-col(
      cols="5"
      max-height="800px"
    )
      v-data-table(
        dense
        hide-default-footer
        :headers="headers"
        :items="articleTitles"
        :item-key="title"
        :items-per-page="100"
      )

    v-col( cols="7" )
      // using textarea is easier to control.
      v-textarea(
        rows="32"
        label="Article Paragraph"
        filled
        outlined
        :value="doc.file_content"
      )

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
                name: 'doc name'
            }
        }
    },

    data: function() {

        return {

            // the model to track tabs.
            tab: null,

            // headers, just one column.
            headers: [
                { text: "Article", value:"title" }
            ]
        }
    },

    computed: {
        /**
         */
        articleTitles: function() {

            let self = this;

            let titles = self.doc["article_titles"].map( title => {

                return {
                    "title": title
                }
            });

            return titles;
        }
    },
}
</script>
