import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import JobFiltersSidebarOrganisations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganisations.vue";
import { useJobsStore } from "@/stores/jobs";

describe("JobFiltersSidebarOrganisations", () => {
  it("renders unique list of organisations from jobs", async () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    jobsStore.UNIQUE_ORGANISATIONS = new Set(["Google", "Amazon"]);

    render(JobFiltersSidebarOrganisations, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    const button = screen.getByRole("button", { name: /organisations/i });
    await userEvent.click(button);

    const organisationListItems = screen.getAllByRole("listitem");
    const organisations = organisationListItems.map((node) => node.textContent);
    expect(organisations).toEqual(["Google", "Amazon"])
  });
});
