<template lang="pug">
v-app
  div.grid
    canvas( id="board" ).game-board
    div.right-column
      div
        h1 TETRIS
        p Score:
          span( id="score" ) 0
        p Lines:
          span( id="lines" ) 0
        p Level:
          span( id="level" ) 0
      v-btn Play
</template>

<script>
export default {

    auth: false
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
