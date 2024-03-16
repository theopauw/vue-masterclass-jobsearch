import { defineStore } from "pinia";

export const ADD_SELECTED_ORGANISATIONS = "ADD_SELECTED_ORGANISATIONS"

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    selectedOrganisations: [],
  }),
  actions: {
    loginUser() {
      this.isLoggedIn = true;
    },
    [ADD_SELECTED_ORGANISATIONS](organisations) {
      this.selectedOrganisations = organisations;
    },
  },
});
