import { defineStore } from "pinia";

export const ADD_SELECTED_ORGANISATIONS = "ADD_SELECTED_ORGANISATIONS"
export const ADD_SELECTED_JOB_TYPES = "ADD_SELECTED_JOB_TYPES"

export interface UserState {
  isLoggedIn: boolean;
  selectedOrganisations: string[];
  selectedJobTypes: string[];
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    isLoggedIn: false,
    selectedOrganisations: [],
    selectedJobTypes: [],
  }),
  actions: {
    loginUser() {
      this.isLoggedIn = true;
    },
    [ADD_SELECTED_ORGANISATIONS](organisations: string[]) {
      this.selectedOrganisations = organisations;
    },
    [ADD_SELECTED_JOB_TYPES](jobTypes: string[]) {
      this.selectedJobTypes = jobTypes;
    },
  },
});
