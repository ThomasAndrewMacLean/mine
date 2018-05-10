<template>
  <section >
    <div class="section is-hidden-mobile"></div>
    <div class="container center cols">  
        <canvas class="noselect" id="canvas" width="350" height="400"></canvas>
        <div class="section">
          <button class="noselect button is-primary is-medium is-outlined" v-on:click="newGame()">new game</button>
        </div>
    </div>     
    <div :class="{ 'is-active': showModal }" class="modal">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Save Score ({{Math.round(score * 100) / 100}}) {{score}}</p>
      <button class="delete" aria-label="close" v-on:click="showModal = false"></button>
    </header>
    <section class="modal-card-body">
<input class="input" type="text" placeholder="Name" v-model="name">
  
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success" :disabled="name===''" v-on:click="saveHighScore()">Save</button>
      <button class="button" v-on:click="showModal = false">Cancel</button>
    </footer>
  </div>
</div>
  </section>
</template>

<script>
import Board from "./../board/board";

export default {
  name: "Game",
  data() {
    return {
      board: null,
      score: 0,
      name: "",
      showModal: false
    };
  },
  methods: {
    newGame() {
      this.board.newGame();
    },
    saveHighScore() {
      this.showModal = false;
      localStorage.setItem("name", this.name);

      fetch(
        "https://mjbwnqaj06.execute-api.eu-west-1.amazonaws.com/prod/sethighscore",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },

          method: "POST",
          body: JSON.stringify({
            name: this.name,
            score: this.score
          })
        }
      )
        .then(response => {
          return response.json();
        })
        .catch(error => {
          return error;
        });
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
.cols {
  flex-direction: column;
}
</style>
