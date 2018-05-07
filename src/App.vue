<template>
<div>
  <ul>
    <span  v-for="item in menuItems"  class="menu-items" :key="item.title">
      <router-link class="menu-item" :to="item.link" >  {{ item.title }}   </router-link>   
    </span>
  </ul>

  <router-view class="router-view"></router-view>
</div>
 
</template>

<script>
export default {
  data() {
    return {
      //user: this.$store.user,
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        { title: "Game", link: "/Game" },
        { title: "Settings", link: "/Settings" },
        { title: "High Scores", link: "/Scores" }
      ];
      return menuItems;
    }
  }
};
</script>

<style>
.menu-items {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  z-index: 666;
}

ul {
  display: flex;
  justify-content: space-around;
}

.menu-item {
  text-decoration: none;
  line-height: 50px;
  padding:0 20px;
  border-radius: 2px;
  color:white;
  border: 2px solid lightgreen;
}
.router-link-active {
  background: lightgreen;
  border: 2px solid white;
  color:#666;
}
</style>
