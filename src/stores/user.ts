import { defineStore } from "pinia";

export const ADD_SELECTED_ORGANISATIONS = "ADD_SELECTED_ORGANISATIONS"
export const ADD_SELECTED_JOB_TYPES = "ADD_SELECTED_JOB_TYPES"
export const ADD_SELECTED_DEGREES = "ADD_SELECTED_DEGREES"
export const CLEAR_USER_JOB_FILTER_SELECTIONS = "CLEAR_USER_JOB_FILTER_SELECTIONS"

export interface UserState {
  isLoggedIn: boolean;
  selectedOrganisations: string[];
  selectedJobTypes: string[];
  selectedDegrees: string[];
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    isLoggedIn: false,
    selectedOrganisations: [],
    selectedJobTypes: [],
    selectedDegrees: [],
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
    [ADD_SELECTED_DEGREES](degrees: string[]) {
      this.selectedDegrees = degrees;
    },
    [CLEAR_USER_JOB_FILTER_SELECTIONS]() {
      this.selectedOrganisations = [];
      this.selectedJobTypes = [];
      this.selectedDegrees = [];
    },
  },
});
