<template lang="pug">
// the preview card.
v-card(
  class="mx-auto"
  max-width="100%"
).mb-2
  v-img(
    :src="previewImage" 
    @click.stop="showCarousels = true"
    class="align-end"
  )
    v-card-title
      span(
        class="indigo lighten-5"
        style="opacity: 80%"
      ) {{previewType}}
  v-card-title.headline {{previewTitle}}
  v-card-subtitle {{previewAddress}}
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
         * preview image.
         */
        previewImage() {

            if(this.doc.hasOwnProperty('img.uri.preview')) {
                return this.doc['img.uri.preview'][0];
            } else {
                return 'no image';
            }
        },

        /**
         * preview title for each doc.
         */
        previewTitle() {

            const numFormater = new Intl.NumberFormat('en-US');
            //console.log(this.doc);
            return "$" + numFormater.format(this.doc.listvalue_i);
        },

        previewType() {

            return [this.doc.id, 
                this.doc.residencetype,
                this.doc.bedroomscount + " Bedrooms",
                this.doc.washrooms + " Washrooms"].join(" | ");
        },

        previewAddress() {

            return [this.doc.title,
                this.doc.neighbourhoodname,
                this.doc.city].join(" | ");
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
