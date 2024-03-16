import { createPinia, setActivePinia } from "pinia";
import axios from "axios";

import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import { beforeEach, describe } from "vitest";

vi.mock("axios");

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("stores job listings", () => {
    const store = useJobsStore();
    expect(store.jobs).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("FETCH_JOBS", () => {
    it("makes api request and stores received jobs", async () => {
      axios.get.mockResolvedValue({ data: ["Job1", "Job2"] });
      const store = useJobsStore();
      await store.FETCH_JOBS();
      expect(store.jobs).toEqual(["Job1", "Job2"]);
    });
  });
});

describe("getters", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("UNIQUE_ORGANISATIONS", () => {
    it("finds unique organisations from list of jobs", () => {
      const store = useJobsStore();
      store.jobs = [
        { organization: "Google" },
        { organization: "Amazon" },
        { organization: "Google" },
      ];

      const result = store.UNIQUE_ORGANISATIONS;

      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });
  describe("FILTERED_JOBS_BY_ORGANISATIONS", () => {
    it("identifies jobs that are associated with the given organisations", () => {
      const jobsStore = useJobsStore();
      jobsStore.jobs = [
        { organization: "Google" },
        { organization: "Amazon" },
        { organization: "Microsoft" },
      ];
      const userStore = useUserStore();
      userStore.selectedOrganisations = ["Google", "Microsoft"];

      const result = jobsStore.FILTERED_JOBS_BY_ORGANISATIONS;

      expect(result).toEqual([{ organization: "Google" }, { organization: "Microsoft" }]);
    });
    describe("when the user has not selected any organisations", () => {
      it("identifies jobs that are associated with the given organisations", () => {
        const jobsStore = useJobsStore();
        jobsStore.jobs = [
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Microsoft" },
        ];
        const userStore = useUserStore();
        userStore.selectedOrganisations = [];

        const result = jobsStore.FILTERED_JOBS_BY_ORGANISATIONS;

        expect(result).toEqual([
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Microsoft" },
        ]);
      });
    });
  });
});
