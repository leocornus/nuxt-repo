<template lang="pug">
v-row
  template(
    v-for="(page, index) in pages"
  )
    v-col(
      :key="index"
    )
      v-card
        v-card-text
          nuxt-link( :to="$route.path + '/' + page" ) {{ page }}
    // set to 5 columns for each row.
    v-responsive(
      v-if="((index + 1) % 5) === 0"
      :key="`width-${index}`"
      width="100%"
    )
</template>

<script>

export default {

    name: 'PageIndex',

    props: {
        pages: {
            type: Array,
            default: []
        }
    },

    data() {
        return {
        };
    },
}
</script>
