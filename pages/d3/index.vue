<template lang="pug">
v-container(grid-list-md text-center)
  v-row
    v-col( col="3" )
      v-card
        v-card-text
          div Simple number clock
          p.display-1.text--primary Hello Clock
    v-col( col="3" )
      v-card
        v-card-text
          div Simple count down
          p.display-1.text--primary Hello Timer
    v-col( col="3" )
    v-col( col="3" )
</template>

<script>
export default {

    layout: 'vuetify',
    name: 'clocks',
    auth: false,

    data() {

        return {

        };
    }
}
</script>
