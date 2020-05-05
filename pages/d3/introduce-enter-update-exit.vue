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
            maxHeight: 100
        };
    },

    mounted() {
        this.update();
    },

    methods: {

        update() {

            let self = this;

            // Update selection: Resize and position existing 
            // DOM elements with data bound to them.
            var selection = d3.select("#chart")
              .selectAll(".bar").data(self.dataset)
            self.calcStyle(selection);

            // Enter selection: Create new DOM elements for added 
            // data items, resize and position them and attach a 
            // mouse click handler.
            // At beginning (initialize phase), the enter will be called.
            let newSelection = selection.enter()
              .append("div").attr("class", "bar")
              // the entering event.
              .on("click", function(e, i){
                  self.dataset.splice(i, 1);
                  self.update();
              });

            self.calcStyle(newSelection);

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

            console.log("existing div:");

            selection.style("height", item => item + "px")
                .style("margin-top", item => self.maxHeight - item + "px");
        },

        handleAddElement() {

            let self = this;
            if(self.dataset.length < 10) 
                this.dataset.push(Math.round(Math.random() * self.maxHeight));

            self.update();
        }
    }
}
</script>

<style lang="sass" >
// TODO: scoped is not working!
#chart
  width: 315px
  height: 100px
  background-color: #f6f6f6
  margin-bottom: 20px

#dataset
  padding: 10px
  width: 315px
  background-color: #f6f6f6
  margin-bottom: 20px
  font-family: "Inconsolata", sans-serif

.bar 
  width: 25px
  margin-right: 5px
  background-color: #C1ADC4
  float: left
  cursor: pointer
  
.bar:last-child 
  margin-right: 0

.bar:hover
  background-color: #927A94
</style>
