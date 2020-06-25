<template lang="pug">
div.container.boder
  div(id="p5Canvas").d-flex.justify-content-center
</template>

<script>
export default {

    name: "p5Sketch",
    auth: false,

    data() {
        return {
        };
    },

    methods: {
    },

    mounted() {   

        const script = function (p5) {    

            // NOTE: Set up is here   
            p5.setup = _ => {      
                let canvas = p5.createCanvas(500, 500);      
                canvas.parent("p5Canvas");
                p5.background(220);
            }

            // NOTE: Draw is here
            // 60 times a second
            p5.draw = _ => {      

                p5.circle(p5.mouseX, p5.mouseY, 20);
            }  
        }

        // NOTE: Use p5 as an instance mode
        const P5 = require('p5');
        new P5(script);
    }
}
</script>
