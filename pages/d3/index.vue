<template lang="pug">
v-container(grid-list-md text-center)
  v-list
    v-list-item
      n-link( to="/d3/introduce-update-enter-exit" ) D3 introduction update enter exit
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
export default {

    layout: 'vuetify',
    name: 'd3-demo',
    auth: false,
}
</script>

<style lang="sass" scoped>
</style>
