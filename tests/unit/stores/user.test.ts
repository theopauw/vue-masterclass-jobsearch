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

  it("stores job types that the user would like to filter jobs by", () => {
    const store = useUserStore();
    expect(store.selectedJobTypes).toEqual([]);
  });

  it("stores degrees that the user would like to filter jobs by", () => {
    const store = useUserStore();
    expect(store.selectedDegrees).toEqual([]);
  });

  it("stores user's search term for skills and qualifications", () => {
    const store = useUserStore();
    expect(store.skillsSearchTerm).toBe("");
  })
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("LOGIN_USER", () => {
    it("logs the user in", () => {
      const store = useUserStore();
      store.LOGIN_USER();
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

  describe("ADD_SELECTED_JOB_TYPES", () => {
    it("updates job types the user has chosen to filter jobs by", () => {
      const store = useUserStore();
      store.ADD_SELECTED_JOB_TYPES(["Full-time", "Part-time"]);
      expect(store.selectedJobTypes).toEqual(["Full-time", "Part-time"]);
    });
  });

  describe("ADD_SELECTED_DEGREES", () => {
    it("updates degrees the user has chosen to filter jobs by", () => {
      const store = useUserStore();
      store.ADD_SELECTED_DEGREES(["Master's", "Bachelor's"]);
      expect(store.selectedDegrees).toEqual(["Master's", "Bachelor's"]);
    });
  });

  describe("UPDATE_SKILLS_SEARCH_TERM", () => {
    it("receives search term for skills the user has entered", () => {
      const store = useUserStore();
      store.skillsSearchTerm = "";
      store.UPDATE_SKILLS_SEARCH_TERM("Vue");
      expect(store.skillsSearchTerm).toBe("Vue");
    })
  })

  describe("CLEAR_USER_JOB_FILTER_SELECTIONS", () => {
    it("removes all job filters that user has chosen", () => {
      const store = useUserStore();
      store.selectedOrganisations = ["Org1", "Org2"];
      store.selectedJobTypes = ["Full-time", "Part-time"];
      store.selectedDegrees = ["Master's", "Bachelor's"];
      store.skillsSearchTerm = "Vue Developer";

      store.CLEAR_USER_JOB_FILTER_SELECTIONS();

      expect(store.selectedOrganisations).toEqual([]);
      expect(store.selectedJobTypes).toEqual([]);
      expect(store.selectedDegrees).toEqual([]);
      expect(store.skillsSearchTerm).toBe("");
    });
  });
});
