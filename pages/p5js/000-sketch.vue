<template lang="pug">
v-container(grid-list-md)
  v-row
    v-col(cols="3")
      v-text-field(
        v-model="background"
        label="Background Color"
        outlined
      )
      v-btn(@click="update") Update
    v-col(cols="9")
      div(id="p5Canvas").d-flex.justify-content-center
</template>

<script>
export default {

    layout: 'vuetify',
    name: "p5Sketch",
    auth: false,

    data() {
        return {
            background: 220,
            circleSize: 20
        };
    },

    methods: {

        update() {

            // TODO: remove the existing canvas.

            const P5 = require('p5');
            new P5(this.script);
        }
    },

    mounted() {

        let self = this;

        self.script = function (p5) {

            p5.remove();

            // NOTE: Set up is here   
            p5.setup = _ => {
                let canvas = p5.createCanvas(500, 500);
                canvas.parent("p5Canvas");
                p5.background(self.background);
            }

            // NOTE: Draw is here
            // 60 times a second
            p5.draw = _ => {      

                p5.circle(p5.mouseX, p5.mouseY, self.circleSize);
            }  
        }

        // NOTE: Use p5 as an instance mode
        const P5 = require('p5');
        new P5(self.script);
    }
}
</script>
