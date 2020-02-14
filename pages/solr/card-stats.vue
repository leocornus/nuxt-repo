<template lang="pug">
// the card to show all query filters.
v-card( v-if="stats" class="mb-3")
  v-list.blue.lighten-1
    v-subheader Stats
    v-list-item-group
      v-list-item(
        v-for="(key, i) in Object.keys(stats)"
        :key="'stats-' + i"
      )
        v-list-item-content {{key + "=" + stats[key]}}
</template>

<script>

export default {

    name: "stats",

    props: ["stats"],

    // using computed for dynamic data.
    computed: {
    }
}
</script>
