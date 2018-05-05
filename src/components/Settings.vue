<template>
  <div class="main">
 <button v-on:click="addNumberBoardSize(-1)">-</button>
 {{boardSize}}
 <button v-on:click="addNumberBoardSize(+1)">+</button>
  <button v-on:click="addNumberOfBombs(-1)">-</button>
 {{numberOfBombs}}
 <button v-on:click="addNumberOfBombs(+1)">+</button>
 

 <button v-on:click="save()">SAVE</button>
 </div>
</template>

<script>
export default {
  name: "Game",
  data() {
    return {
      boardSize: 0,
      numberOfBombs: 0
    };
  },
  methods: {
    addNumberBoardSize(number) {
      let sqr = Math.sqrt(this.boardSize);
      sqr += number;
      if (sqr > 3 && sqr < 12) {
        this.boardSize = sqr * sqr;
        this.numberOfBombs = sqr + 2;
      }
    },
    addNumberOfBombs(number) {
      let tmp = this.numberOfBombs;
      let newNumber = (tmp += number);
      console.log(newNumber);

      if (newNumber > 1 && newNumber < this.boardSize) {
        console.log("save?");

        this.numberOfBombs = newNumber;
      }
    },
    save() {
      localStorage.setItem("boardSize", this.boardSize);
      localStorage.setItem("numberOfBombs", this.numberOfBombs);
    }
  },
  mounted() {
    this.boardSize = parseInt(localStorage.getItem("boardSize"), 10) || 64;
    this.numberOfBombs =
      parseInt(localStorage.getItem("numberOfBombs"), 10) || 10;
  }
};
</script>

<style>

</style>