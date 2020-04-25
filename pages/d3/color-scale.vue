<template lang="pug">
v-container(grid-list-md)
  h1 How D3 handle color scale
  p Play around how d3 pick colors.

  h2 Category10 scheme
  p( 
    v-for="(sentence, index) in sentences"
    :key="index"
  )
    v-chip(
      v-for="(word, wi) in sentence.split(' ')"
      :color="category10Colors(word)"
      :key="wi"
      label
    ) {{ word }}
    br
    v-chip(
      v-for="(word, wi) in sentence.split(' ')"
      :color="pairedColors(word)"
      :key="wi"
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

            sentences: [
                "A sentence with less than ten words",
                "A sentence with exact ten words one two three four",
                "A sentence with more than ten words one two three four"
            ],

            // the category10 scheme.
            category10Colors: d3.scaleOrdinal( d3.schemeCategory10 ),

            pairedColors: d3.scaleOrdinal( d3.schemePaired )
        };
    },

    created() {

        this.category10Colors.domain(this.sentences[1]);

        console.log(this.category10Colors);
        console.log(this.pairedColors);
    },

    methods: {
    }
}
</script>
