<template lang="pug">
// the drawer for sm screen.
v-navigation-drawer(
  top 
  color="transparent"
  fixed
  height="auto"
  overlay-color="secondary"
  overlay-opacity=".8"
  temporary
  v-bind="$attrs"
  v-on="$listeners"
)
  v-list(
    color="white"
    shaped
  )
    v-list-item(
      v-for="name in items"
      :key="name"
      :to="{ name }"
      :exact="name === 'Home'"
      color="primary"
    )
      v-list-item-content
        v-list-item-title( v-text="name" )
</template>
<script>
export default{

    name: 'ZeroDrawer',

    props: {
        items: {
            type: Array,
            default: () => ([]),
        }
    }
}
</script>
