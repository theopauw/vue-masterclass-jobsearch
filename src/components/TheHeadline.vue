<template>
  <section>
    <h1>Build for everyone</h1>
    <h2>Find your next job at Bobo Corp</h2>
  </section>
</template>

<script>
export default {
  name: "TheHeadline",
  data() {
    return {
      sample: "Hello!",
    };
  },
  created() {
    console.log("hey I have been create", this.sample);
  },
};
</script>
