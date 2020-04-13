<template lang="pug">
v-container(grid-list-md text-center)
  v-list
    v-list-item
      n-link( to="d3/simple-line-chart" ) Simple Line Chart
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
