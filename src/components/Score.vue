<template>
  <div class="main">

<div v-for="s in scores" :key="s.id">
 {{s.name}} : {{s.score}}
</div>
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
      "https://mjbwnqaj06.execute-api.eu-west-1.amazonaws.com/prod/gethighscores"
    )
      .then(res => res.json())
      .then(r => {
        this.scores = r.Items;
      });
  }
};
</script>

<style>

</style>