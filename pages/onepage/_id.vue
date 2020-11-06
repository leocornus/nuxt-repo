<template lang="pug">
v-container( grid-list-xs )
  // the id could be access in object $route.params
  h1 Hello {{ $route.params.id }}!
  h2 hello again {{ theId() }}
</template>

<script>
/**
 * test the dynamic routes for the given id.
 * - https://nuxtjs.org/docs/2.x/features/file-system-routing
 */
export default {

    name: 'DynamicId',

    auth: false,

    layout: 'vuetify',

    data() {
        return {
        };
    },

    methods: {

        theId() {

            // using this to access the id parameter
            return this.$route.params.id;
        }
    }

}
</script>

<style lang="sass">
.red
  //color: red
</style>
