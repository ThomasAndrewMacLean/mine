<template>
  <div class="main">
    <ol>
      <li v-for="s in scores" :key="s.id">
      {{s.name}} : {{s.score}}
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "Game",
  data() {
    return {
      scores: []
    };
  },
  methods: {
    signUserIn() {}
  },
  mounted() {
    fetch(
      "https://mjbwnqaj06.execute-api.eu-west-1.amazonaws.com/prod/gethighscores?limit=10"
    )
      .then(res => res.json())
      .then(r => {
        this.scores = r.filter(i => i.name).sort((a, b) => a.score < b.score);
      });
  }
};
</script>

<style>
li {
  padding: 20px;
}
</style>