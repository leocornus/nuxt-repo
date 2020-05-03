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

  v-btn( id="add-btn" ) Add Element
</template>

<script>
import * as d3 from "d3";

export default {

    layout: 'vuetify',
    name: 'enter-update-exit',
    auth: false
}
</script>
