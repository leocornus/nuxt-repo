<template lang="pug">
v-container(grid-list-md text-center)
  v-row
    v-col( col="3" )
      v-card
        v-card-text
          div Simple number clock
          p.display-1.text--primary {{ timeFormatter.format(currentTime) }}
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

            currentTime: null,

            // MDN time formatter.
            timeFormatter: new Intl.DateTimeFormat( 'en-US',
                {
                    hour: 'numeric', minute: 'numeric', second: 'numeric',
                    hour12: true
                }
            )
        };
    },

    methods: {

        updateCurrentTime() {

            this.currentTime = new Date();
        },

        /**
         * for each clock tick
         */
        clockTick() {

            this.updateCurrentTime();
        }
    },

    created() {

        this.currentTime = new Date();

        // setInterval is available here:
        // The interval is in MS
        setInterval( () => this.clockTick(), 1 * 1000 );
    }
}
</script>
