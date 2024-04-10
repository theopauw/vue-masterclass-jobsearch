<template>
  <div class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4">
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <action-button text="Clear Filters" type="secondary"></action-button>
        </div>
      </div>
      <job-filters-sidebar-checkbox-group
        header="Degrees"
        :unique-values="UNIQUE_DEGREES"
        :action="userStore.ADD_SELECTED_DEGREES"
      />

      <job-filters-sidebar-checkbox-group
        header="Job Types"
        :unique-values="UNIQUE_JOB_TYPES"
        :action="userStore.ADD_SELECTED_JOB_TYPES"
      />
      <job-filters-sidebar-checkbox-group
        header="Organisations"
        :unique-values="UNIQUE_ORGANISATIONS"
        :action="userStore.ADD_SELECTED_ORGANISATIONS"
      />
    </section>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import ActionButton from "@/components/Shared/ActionButton.vue";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";

import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import { useDegreesStore } from "@/stores/degrees";

const jobsStore = useJobsStore();
const UNIQUE_ORGANISATIONS = computed(() => jobsStore.UNIQUE_ORGANISATIONS);
const UNIQUE_JOB_TYPES = computed(() => jobsStore.UNIQUE_JOB_TYPES);

const degreesStore = useDegreesStore();
const UNIQUE_DEGREES = computed(() => degreesStore.UNIQUE_DEGREES);

const userStore = useUserStore();
</script>
