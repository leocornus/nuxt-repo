<template lang="pug">
v-container(grid-list-md text-center)
  v-row
    v-col( col="3" )
      v-card
        v-card-text
          nuxt-link( to="/testing/objectAssign" ) Object.assign
    v-col( col="3" )
      v-card
        v-card-text
    v-col( col="3" )
    v-col( col="3" )
</template>

<script>
export default {

    layout: 'vuetify',
    name: 'testing',
    auth: false
}
</script>
