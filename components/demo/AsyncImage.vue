<template lang="pug">
// ====

v-img(
  v-bind="$attrs"
  v-on="$listeners"
  :src="imageSrc"
)
  // using placeholder slot to show the 
  // circular progress
  // while we loading the image asynchronously
  template( v-slot:placeholder )
    v-row(
      class="fill-height ma-0"
      align="center"
      justify="center"
    )
      v-progress-circular(
        indeterminate
        color="grey lighten-5"
      )
  slot
  // this following is for debuging.
  //p {{imageSrc}}
</template>

<script>

export default {

    name: 'DemoAsyncImage',

    props: {
        imageId: {
            type: String
        },
        // basically the width, in pixel
        size: {
            type: Number,
            default: 200
        },
    },

    data() {
        return {
            // have to define the variable here.
            imageSrc: ''
        };
    },

    async mounted() {

        // base url is setup in nuxt.config.js file.
        const theSrc = await this.$axios.$get(`/w/image/${this.imageId}?size=${this.size}`);
        this.imageSrc = theSrc;
    }
}
</script>
