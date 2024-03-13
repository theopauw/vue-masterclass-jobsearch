<template>
  <collapsible-accordion header="Organisations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="organisation in UNIQUE_ORGANISATIONS" :key="organisation" class="h-8 w-1/2">
            <input :id="organisation" type="checkbox" class="mr-3" />
            <label :for="organisation">{{ organisation }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script>
import { mapState } from "pinia";

import { useJobsStore, UNIQUE_ORGANISATIONS } from "@/stores/jobs";

import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

export default {
  name: "JobFiltersSidebarOrganisations",
  components: { CollapsibleAccordion },
  computed: {
    ...mapState(useJobsStore, [UNIQUE_ORGANISATIONS])
  }
};
</script>
