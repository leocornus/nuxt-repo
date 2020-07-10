<template lang="pug">
v-container( grid-list-xs )
  ul
    li Order ID: {{ $route.params.order}}
</template>

<script>

export default {

    name: 'DynamicOrder',

    auth: false,

    layout: 'vuetify',

    data() {
        return {
        }
    }

}
</script>
