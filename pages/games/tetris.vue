<template lang="pug">
v-app
  div.grid
    canvas( ref="board" ).game-board
    div.right-column
      div
        h1 TETRIS
        p Score:
          span( id="score" ) 0
        p Lines:
          span( id="lines" ) 0
        p Level:
          span( id="level" ) 0
      v-btn(
        color="success"
        @click="play"
      ) Play
</template>

<script>

import { Piece } from '@/libs/tetris.js';

export default {

    layout: "vuetify",
    name: 'Tetris',
    auth: false,

    data() {
        return {
            // size of the game board.
            cols: 10,
            rows: 20,
            blockSize: 30
        }
    },

    /**
     * mounted is after DOM built!
     */
    mounted() {

        this.ctx = this.$refs.board.getContext('2d');
        //console.log(this.ctx);

        this.ctx.canvas.width = this.cols * this.blockSize;
        this.ctx.canvas.height = this.rows * this.blockSize;

        this.ctx.scale(this.blockSize, this.blockSize);

        // add the event lisenter for whole page.
        window.addEventListener('keydown', this.handleKeydown);
    },

    methods: {

        play() {

            this.grid = this.getEmptyBoard();
            console.table(this.grid);

            this.piece = new Piece(this.ctx);
            console.log(this.piece);

            this.piece.draw();
        },

        /**
         * handle key down event.
         */
        handleKeydown(event) {

            let self = this;

            switch(event.key) {
                // move left
                case "h":
                case "H":
                    self.moveLeft();
                    break;
                // move down.
                case "j":
                case "J":
                    self.moveDown(self.piece);
                    break;
                // move right
                case "l":
                case "L":
                    self.moveRight(self.piece);
                    break;
                default:
                    //console.log(event);
                    break;
            }
        },

        moveLeft() {

            this.piece.x -= 1;
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.piece.draw();
        },
        moveDown() {

            this.piece.y += 1;
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.piece.draw();
        },
        moveRight() {

            this.piece.x += 1;
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.piece.draw();
        },

        getEmptyBoard() {

            let self = this;

            return Array.from( {length: self.rows}, () => {
                return Array(self.cols).fill(0);
            });
        }
    }
}
</script>

<style lang="css">
* {
  font-family: 'Press Start 2P', cursive;
}

.grid {
  display: grid;
  grid-template-columns: 320px 200px;
}

.right-column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.game-board {
  border: solid 2px;
}

.play-button {
  background-color: #4caf50;
  font-size: 16px;
  padding: 15px 30px;
  cursor: pointer;
}
</style>
