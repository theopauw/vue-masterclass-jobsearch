import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import { describe, expect, it } from "vitest";

import TheSubnav from "@/components/Navigation/TheSubnav.vue";
import { useJobsStore } from "@/stores/jobs";

describe("TheSubnav", () => {
  const renderTheSubnav = (routeName) => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();

    //this is not actually linked to vue-router
    //just a normal object with the same name prop
    const $route = {
      name: routeName,
    };
    render(TheSubnav, {
      global: {
        plugins: [pinia],
        mocks: {
          //ES6 shorthand
          $route,
        },
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { jobsStore };
  };
  
  describe("when user is on jobs page", () => {
    it("displays job count", async () => {
      const routeName = "JobResults";

      const { jobsStore } = renderTheSubnav(routeName);
      const numberOfJobs = 16;
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});

      const jobCount = await screen.findByText(numberOfJobs);
      expect(jobCount).toBeInTheDocument();
    });
  });

  describe("when user is not on jobs page", () => {
    it("Does NOT display job count", () => {
      const routeName = "Home";
      
      const { jobsStore } = renderTheSubnav(routeName);
      const numberOfJobs = 16;
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});

      const jobCount = screen.queryByText(numberOfJobs);
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
