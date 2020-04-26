<template lang="pug">
v-container(grid-list-md)
  h1 A line chart with multiple lines.
  p This is a example to show temperatures for multiple citeis throught a year.

  v-row
    v-col( cols="2" )
      v-checkbox(
        v-for="(city, index) in cities"
        :key="index"
        v-model="selectedCities"
        :label="city.name"
        :value="city.name"
      )
      v-btn(@click="updateChart") Update
    v-col( cols="8" )
      div( id="linechart" )
    v-col( cols="2" )
</template>

<script>
import * as d3 from "d3";

export default {

    layout: 'vuetify',
    name: 'multi-lines-chart',
    auth: false,

    data() {

        return {

            // set margins for the chart.
            // margin will be used to draw axes.
            chartMargin: {
                top: 20,
                right: 70,
                bottom: 30,
                left: 50
            },

            // data.
            cities: [],
            selectedCities: []
        };
    },

    mounted() {

        this.drawChart();
    },

    methods: {

        /**
         */
        updateChart() {

            // clear the chart.
            d3.selectAll("svg").remove();
            this.drawChart();

        },

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
            d3.json("/d3/multiLines-cities.json")
            .then(function(result) {
            
                //console.log(cities);
                vm.cities = result;
                //vm.selectedCities = vm.cities.map( city => city.name );
                //vm.selectedCities = [vm.cities[0].name];
                let data = vm.cities[0].values;

                // ==== draw axes!

                // setup domain for x, y scale range, based on the live data.
                // d3.extent will restun a pair of min and max for the given data.
                vm.xRange.domain(d3.extent(data, function(aLine) { return new Date(aLine.date); } ));
                vm.yRange.domain([0, d3.max(data, function(aLine) { return +aLine.temperature; }) + 10]);

                // add the x axis at the bottom.
                vm.linesGroup.append("g")
                  .attr("transform", "translate(0," + vm.chartHeight + ")")
                  .call(d3.axisBottom(vm.xRange));
                  // this is to remove the line on X axis.
                  //.select(".domain")
                  //.remove();

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
                    .text("Temperature (ºF)");

                vm.cities[0].stroke = {
                    color: "#fb8c00",
                    width: 1
                };
                vm.cities[1].stroke = {
                    color: "#ff5252",
                    width: 3 
                };
                vm.cities[2].stroke = {
                    color: "#4caf50",
                    width: 1
                };

                // draw path.
                vm.cities.forEach( city => {

                    if(vm.selectedCities.includes( city.name ))
                        vm.drawPath(city.values, city.stroke, city.name);
                });
            });
        },

        /**
         * draw path from the given data.
         */
        drawPath(data, stroke, label) {

            let vm = this;

            // add path for lines.
            let path = vm.linesGroup.append("path")
              .datum(data)
              .attr("fill", "none")
              .attr("stroke", stroke.color)
              .attr("stroke-linejoin", "miter")
              .attr("stroke-linecap", "miter")
              .attr("stroke-width", stroke.width)
              .attr("d", vm.lineFunc);

            // get total nodes for transition.
            let totalLength = path.node().getTotalLength();
            //console.log("Total Length: ", totalLength);
            //console.log("The path selection: ", vm.path.node());
            path
              .attr("stroke-dasharray", totalLength + " " + totalLength)
              // this is the initial value
              .attr("stroke-dashoffset", totalLength)
              .transition()
                .duration(5000)
                .ease(d3.easeLinear)
                .attr("stroke-dashoffset", 0); // this is the final value.

            if(label) {
                // use the last value of data as the position for text.
                const lastData = data[data.length - 1];
                vm.linesGroup.append("text")
                  // use the ending value 
                  // we don't really need the datum for this one.
                  //.datum({name: label, value: data[data.length - 1]})
                  //.attr("transform", function(d) {
                  //    console.log(d);
                  //    return "translate(" + vm.xRange(new Date(d.value.date)) + "," +
                  //        vm.yRange(+d.value.temperature) + ")";
                  //})

                  // we could just use the data directly.
                  .attr("transform", "translate(" + vm.xRange( new Date(lastData.date) ) +
                      "," + vm.yRange(+lastData.temperature) + ")")
                  .attr("x", 3)
                  .attr("dy", "0.35em")
                  // the color of text is set with the fill property.
                  .attr("fill", stroke.color)
                  .style("font", "bold 10px sans-serif")
                  //.text(function(d) { return d.name; });
                  .text(label);
            }
        },

        /**
         * get ready the SVG element.
         */
        initializeSvg() {

            let vm = this;

            // create svg, using 100% of the room!
            vm.svg = d3.select('#linechart').append("svg")
                .attr("width", "100%")
                //.attr("height", "100%");
                //.attr("width", 500)
                .attr("height", 480);
                //.call(vm.responsivefy);
            //console.log(vm.svg);

            //console.log(vm.svg.attr('width'));
            //let parentNode = d3.select(d3.select('#linechart').node().parentNode);
            //console.log(parseInt(parentNode.style('width')));
            //console.log("middle col: ", parentNode.node().getBoundingClientRect());
            //console.log("svg DOMRect: ", vm.svg.node().getBoundingClientRect());
            //console.log("svg: ", vm.svg.node().getBBox());
            //console.log(vm.chartMargin);
            
            // calculate the dimention of the chart.
            // +vm.svg.attr("innerWidth")
            const svgRect = vm.svg.node().getBoundingClientRect();
            vm.chartWidth = svgRect.width - vm.chartMargin.left - vm.chartMargin.right;
            // +vm.svg.style("height")
            vm.chartHeight = svgRect.height - vm.chartMargin.top - vm.chartMargin.bottom;
            console.log(vm.chartWidth, vm.chartHeight);

            // the element group for lines.
            vm.linesGroup = vm.svg.append("g")
                .attr("transform", "translate(" + vm.chartMargin.left + "," + vm.chartMargin.top + ")");

            // set scale range for x and y.
            vm.xRange = d3.scaleTime().rangeRound([0, vm.chartWidth]);
            vm.yRange = d3.scaleLinear().rangeRound([vm.chartHeight, 0]);

            // define or set the function to draw the line.
            vm.lineFunc = d3.line()
                .x( function(aItem) { return vm.xRange( new Date(aItem.date) ) } )
                .y( function(aItem) { return vm.yRange( +aItem.temperature) } );
        },
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
