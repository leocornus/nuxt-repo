<template lang="pug">
// the card to show time window.
v-card( class="mb-3" dense )
  v-card-subtitle Time Window
  // group of buttons.
  v-card-text
    v-btn-toggle(
      v-model="toggleExclusive"
      active-class="primary--text"
      mandatory
      dense
    )
      v-btn All
      v-btn Today
      v-btn 7 Days
      v-btn 30 Days
      v-btn 2 Monthes
      v-btn 3 Monthes
    v-chip-group(
      mandatory
      active-class="primary--text"
    )
      v-chip Relative
      v-chip Absolate
      v-chip Since
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
