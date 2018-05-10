<template>
    <div class="">
      
        <canvas class="noselect " id="canvas" width="350" height="400"></canvas>
        <button class="noselect button is-primary is-medium is-outlined" v-on:click="newGame()">new game</button>
      
    </div>
</template>

<script>
import Board from "./../board/board";

export default {
  name: "Game",
  data() {
    return {
      board: ""
    };
  },
  methods: {
    newGame() {
      this.board.newGame();
    }
  },
  mounted() {
    const boardSize = parseInt(localStorage.getItem("boardSize"), 10) || 64;
    const numberOfBombs =
      parseInt(localStorage.getItem("numberOfBombs"), 10) || 10;

    this.board = new Board(boardSize, Math.sqrt(boardSize), 50, numberOfBombs);

    const gameLoop = () => {
      window.requestAnimationFrame(gameLoop);
      this.board.setTimer();
    };

    const click = e => {
      this.board.getCellByClick(e);
    };

    const newGame = () => {
      this.board.newGame();

      gameLoop();
    };

    this.board.canvas.addEventListener("click", click);
    if (typeof this.board.canvas.getContext !== undefined) {
      newGame();
    }
  }
};
</script>

<style>

</style>
