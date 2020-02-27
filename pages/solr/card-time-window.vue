<template lang="pug">
// the card to show time window.
v-card( class="mb-3")
  v-card-subtitle Time Window
  // group of buttons.
  v-card-text
    v-btn-toggle(
      v-model="toggleExclusive"
      mandatory
    )
      v-btn All
      v-btn 1
      v-btn 7
      v-btn 30
</template>

<script>

export default {

    name: "time-window",

    props: [],

    data() {
        return {
            toggleExclusive: undefined
        }
    },

    // using computed for dynamic data.
    computed: {

    },
    
    methods: {

    }
}
</script>
