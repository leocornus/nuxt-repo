<template lang="pug">
// the card to show all query filters.
v-card( v-if="filters" class="mb-3")
  // NOTE: easy way to set class.
  v-list.indigo.lighten-4
    v-subheader Filters
  
    v-list-item-group
      // @click="$emit('bucket-select', facet.name, bucket.value)"
      v-list-item(
        v-for="(filter, i) in filters"
        :key="'filter-' + i"
        @click = "$emit('filter-select', filter)"
      )
        v-list-item-content {{filter.replace(":", ": ")}}
        v-list-item-action
          v-list-item-action-text X
</template>

<script>

export default {

    name: "query-filters",

    props: ["filters"],

    // using computed for dynamic data.
    computed: {
    }
}
</script>
