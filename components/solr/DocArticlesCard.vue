<template lang="pug">
// The Doc(ument) Article Tab Card is simple component to show
// the given document in tab view.
v-card
  v-tabs(
    v-model="tab"
  )
    v-tab(
      v-for="(article, index) in doc.article_titles"
      :key="index"
    ) {{ article }}

  v-tabs-items( v-model="tab" )
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
            tab: null
        }
    },

    computed: {

    },
}
</script>
