<template lang="pug">
section( :id="id" )
  v-row( no-gutters )
    v-col( cols="12" )
      component(
        :is="`zero-section-${section}`"
        v-for="section in sections"
        :key="section"
      )
</template>

<script>
export default {
    name: 'ZeroBaseView',

    props: {
        id: {
          type: String,
          default: 'view',
        },
    },

    data: () => ({ sections: [] }),
}
</script>
