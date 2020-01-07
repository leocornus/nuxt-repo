<template lang="pug">
v-card
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
