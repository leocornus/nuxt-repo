<template lang="pug">
v-container(grid-list-md text-center)
  svg(
    width="500"
    height="570"
  )
    g( style="transform: translate(0, 10px)" )
      path( class="one" :d="line1" )
      path( class="two" :d="line2" )
</template>

<script>
import * as d3 from "d3";

export default {

    layout: 'vuetify',
    name: 'simple-line-chart',
    auth: false,

    data() {

        return {

            data1: [99, 71, 120, 89, 78, 25, 36, 92],
            data2: [90, 71, 110, 89, 58, 25, 26, 92],
            line1: '',
            line2: '',

        };
    },

    mounted() {

        this.calculatePath();
    },

    methods: {

        getScales() {

            const x = d3.scaleTime().range([0, 500]);
            const y = d3.scaleLinear().range([570, 0]);
            d3.axisLeft().scale(x);
            d3.axisBottom().scale(y);
            x.domain(d3.extent(this.data1, (d, i) => i));
            y.domain([0, d3.max(this.data1, d => d)]);
            return { x, y };
        },
            
        calculatePath() {

            const scale = this.getScales();
            const path = d3.line()
              .x((d, i) => scale.x(i))
              .y(d => scale.y(d));

            this.line1 = path(this.data1);
            this.line2 = path(this.data2);
        }
    }
}
</script>

<style lang="sass" scoped>
svg
  margin: 25px

path.one
  fill: none
  stroke: #76BF8A
  stroke-width: 3px
path.two
  fill: none
  stroke: #00008A
  stroke-width: 3px
</style>
