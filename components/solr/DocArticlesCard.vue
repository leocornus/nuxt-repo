<template lang="pug">
// The Doc(ument) Article Tab Card is simple component to show
// the given document in tab view.
v-card
  v-tabs(
    vertical
  )
    v-tab(
      v-for="(article, index) in doc.article_titles"
      :key="index"
      text-align="left"
    ) {{ article }}

    v-tab-item(
      v-for="(para, index) in doc.article_paragraphs"
      :key="index"
    )
      v-card( flat )
        v-textarea(
          rows="32"
          label="Article Paragraph"
          filled
          outlined
          :value="para"
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
            tab: null
        }
    },

    computed: {

    },
}
</script>
