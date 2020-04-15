<template lang="pug">
v-container(grid-list-md text-center)
  v-breadcrumbs(
    :items="[{text: 'D3 Demo', disable: false, href: '/d3'}]"
  ).pa-0
  svg(
    width="500"
    height="570"
  )
    // the chart.
    g( transform="translate(0, 10)" )
      path( :d="line" )
</template>

<script>
import * as d3 from "d3";

export default {

    layout: 'vuetify',
    name: 'simple-line-chart',
    auth: false,

    data() {

        return {

            data: [99, 71, 120, 89, 78, 25, 36, 92],
            line: ''

        };
    },

    mounted() {

        this.calculatePath();
    },

    methods: {

        getScales() {

            const x = d3.scaleTime().range([0, 500]);
            const y = d3.scaleLinear().range([570, 0]);
            let xAxis = d3.axisLeft().scale(x);
            console.log("x axis: ", xAxis);
            console.log("x axis ticks: ", xAxis.ticks());
            let yAxis = d3.axisBottom().scale(y);
            x.domain(d3.extent(this.data, (d, i) => i));
            y.domain([0, d3.max(this.data, d => d)]);
            return { x, y };
        },
            
        calculatePath() {

            const scale = this.getScales();
            const path = d3.line()
              .x((d, i) => scale.x(i))
              .y(d => scale.y(d));

            this.line = path(this.data);
        }
    }
}
</script>

<style lang="sass" scoped>
svg
  margin: 25px

path
  fill: none
  stroke: #76BF8A
  stroke-width: 3px
</style>
