<template lang="pug">
// the preview card.
v-expansion-panel(
)
  v-expansion-panel-header {{facetLabel}} - {{facetBuckets.length}}

  v-expansion-panel-content
    v-list
      v-list-item-group
        v-list-item(
          v-for="(bucket, index) in facetBuckets"
          :key="index"
        )
          v-list-item-content {{bucket.value}}
          v-list-item-action
            v-list-item-action-text {{bucket.count}}
</template>

<script>

export default {

    name: "facet-buckets",

    props: ["facet"],

    // using computed for dynamic data.
    computed: {
        // the facet label.
        facetLabel() {
            return this.facet.name;
        },

        // facet buckets.
        facetBuckets() {
            return this.facet.buckets;
        }
    }
}
</script>
