<template>
  <main-nav/>  
  <router-view />
</template>

<script>
import MainNav from "./components/Navigation/MainNav.vue";
export default {
  components: { MainNav },
  name: "App",
};
</script>
