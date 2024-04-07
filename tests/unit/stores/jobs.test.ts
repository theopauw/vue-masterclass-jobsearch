import type { Mock } from "vitest";

import { createPinia, setActivePinia } from "pinia";
import axios from "axios";

import type { Job } from "@/api/types";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import { beforeEach, describe } from "vitest";

vi.mock("axios");
const axiosGetMock = axios.get as Mock;

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
      axiosGetMock.mockResolvedValue({ data: ["Job1", "Job2"] });
      const store = useJobsStore();
      await store.FETCH_JOBS();
      expect(store.jobs).toEqual(["Job1", "Job2"]);
    });
  });
});

describe("getters", () => {
  const createJob = (job: Partial<Job> = {}): Job => ({
    id: 1,
    title: "Angular Developer",
    organization: "Vue and Me",
    degree: "Master's",
    jobType: "Intern",
    locations: ["Lisbon"],
    minimumQualifications: ["Mesh granular deliverables"],
    preferredQualifications: ["Mesh wireless metrics"],
    description: ["Away someone forget effect wait land."],
    dateAdded: "2021-07-04",
    ...job,
  });

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("UNIQUE_ORGANISATIONS", () => {
    it("finds unique organisations from list of jobs", () => {
      const store = useJobsStore();
      store.jobs = [
        createJob({ organization: "Google" }),
        createJob({ organization: "Amazon" }),
        createJob({ organization: "Google" }),
      ];

      const result = store.UNIQUE_ORGANISATIONS;

      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });

  describe("UNIQUE_JOB_TYPES", () => {
    it("finds unique job types from list of jobs", () => {
      const store = useJobsStore();
      store.jobs = [
        createJob({ jobType: "Full-time" }),
        createJob({ jobType: "Temporary" }),
        createJob({ jobType: "Full-time" }),
      ];

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
        const job = createJob({ organization: "Google" });

        const result = jobsStore.INCLUDE_JOB_BY_ORGANISATION(job);

        expect(result).toBe(true);
      });
    });

    it("identifies if job is associated with given organisations", () => {
      const userStore = useUserStore();
      userStore.selectedOrganisations = ["Google", "Microsoft"];
      const jobsStore = useJobsStore();
      const job = createJob({ organization: "Google" });

      const result = jobsStore.INCLUDE_JOB_BY_ORGANISATION(job);

      expect(result).toBe(true);
    });
  });

  describe("INCLUDE_JOB_BY_JOB_TYPE", () => {
    describe("when the user has not selected any jobTypes", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        userStore.selectedJobTypes = [];
        const jobsStore = useJobsStore();
        const job = createJob({ jobType: "Full-time" }) as Job;

        const result = jobsStore.INCLUDE_JOB_BY_JOB_TYPE(job);

        expect(result).toBe(true);
      });
    });

    it("identifies if job is associated with given jobTypes", () => {
      const userStore = useUserStore();
      userStore.selectedJobTypes = ["Full-time", "Part-time"];
      const jobsStore = useJobsStore();
      const job = createJob({ jobType: "Full-time" });

      const result = jobsStore.INCLUDE_JOB_BY_JOB_TYPE(job);

      expect(result).toBe(true);
    });
  });
});
