<template lang="pug">
v-container(grid-list-md text-center)
  v-row
    v-col( col="3" )
      v-card
        v-card-text
          div Simple number clock
          p.display-1.text--primary {{ currentTime }}
    v-col( col="3" )
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

            currentTime: null
        };
    },

    methods: {
        updateCurrentTime() {

            this.currentTime = new Date();
        }
    },

    created() {
        this.currentTime = new Date();

        // setInterval is available here:
        // The interval is in MS
        setInterval( () => this.updateCurrentTime(), 1 * 1000 );
    }
}
</script>
