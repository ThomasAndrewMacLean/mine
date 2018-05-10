<template>
    <section class="">
<section class="section"> 
  <div class="container">
    <h1 class="title">
            Settings
          </h1>
          <h2 class="subtitle">
            Set the number of cells in the game, and the amount of bombs.
          </h2>
    </div>
</section>
    <section class="hero is-light">
      <div class="hero-body">
        <div class="container">
         

    <div class="columns max-width is-mobile">
      <div class="column center">
      <button class="button is-dark is-outlined is-medium" v-on:click="addNumberBoardSize(-1)">-</button>
      </div>
       <div class="column center">
         {{boardSize}}
         </div> 
         <div class="column center">

      <button class="button is-dark is-outlined is-medium" v-on:click="addNumberBoardSize(+1)">+</button>
         </div>
    </div>
     <div class="columns max-width is-mobile level">
       <div class="column center">

      <button class="button is-dark is-outlined is-medium" v-on:click="addNumberOfBombs(-1)">-</button>
       </div>
       <div class="column center">

        {{numberOfBombs}}
       </div>
       <div class="column center">

      <button class="button is-outlined is-dark is-medium" v-on:click="addNumberOfBombs(+1)">+</button>
       </div>
    </div>
   
        </div>
      </div>
    </section>
    </section>
  
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
        this.save();
      }
    },
    addNumberOfBombs(number) {
      let tmp = this.numberOfBombs;
      let newNumber = (tmp += number);
      console.log(newNumber);

      if (newNumber > 1 && newNumber < this.boardSize) {
        console.log("save?");

        this.numberOfBombs = newNumber;
        this.save();
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
.max-width {
  max-width: 300px;
  margin: auto;
}
</style>