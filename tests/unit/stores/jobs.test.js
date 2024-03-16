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

  describe("UNIQUE_JOB_TYPES", () => {
    it("finds unique job types from list of jobs", () => {
      const store = useJobsStore();
      store.jobs = [{ jobType: "Full-time" }, { jobType: "Temporary" }, { jobType: "Full-time" }];

      const result = store.UNIQUE_JOB_TYPES;

      expect(result).toEqual(new Set(["Full-time", "Temporary"]));
    });
  });

  describe("INCLUDE_JOB_BY_ORGANISATION", () => {
    describe("when the user has not selected any organisations", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        userStore.selectedOrganisations = [];
        const jobsStore = useJobsStore();
        const job = { organization: "Google" };

        const result = jobsStore.INCLUDE_JOB_BY_ORGANISATION(job);

        expect(result).toBe(true);
      });
    });

    it("identifies if job is associated with given organisations", () => {
        const userStore = useUserStore();
        userStore.selectedOrganisations = ["Google", "Microsoft"];
        const jobsStore = useJobsStore();
        const job = { organization: "Google" };

        const result = jobsStore.INCLUDE_JOB_BY_ORGANISATION(job);

        expect(result).toBe(true);
    })
  });
  
  describe("INCLUDE_JOB_BY_JOB_TYPE", () => {
    describe("when the user has not selected any jobTypes", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        userStore.selectedJobTypes = [];
        const jobsStore = useJobsStore();
        const job = { jobType: "Full-time" };

        const result = jobsStore.INCLUDE_JOB_BY_JOB_TYPE(job);

        expect(result).toBe(true);
      });
    });

    it("identifies if job is associated with given jobTypes", () => {
        const userStore = useUserStore();
        userStore.selectedJobTypes = ["Full-time", "Part-time"];
        const jobsStore = useJobsStore();
        const job = { jobType: "Full-time" };

        const result = jobsStore.INCLUDE_JOB_BY_JOB_TYPE(job);

        expect(result).toBe(true);
    })
  });
});
