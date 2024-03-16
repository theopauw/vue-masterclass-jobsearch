import { useUserStore } from "@/stores/user";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe } from "vitest";

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("keeps track of whether user is logged in", () => {
    const store = useUserStore();
    expect(store.isLoggedIn).toBe(false);
  });

  it("stores organisations that the user would like to filter jobs by", () => {
    const store = useUserStore();
    expect(store.selectedOrganisations).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("loginUser", () => {
    it("logs the user in", () => {
      const store = useUserStore();
      store.loginUser();
      expect(store.isLoggedIn).toBe(true);
    });
  });

  describe("ADD_SELECTED_ORGANISATIONS", () => {
    it("updates organisations the user has chosen to filter jobs by", () => {
      const store = useUserStore();
      store.ADD_SELECTED_ORGANISATIONS(["Org1", "Org2"]);
      expect(store.selectedOrganisations).toEqual(["Org1", "Org2"]);
    });
  });
});
