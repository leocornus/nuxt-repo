<template lang="pug">
// the card to list factes.
v-expansion-panels
  v-expansion-panel(
    v-for="(facet, index) in facets"
    :key="'facet-' + index"
  )
    v-expansion-panel-header {{facet.name}} - {{facet.buckets.length}}
  
    v-expansion-panel-content
      v-list
        v-list-item-group
          v-list-item(
            v-for="(bucket, index) in facet.buckets"
            :key="index"
          )
            v-list-item-content {{bucket.value}}
            v-list-item-action
              v-list-item-action-text {{bucket.count}}
</template>

<script>

export default {

    name: "facet-buckets",

    props: ["facets"],

    // using computed for dynamic data.
    computed: {
    }
}
</script>
