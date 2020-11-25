<template lang="pug">
v-container(grid-list-md text-center)
  v-row
    v-col( col="3" )
      v-card
        v-card-text
          nuxt-link( to="/math/listOfSquareRoot" ) List of Square Root
    v-col( col="3" )
      v-card
        v-card-text
          nuxt-link( to="/math/numberOfDigits" ) Number of Digits
    v-col( col="3" )
    v-col( col="3" )
</template>

<script>
export default {

    layout: 'vuetify',
    name: 'MathIndex',
    auth: false
}
</script>
