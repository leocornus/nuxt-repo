<template lang="pug">
v-card
  v-card-title( class="headline" )
    | Search settings

  v-card-text
    | we will have a comprehensive settings list here.

  v-card-actions
    v-spacer
    v-btn( color="green darken-1" text
      @click="cancelSettings"
    ) cancel
    v-btn( color="green darken-1" text
      @click="saveSettings"
    ) save

</template>

<script>

export default {
    name: "dialog-settings",

    // set the properties for this component.
    props: {
        'cancelSettings': null,
        'saveSettings': null
    }
}
</script>
