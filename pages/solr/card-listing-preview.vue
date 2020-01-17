<template lang="pug">
// the preview card.
v-card.mb-2
  div( class="d-flex flex-no-wrap justify-space-between" )
    v-avatar( size="180" tile )
      v-img( :src="previewThumbnail" 
        max-width="180"
        @click.stop="showCarousels = true"
      )
    div
      v-card-title {{previewTitle}}
      v-card-text {{previewDesc}}

  // the carousels dialog.
  v-dialog( v-model="showCarousels" max-width="860" )
    //v-img( :src="doc['img.uri.preview'][0]" )
    v-carousel( height="600" )
      // v-img will be used by default
      v-carousel-item(
        v-for="(item,i) in doc['img.uri.preview']"
        :key="i"
        :src="item"
      )

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
         * preview thumbnail.
         */
        previewThumbnail() {

            if(this.doc.hasOwnProperty('img.uri.thumbnail')) {
                return this.doc['img.uri.thumbnail'][0];
            } else {
                return 'no image';
            }
        },

        /**
         * preview title for each doc.
         */
        previewTitle() {

            //console.log(this.doc);
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
        return {
            showCarousels: false
        };
    },

    methods: {
        showSlides: function() {

            console.log(this.doc);
        }
    }
}
</script>
