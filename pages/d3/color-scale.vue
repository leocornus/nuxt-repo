<template lang="pug">
v-container(grid-list-md)
  h1 How D3 handle color scale
  p Play around how d3 pick colors.

  h2 Category10 scheme
  p( 
    v-for="(sentence, index) in category10Strings"
    :key = "index"
  )
    v-chip(
      v-for="(word, wi) in sentence.split(' ')"
      :color="category10Colors(word)"
      label
    ) {{ word }}
</template>

<script>
import * as d3 from "d3";

export default {

    layout: 'vuetify',
    name: 'color-scale',
    auth: false,

    data() {
        return {

            // the category10 scheme.
            category10Colors: d3.scaleOrdinal( d3.schemeCategory10 ),

            category10Strings: [
                "A sentence with less than ten words",
                "A sentence with exact ten words one two three four",
                "A sentence with more than ten words one two three four"
            ],
        };
    },

    methods: {
    }
}
</script>
