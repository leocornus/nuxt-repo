<template lang="pug">
v-card
  div( class="d-flex flex-no-wrap justify-space-between" )
    v-avatar( size="120" tile )
      v-img( :src="doc['img.uri.thumbnail'][0]" )
    div
      v-card-title {{previewTitle}}
      v-card-text {{previewDesc}}

</template>

<script>

export default {
    name: "listing-preview",

    // set the properties for this component.
    props: {
        "doc": Object,
        "index": Number,
        // set the name for id field.
        "idFieldName": {
            type: String,
            default: "id"
        },
        "thePage": Object
    },

    computed: {

        /**
         * preview title for each doc.
         */
        previewTitle() {

            console.log(this.doc);
            return this.doc.title;
        },

        /**
         * preview title for each doc.
         */
        previewDesc() {

            return this.doc.teaser;
        }
    },

    data() {
        return {};
    }
}
</script>
