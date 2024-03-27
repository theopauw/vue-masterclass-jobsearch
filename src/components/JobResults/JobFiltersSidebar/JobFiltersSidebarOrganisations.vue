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

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

const selectedOrganisations = ref([]);

const jobsStore = useJobsStore();
const UNIQUE_ORGANISATIONS = computed(() => jobsStore.UNIQUE_ORGANISATIONS);

const userStore = useUserStore();
const router = useRouter();

const selectOrganisation = () => {
  userStore.ADD_SELECTED_ORGANISATIONS(selectedOrganisations.value);
  router.push({ name: "JobResults" });
};

// export default {
//   methods: {
//     ...mapActions(useUserStore, [ADD_SELECTED_ORGANISATIONS]),
//     selectOrganisation() {
//       this.ADD_SELECTED_ORGANISATIONS(this.selectedOrganisations);
//     },
//   },
// };
</script>
