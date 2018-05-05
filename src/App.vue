<template>
<div>
<ul>
      <span  v-for="item in menuItems"  class="menu-item" :key="item.title">
    
    <router-link  :to="item.link" >  {{ item.title }}   </router-link> 
    
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