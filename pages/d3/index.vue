<template lang="pug">
v-container(grid-list-md text-center)
  v-row
    v-col( cols="12" )
      v-autocomplete(
        v-model="selectedPage"
        label="Pick an example page"
        dense
        solo
        :items="d3Pages"
        clearable
        prepend-icon="mdi-file-find"
      )
  v-list
    v-list-item
      n-link( to="/d3/introduce-enter-update-exit" ) D3 introduction update enter exit
    v-list-item
      n-link( to="/d3/simple-line-chart" ) Simple Line Chart
    v-list-item
      n-link( to="/d3/line-chart" ) Line Chart with x, y axes and simple animation
    v-list-item
      n-link( to="/d3/multi-lines-chart" ) Multiple Lines Chart
    v-list-item
      n-link( to="/d3/multi-lines-chart-legend" ) Multiple Lines Chart with legend
    v-list-item
      n-link( to="/d3/color-scale" ) Color Scale 
</template>

<script>

import * as d3 from 'd3';

export default {

    layout: 'vuetify',
    name: 'd3-demo',
    auth: false,

    data() {
        return {
            selectedPage: ''
        }
    },

    watch: {

        selectedPage: function(page) {

            //console.log('selected page:', page);
            window.location.href=page.split("/")[1];
        }
    },

    /**
     * using async data for pages list.
     */
    async asyncData() {

        const list = await d3.tsv('/pages-list.csv')
        //console.log(list);
        return {
            d3Pages: list.map( aPage => {
                return {
                    text: aPage.page_path.split(".")[0],
                    value: aPage.page_path.split(".")[0]
                };
            })
        };
    }
}
</script>

<style lang="sass" scoped>
</style>
