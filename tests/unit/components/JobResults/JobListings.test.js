import { render, screen } from "@testing-library/vue";
import axios from "axios";

import JobListings from "@/components/JobResults/JobListings.vue";
import {RouterLinkStub} from "@vue/test-utils";

//mock axios so we don't need to deal with actual API
vi.mock("axios");

describe("JobListings", () => {
  it("fetches jobs", () => {
    //mock axios to return obj with data property (doesn't need contents for this test)
    axios.get.mockResolvedValue({ data: [] });
    render(JobListings);
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/jobs");
  });

  it("displays maximum of 10 jobs", async () => {
    //mock axios to return array of 15 empty objects
    axios.get.mockResolvedValue({ data: Array(15).fill({}) });
    
    //stub out routerlink so we don't get warnings.
    render(JobListings, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });
    
    //find* methods are async - helpful here as we wait for "api"
    const jobListings = await screen.findAllByRole("listitem");
    expect(jobListings).toHaveLength(10);
  });
});
