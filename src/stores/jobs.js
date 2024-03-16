import { defineStore } from "pinia";
import getJobs from "@/api/getJobs";
import { useUserStore } from "@/stores/user";

//do this so we can use this const name in mapActions later
//in stead of the raw string, where we could make a typo
export const FETCH_JOBS = "FETCH_JOBS";
export const UNIQUE_ORGANISATIONS = "UNIQUE_ORGANISATIONS";
export const FILTERED_JOBS_BY_ORGANISATIONS = "FILTERED_JOBS_BY_ORGANISATIONS";

export const useJobsStore = defineStore("jobs", {
  state: () => ({
    jobs: [],
  }),
  actions: {
    async [FETCH_JOBS]() {
      const jobs = await getJobs();
      this.jobs = jobs;
    },
  },
  getters: {
    [UNIQUE_ORGANISATIONS](state) {
      const uniqueOrganisations = new Set();
      state.jobs.forEach((job) => uniqueOrganisations.add(job.organization));
      return uniqueOrganisations;
    },
    [FILTERED_JOBS_BY_ORGANISATIONS](state) {
      const userStore = useUserStore();

      if (userStore.selectedOrganisations.length === 0) {
        return state.jobs;
      }

      return state.jobs.filter((job) => userStore.selectedOrganisations.includes(job.organization));
    },
  },
});
