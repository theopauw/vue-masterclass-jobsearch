<template>
  <collapsible-accordion header="Organisations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="organisation in UNIQUE_ORGANISATIONS" :key="organisation" class="h-8 w-1/2">
            <input
              :id="organisation"
              v-model="selectedOrganisations"
              :value="organisation"
              type="checkbox"
              class="mr-3"
              @change="selectOrganisation"
            />
            <label :for="organisation">{{ organisation }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script>
import { mapActions, mapState } from "pinia";

import { useJobsStore, UNIQUE_ORGANISATIONS } from "@/stores/jobs";
import { useUserStore, ADD_SELECTED_ORGANISATIONS } from "@/stores/user";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

export default {
  name: "JobFiltersSidebarOrganisations",
  components: { CollapsibleAccordion },
  data() {
    return {
      selectedOrganisations: [],
    };
  },
  computed: {
    ...mapState(useJobsStore, [UNIQUE_ORGANISATIONS]),
  },
  methods: {
    ...mapActions(useUserStore, [ADD_SELECTED_ORGANISATIONS]),
    selectOrganisation() {
      this.ADD_SELECTED_ORGANISATIONS(this.selectedOrganisations);
    },
  },
};
</script>
