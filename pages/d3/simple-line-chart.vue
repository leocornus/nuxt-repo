<template lang="pug">
v-container(grid-list-md text-center)
  svg(
    :width="width"
    :height="height"
  )
    // the chart.
    g(
      :transform="'translate(' + chartMargin.left + ',' + chartMargin.top + ')'"
    )
      path( :d="line" )
    // the x axis
    g(
      id="x-axis" 
      :transform="'translate(' + chartMargin.left + ',' + chartHeight + ')'"
    )
    // the y axix
    g(
      id="y-axis"
      :transform="'translate(' + chartMargin.left + ',0)'"
    )
</template>

<script>
import * as d3 from "d3";

export default {

    layout: 'vuetify',
    name: 'simple-line-chart',
    auth: false,

    data() {

        return {

            // set the chart dimention.
            width: 500,
            height: 570,

            // chart margin:
            chartMargin: {
                top: 20,
                right: 20,
                bottom: 30,
                left: 50
            },

            data: [99, 71, 120, 89, 78, 25, 36, 92],
            line: ''

        };
    },

    mounted() {

        this.calculatePath();
    },

    methods: {

        getScales() {

            let vm = this;

            vm.chartWidth = vm.width - vm.chartMargin.left - vm.chartMargin.right;
            vm.chartHeight = vm.height - vm.chartMargin.top - vm.chartMargin.bottom;
            // range is normally the size of the chart.
            //const x = d3.scaleTime().range([0, vm.chartWidth]);
            const x = d3.scaleLinear().rangeRound([0, vm.chartWidth]);
            const y = d3.scaleLinear().rangeRound([vm.chartHeight, 0]);
            x.domain(d3.extent(this.data, (d, i) => i));
            y.domain([0, d3.max(this.data, d => d) + 5]);

            let xAxis = d3.axisBottom(x);
            //console.log("x axis: ", xAxis);
            //console.log("x axis ticks: ", xAxis.ticks());
            d3.select("#x-axis").call(xAxis);

            let yAxis = d3.axisLeft(y);
            d3.select("#y-axis").call(yAxis);

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
  // turn on / off boder for testing.
  border: 0px solid red

path
  fill: none
  stroke: #76BF8A
  stroke-width: 3px
</style>
