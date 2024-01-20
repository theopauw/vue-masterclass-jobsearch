<template>
  <main-nav />
  <the-hero />
</template>

<script>
import MainNav from "@/components/MainNav.vue";
import TheHero from "@/components/TheHero.vue";

export default {
  name: "App",
  components: {
    //ES6 shorthand for MainNav: MainNav
    MainNav,
    TheHero,
  },
};
</script>
