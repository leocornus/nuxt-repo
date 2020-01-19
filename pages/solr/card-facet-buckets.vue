<template lang="pug">
// the card to list factes.
v-expansion-panels
  v-expansion-panel(
    v-for="(facet, index) in facets"
    :key="'facet-' + index"
    :class="{'grey lighten-2': index % 2 === 0}"
  )
    v-expansion-panel-header {{facet.name}} - {{facet.buckets.length}}
  
    v-expansion-panel-content
      v-list(
        :class="{'grey lighten-2': index % 2 === 0}"
      )
        v-list-item-group
          v-list-item(
            v-for="(bucket, i) in facet.buckets"
            :key="'bucket-' + i"
            @click="$emit('bucket-select', facet.name, bucket.value)"
          )
            v-list-item-content {{bucket.value}}
            //v-list-item-content(v-text="bucketValue(bucket.value)")
            v-list-item-action
              v-list-item-action-text {{bucket.count}}
</template>

<script>

export default {

    name: "facet-buckets",

    props: ["facets"],

    // using computed for dynamic data.
    methods: {
        bucketValue: function(value) {
            console.log(value);
            return value;
        }
    }
}
</script>
