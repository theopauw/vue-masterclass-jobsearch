import { defineStore } from "pinia";

export const ADD_SELECTED_ORGANISATIONS = "ADD_SELECTED_ORGANISATIONS"
export const ADD_SELECTED_JOB_TYPES = "ADD_SELECTED_JOB_TYPES"

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    selectedOrganisations: [],
    selectedJobTypes: [],
  }),
  actions: {
    loginUser() {
      this.isLoggedIn = true;
    },
    [ADD_SELECTED_ORGANISATIONS](organisations) {
      this.selectedOrganisations = organisations;
    },
    [ADD_SELECTED_JOB_TYPES](jobTypes) {
      this.selectedJobTypes = jobTypes;
    },
  },
});
