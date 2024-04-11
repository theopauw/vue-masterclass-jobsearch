<template>
  <job-filters-sidebar-checkbox-group
    :unique-values="UNIQUE_ORGANISATIONS"
    :action="userStore.ADD_SELECTED_ORGANISATIONS"
  />
</template>
<script lang="ts" setup>
import { computed } from "vue";

import JobFiltersSidebarCheckboxGroup from "./JobFiltersSidebarCheckboxGroup.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

const jobsStore = useJobsStore();
const UNIQUE_ORGANISATIONS = computed(() => jobsStore.UNIQUE_ORGANISATIONS);

const userStore = useUserStore();
</script>
