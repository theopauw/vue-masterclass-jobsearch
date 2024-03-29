import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { describe } from "vitest";

import JobListings from "@/components/JobResults/JobListings.vue";
import { useJobsStore } from "@/stores/jobs";
import { useRoute } from "vue-router";

//mock axios so we don't need to deal with actual API
vi.mock("axios");
vi.mock("vue-router");

describe("JobListings", () => {
  const renderJobListings = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    jobsStore.FILTERED_JOBS = Array(15).fill({});
    //stub out routerlink so we don't get warnings.
    render(JobListings, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
    return { jobsStore };
  };

  it("fetches jobs", () => {
    useRoute.mockReturnValue({ query: {} });

    const { jobsStore } = renderJobListings();

    //just test that this has been called, more detailed tests to be run on the store
    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled();
  });

  it("displays maximum of 10 jobs", async () => {
    useRoute.mockReturnValue({ query: { page: "1" } });

    const { jobsStore } = renderJobListings();
    jobsStore.FILTERED_JOBS = Array(15).fill({});

    //find* methods are async - helpful here as we wait for "api"
    const jobListings = await screen.findAllByRole("listitem");
    expect(jobListings).toHaveLength(10);
  });

  describe("when params exclude page number", () => {
    it("displays page number 1", () => {
      useRoute.mockReturnValue({ query: {} });

      renderJobListings();

      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });

  describe("when params include page number", () => {
    it("displays page number", () => {
      useRoute.mockReturnValue({ query: { page: "3" } });

      renderJobListings();

      expect(screen.getByText("Page 3")).toBeInTheDocument();
    });
  });

  describe("when the user is on first page", () => {
    it("does not show link to previous page", async () => {
      useRoute.mockReturnValue({ query: { page: "1" } });

      const { jobsStore } = renderJobListings();

      jobsStore.FILTERED_JOBS = Array(15).fill({});

      //wait for the job listings to load
      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });
      expect(previousLink).not.toBeInTheDocument();
    });

    it("shows link to next page", async () => {
      useRoute.mockReturnValue({ query: { page: "1" } });

      const { jobsStore } = renderJobListings();
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      //wait for the job listings to load
      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).toBeInTheDocument();
    });
  });

  describe("when the user is on last page", () => {
    it("shows link to previous page", async () => {
      useRoute.mockReturnValue({ query: { page: "2" } });

      const { jobsStore } = renderJobListings();
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      //wait for the job listings to load
      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });
      expect(previousLink).toBeInTheDocument();
    });

    it("does not show link to next page", async () => {
      useRoute.mockReturnValue({ query: { page: "2" } });

      const { jobsStore } = renderJobListings();
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      //wait for the job listings to load
      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).not.toBeInTheDocument();
    });
  });
});
