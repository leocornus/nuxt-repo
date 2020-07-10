<template lang="pug">
v-container( grid-list-xs )
  h1 Hello {{ $route.params.id }}!
</template>

<script>

export default {

    name: 'DynamicId',

    auth: false,

    layout: 'vuetify',

    data() {
        return {
        }
    }

}
</script>

<style lang="sass">
.red
  //color: red
</style>
