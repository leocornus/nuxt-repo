<template lang="pug">
v-container(grid-list-md)
  h1 D3 introduction: Enter, Update, Exit.
  p A simple way to get understood D3 enter, update and exit.
  h2 Credit
  p This is based on the great post: 
    a( href="https://medium.com/@c_behrens/enter-update-exit-6cafc6014c36" )
      | Enter, Update, Exit
      | An Introduction to D3.js, The Web’s Most Popular Visualization Toolkit

  div( id="chart" )

  div( id="dataset" )

  v-btn(
    id="add-btn"
    @click="handleAddElement"
  ) Add Element
</template>

<script>
import * as d3 from "d3";

export default {

    layout: 'vuetify',
    name: 'enter-update-exit',
    auth: false,

    data() {
        return {
            dataset: [15,9,34,28,59],
            maxHeight: 100,
            //colors: d3.scaleOrdinal( d3.schemeCategory10 ).domain([...Array(10).keys()])
            colors: d3.scaleOrdinal( d3.schemeCategory10 )
        };
    },

    mounted() {

        this.colors.domain(this.dataset);
        this.update();
    },

    methods: {

        update() {

            let self = this;

            // Update selection: Resize and position existing 
            // DOM elements with data bound to them.
            var selection = d3.select("#chart")
              .selectAll(".bar").data(self.dataset)
              .call(self.calcStyle);
            //self.calcStyle(selection);

            // Enter selection: Create new DOM elements for added 
            // data items, resize and position them and attach a 
            // mouse click handler.
            // At beginning (initialize phase), the enter will be called.
            //let newSelection = selection.enter()
            selection.enter()
              .append("div").attr("class", "bar")
              // the entering event.
              .on("click", function(e, i){
                  self.dataset.splice(i, 1);
                  self.update();
              })
              .on("mouseover", function(d, i) {
                  self.handleMouseover(this, d, i);
              })
              .on("mouseout", function(d, i) {
                  self.handleMouseout(this, d, i);
              })
              // the call function will add itself as the first parameter
              .call(self.calcStyle);
            //self.calcStyle(newSelection);

            // Exit selection: Remove elements without data from the DOM
            selection.exit().remove();

            // Print underlying data array
            d3.select("#dataset").text(self.dataset);
        },

        /**
         * set the height for the give item.
         */
        calcStyle(selection) {

            let self = this;

            console.log("existing div:", selection);

            selection.style("height", item => item + "px")
                .style("margin-top", item => self.maxHeight - item + "px")
                .style("width", "25px")
                .style("margin-right", "5px")
                //.style("background-color", "#C1ADC4")
                .style("background-color", item => self.colors(item) )
                .style("float", "left")
                .style("cursor", "pointer");
        },

        /**
         * handle mouse over.
         */
        handleMouseover(element, item, index) {

            d3.select(element).style('background-color', "#927A94");
        },

        /**
         * handle mouseout.
         */
        handleMouseout(element, item, index) {

            let self = this;

            d3.select(element)
                //.style('background-color', "#C1ADC4");
                .style('background-color', item => self.colors(item));
        },

        handleAddElement() {

            let self = this;

            if(self.dataset.length < 10) 
                self.dataset.push(Math.round(Math.random() * self.maxHeight));

            self.colors.domain( self.dataset );

            self.update();
        }
    }
}
</script>

<style lang="sass" >
// TODO: scoped is not working!
#chart
  width: 300px
  height: 100px
  background-color: #f6f6f6
  margin-bottom: 20px

#dataset
  padding: 10px
  width: 315px
  background-color: #f6f6f6
  margin-bottom: 20px
  font-family: "Inconsolata", sans-serif

.bar:last-child 
  margin-right: 0
</style>
