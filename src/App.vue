<template>
<div>
  <div class="navbar is-primary">
    <div class="navbar-brand">
      <a class="navbar-item" href="#/Game">Mine</a>
      <div class="navbar-burger" @click="showNav = !showNav" :class="{ 'is-active': showNav }"  >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </div>
    </div>
    <div class="navbar-menu" :class="{ 'is-active': showNav }">
      <div class="navbar-end">
        <a  v-for="item in menuItems" @click="showNav = false"  class="navbar-item"  :key="item.title" :href="item.link">
            {{ item.title }} 
        </a>
      </div>
    </div>
  </div>
  
  <router-view></router-view>
</div>
 
</template>

<script>
export default {
  data() {
    return {
      //user: this.$store.user,
      showNav: false
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        { title: "Settings", link: "#/Settings" },
        { title: "High Scores", link: "#/Scores" }
      ];
      return menuItems;
    }
  }
};
</script>

<style>
.menu-item {
  color: white;
}
.is-active a {
  color: #4a4a4a !important;
}
</style>
