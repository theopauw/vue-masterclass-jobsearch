import { defineStore } from "pinia";
import getJobs from "@/api/getJobs";

//do this so we can use this const name in mapActions later
//in stead of the raw string, where we could make a typo
export const FETCH_JOBS = "FETCH_JOBS";

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
});
