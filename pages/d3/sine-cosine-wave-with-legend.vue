<template lang="pug">
v-container(grid-list-md)
  h1 Sine and Cosine waves in one chart
  p This is a example to show the sine and cosine waves in one chart.

  v-row
    v-col( cols="3" )
    v-col( cols="9" )
      // set the chart-container class to calculate width and 
      // height of the chart.
      v-row.chart-container
        v-col( cols="12").pa-0
          svg( style="border: black 1px solid"
          )
</template>

<script>
import * as d3 from "d3";

export default {

    layout: 'vuetify',
    name: 'sine-consine-waves-legend',
    auth: false,

    data() {
        return {

            // sine and cosine wave data.
            waveData: this.generateWaveData(),

            // set chart margin.
            chartMargin: {
                top: 30, right: 10, bottom: 50, left: 60
            }
        }
    },

    /**
     * the DOM is ready.
     */
    mounted() {

        let self = this;

        // next tick will make sure the full page DOM is loaded, 
        // including all components
        this.$nextTick( function() {
            window.addEventListener('resize', function() {
                d3.select('svg')
                  .attr('width', self.chartWidth())
                  .attr('height', self.chartHeight());
            });
        });

        d3.select('svg')
          .attr('width', self.chartWidth())
          .attr('height', self.chartHeight());
    },

    methods: {
        /**
         * calculate the chart width.
         * will use the full width of the chart-container
         */
        chartWidth() {

            const containerSize = d3.select('.chart-container').node().getBoundingClientRect();

            return containerSize.width;
        },

        /**
         *
         */
        chartHeight() {

            const wrapSize = d3.select('.v-content__wrap').node().getBoundingClientRect();
            const containerSize = d3.select('.chart-container').node().getBoundingClientRect();

            return wrapSize.height - containerSize.top;
        },

        /**
         * generate wave data.
         */
        generateWaveData() {

            let sin1 = [],
                sin2 = [],
                cos1 = [],
                cos2 = [],
                r1 = Math.random(),
                r2 = Math.random(),
                r3 = Math.random(),
                r4 = Math.random();

            for (let i = 0; i < 100; i++) {
                sin1.push([i, r1 * Math.sin( r2 + i / ( 10 * (r4 + 0.5) ))]);
                cos1.push([i, r2 * Math.sin( r3 + i / ( 10 * (r3 + 0.5) ))]);
                sin2.push([i, r3 * Math.sin( r1 + i / ( 10 * (r2 + 0.5) ))]);
                cos2.push([i, r4 * Math.sin( r4 + i / ( 10 * (r1 + 0.5) ))]);
            }

            return [
                { label: "Sine Wave", data: sin1 },
                { label: "Cosine Wave", data: cos1 },
                { label: "Sine2 Wave", data: sin2 },
                { label: "Cosine2 Wave", data: cos2 }
            ];
        }
    }
}
</script>
