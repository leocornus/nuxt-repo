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

            // MDN time formatter:
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
            timeFormatter: new Intl.DateTimeFormat( 'en-US',
                // set options to only show current time.
                {
                    hour: 'numeric', minute: 'numeric', second: 'numeric',
                    // set to 24 hour format.
                    hour12: false
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
