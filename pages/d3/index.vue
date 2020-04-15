<template lang="pug">
v-container(grid-list-md text-center)
  v-list
    v-list-item
      n-link( to="simple-line-chart" ) Simple Line Chart
    v-list-item
      n-link( to="line-chart" ) Line Chart with x, y axises and simple animation
    v-list-item
      n-link( to="multi-lines-chart" ) Multiple Lines Chart
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
