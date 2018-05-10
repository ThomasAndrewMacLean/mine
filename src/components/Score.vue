<template>
<div class="section">
  <div class="container">
      <div class="title">High Scores</div>
      <div class="center">
      <button class="button is-loading is-large is-primary is-outlined" v-if="isLoading"></button>
      </div>
    <div class="notification" v-for="(s,i) in scores" :key="s.id">
     {{i+1}}. {{s.name}} : <strong>{{Math.round(s.score * 100) / 100}}</strong> points
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Game",
  data() {
    return {
      scores: [],
      isLoading: true
    };
  },
  methods: {
    signUserIn() {}
  },
  mounted() {
    fetch(
      "https://mjbwnqaj06.execute-api.eu-west-1.amazonaws.com/prod/gethighscores?limit=5"
    )
      .then(res => res.json())
      .then(r => {
        this.scores = r.filter(i => i.name).sort((a, b) => a.score < b.score);
        this.isLoading = false;
      });
  }
};
</script>

<style>

</style>