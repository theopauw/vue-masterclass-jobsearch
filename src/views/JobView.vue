<template>
  <div>Job Page for job {{ currentJobId }}</div>
</template>

<script>
export default {
  name: "JobView",
  computed: {
    currentJobId() {
      //return dynamic section of url path (which we named id in the route)
      return this.$route.params.id;
    }
  }
}
</script>

