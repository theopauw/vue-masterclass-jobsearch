import { ref } from "vue";
import { defineStore } from "pinia";

export const ADD_SELECTED_ORGANISATIONS = "ADD_SELECTED_ORGANISATIONS";
export const ADD_SELECTED_JOB_TYPES = "ADD_SELECTED_JOB_TYPES";
export const ADD_SELECTED_DEGREES = "ADD_SELECTED_DEGREES";
export const CLEAR_USER_JOB_FILTER_SELECTIONS = "CLEAR_USER_JOB_FILTER_SELECTIONS";

export const useUserStore = defineStore("user", () => {
  const isLoggedIn = ref(false);
  const selectedOrganisations = ref<string[]>([]);
  const selectedJobTypes = ref<string[]>([]);
  const selectedDegrees = ref<string[]>([]);

  const LOGIN_USER = () => {
    isLoggedIn.value = true;
  };

  const ADD_SELECTED_ORGANISATIONS = (organisations: string[]) => {
    selectedOrganisations.value = organisations;
  };

  const ADD_SELECTED_JOB_TYPES = (jobTypes: string[]) => {
    selectedJobTypes.value = jobTypes;
  };

  const ADD_SELECTED_DEGREES = (degrees: string[]) => {
    selectedDegrees.value = degrees;
  };

  const CLEAR_USER_JOB_FILTER_SELECTIONS = () => {
    selectedOrganisations.value = [];
    selectedJobTypes.value = [];
    selectedDegrees.value = [];
  };

  return {
    isLoggedIn,
    selectedOrganisations,
    selectedJobTypes,
    selectedDegrees,
    LOGIN_USER,
    ADD_SELECTED_ORGANISATIONS,
    ADD_SELECTED_JOB_TYPES,
    ADD_SELECTED_DEGREES,
    CLEAR_USER_JOB_FILTER_SELECTIONS,
  };
});
