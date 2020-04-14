<template lang="pug">
v-container(grid-list-md)
  h1 A line chart with simple animation
  p Here are some features we are trying to show up:
  ul
    li responsive line chart.
    li simple animation

  v-row
    v-col( cols="3" )
    v-col( cols="6" )
      div( id="linechart" )
    v-col( cols="3" )
</template>

<script>
import * as d3 from "d3";

export default {

    layout: 'vuetify',
    name: 'line-chart',
    auth: false,

    data() {

        return {

            // the data for the line chart.
            // TODO: data structure.
            linesData: [99, 71, 120, 89, 78, 25, 36, 92],
            
            // set margins for the chart.
            chartMargin: {
                top: 20,
                right: 20,
                bottom: 30,
                left: 50
            }
        };
    },

    mounted() {

        this.drawChart();
    },

    methods: {

        /**
         * draw the line chart.
         */
        drawChart() {

            let vm = this;
            
            // initialize the svg element.
            vm.initializeSvg();

            // utility to parse string to time.
            let parseTime = d3.timeParse("%Y-%m-%d");

            // load initial data.
            d3.csv("lines.csv",
                // work on each row to make sure the data type.
                function(aLine) {
                    aLine.date = parseTime(aLine.date);
                    // the leading + will make sure to convert to an integer.
                    aLine.close = +aLine.value;
                    return aLine;
                }
            ).then(function(data) {
            
                console.log(data);

                // setup domain for x, y scale range, based on the live data.
                vm.xRange.domain(d3.extent(data, function(aLine) { return aLine.date; } ));
                vm.yRange.domain([0, d3.max(data, function(aLine) { return aLine.close; }) + 100]);

                // add the x axis at the bottom.
                vm.linesGroup.append("g")
                  .attr("transform", "translate(0," + vm.chartHeight + ")")
                  .call(d3.axisBottom(vm.xRange))
                  // TODO: what is this for?
                  .select(".domain")
                  .remove();

                // add the y axis at the left.
                vm.linesGroup.append("g")
                  .call(d3.axisLeft(vm.yRange))
                  // add text label.
                  .append("text")
                    .attr("fill", "#000")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", "0.71em")
                    .attr("text-anchor", "end")
                    .text("Price ($)");

                // add path for lines.
            });
        },

        /**
         * get ready the SVG element.
         */
        initializeSvg() {

            let vm = this;

            // create svg, using 100% of the room!
            vm.svg = d3.select('#linechart').append("svg")
                //.attr("width", "100%")
                //.attr("height", "100%");
                .attr("width", 500)
                .attr("height", 480);
                //.call(vm.responsivefy);

            console.log(vm.svg.attr('width'));
            console.log(vm.chartMargin);
            
            // calculate the dimention of the chart.
            vm.chartWidth = +vm.svg.attr("width") - vm.chartMargin.left - vm.chartMargin.right;
            vm.chartHeight = +vm.svg.attr("height") - vm.chartMargin.top - vm.chartMargin.bottom;
            console.log(vm.chartWidth, vm.chartHeight);

            // the element group for lines.
            vm.linesGroup = vm.svg.append("g")
                .attr("transform", "translate(" + vm.chartMargin.left + "," + vm.chartMargin.top + ")");

            // set scale range for x and y.
            vm.xRange = d3.scaleTime().rangeRound([0, vm.chartWidth]);
            vm.yRange = d3.scaleLinear().rangeRound([vm.chartHeight, 0]);

            // define or set the function to draw the line.
            vm.lineFunc = d3.line()
                .x( function(aItem) { return vm.xRange( aItem.date ) } )
                .y( function(aItem) { return vm.yRange( aItem.clase) } );
        },
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
