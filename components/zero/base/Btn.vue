<template lang="pug">
  v-btn(
    :color="color"
    :depressed="depressed"
    :min-width="minWidth"
    :tile="tile"
    class="font-weight-bold"
    x-large
    v-bind="$attrs"
    v-on="$listeners"
  ) 
    slot
</template>

<script>
export default {
    name: 'ZeroBaseBtn',

    props: {
        color: {
          type: String,
          default: 'primary',
        },
        depressed: {
          type: Boolean,
          default: true,
        },
        minWidth: {
          type: [Number, String],
          default: 164,
        },
        tile: {
          type: Boolean,
          default: true,
        },
    },
}
</script>
