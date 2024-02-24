import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing"
import { describe } from "vitest";

import JobListings from "@/components/JobResults/JobListings.vue";
import { useJobsStore } from "@/stores/jobs";

//mock axios so we don't need to deal with actual API
vi.mock("axios");

describe("JobListings", () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: "5",
      ...queryParams,
    },
  });

  const renderJobListings = ($route) => {
    const pinia = createTestingPinia();
    //stub out routerlink so we don't get warnings.
    render(JobListings, {
      global: {
        plugins: [pinia],
        mocks: {
          $route,
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
  };

  it("fetches jobs", () => {
    const $route = createRoute();

    renderJobListings($route);

    const jobStore = useJobsStore();
    //just test that this has been called, more detailed tests to be run on the store
    expect(jobStore.FETCH_JOBS).toHaveBeenCalled();
  });

  it("displays maximum of 10 jobs", async () => {
    const queryParams = { page: "1" };
    const $route = createRoute(queryParams);

    renderJobListings($route);
    const jobStore = useJobsStore();
    jobStore.jobs = Array(15).fill({});

    //find* methods are async - helpful here as we wait for "api"
    const jobListings = await screen.findAllByRole("listitem");
    expect(jobListings).toHaveLength(10);
  });

  describe("when params exclude page number", () => {
    it("displays page number 1", () => {
      const queryParams = { page: undefined };
      const $route = createRoute(queryParams);

      renderJobListings($route);

      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });

  describe("when params include page number", () => {
    it("displays page number", () => {
      const queryParams = { page: "3" };
      const $route = createRoute(queryParams);

      renderJobListings($route);

      expect(screen.getByText("Page 3")).toBeInTheDocument();
    });
  });

  describe("when the user is on first page", () => {
    it("does not show link to previous page", async () => {
      //axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      const queryParams = { page: "1" };
      const $route = createRoute(queryParams);

      renderJobListings($route);
      const jobStore = useJobsStore();
      jobStore.jobs = Array(15).fill({})

      //wait for the job listings to load
      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });
      expect(previousLink).not.toBeInTheDocument();
    });

    it("shows link to next page", async () => {
      //axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      const queryParams = { page: "1" };
      const $route = createRoute(queryParams);

      renderJobListings($route);
      const jobStore = useJobsStore();
      jobStore.jobs = Array(15).fill({})

      //wait for the job listings to load
      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).toBeInTheDocument();
    });
  });

  describe("when the user is on last page", () => {
    it("shows link to previous page", async () => {
      //axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      const queryParams = { page: "2" };
      const $route = createRoute(queryParams);

      renderJobListings($route);
      const jobStore = useJobsStore();
      jobStore.jobs = Array(15).fill({})

      //wait for the job listings to load
      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });
      expect(previousLink).toBeInTheDocument();
    });

    it("does not show link to next page", async () => {
      //axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      const queryParams = { page: "2" };
      const $route = createRoute(queryParams);

      renderJobListings($route);
      const jobStore = useJobsStore();
      jobStore.jobs = Array(15).fill({})

      //wait for the job listings to load
      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).not.toBeInTheDocument();
    });
  });
});
