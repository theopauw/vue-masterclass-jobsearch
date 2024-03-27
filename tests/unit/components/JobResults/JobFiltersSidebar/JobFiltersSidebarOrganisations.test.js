import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import { useRouter } from "vue-router";
vi.mock("vue-router");

import JobFiltersSidebarOrganisations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganisations.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

describe("JobFiltersSidebarOrganisations", () => {
  const renderJobFiltersSidebarOrganisations = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    const userStore = useUserStore();

    render(JobFiltersSidebarOrganisations, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { jobsStore, userStore };
  };
  it("renders unique list of organisations from jobs", async () => {
    useRouter.mockReturnValue({ push: vi.fn() });
    const { jobsStore } = renderJobFiltersSidebarOrganisations();

    jobsStore.UNIQUE_ORGANISATIONS = new Set(["Google", "Amazon"]);

    const button = screen.getByRole("button", { name: /organisations/i });
    await userEvent.click(button);

    const organisationListItems = screen.getAllByRole("listitem");
    const organisations = organisationListItems.map((node) => node.textContent);
    expect(organisations).toEqual(["Google", "Amazon"]);
  });

  describe("when user clicks textbox", () => {
    it("communicates that user has selected checkbox for organisation", async () => {
      const { jobsStore, userStore } = renderJobFiltersSidebarOrganisations();

      jobsStore.UNIQUE_ORGANISATIONS = new Set(["Google", "Amazon"]);

      const button = screen.getByRole("button", { name: /organisations/i });
      await userEvent.click(button);

      const googleCheckbox = screen.getByRole("checkbox", {
        name: /google/i,
      });
      await userEvent.click(googleCheckbox);

      expect(userStore.ADD_SELECTED_ORGANISATIONS).toHaveBeenCalledWith(["Google"]);
    });

    it("navigates user to job results page to see fresh batch of filtered jobs", async () => {
      const push = vi.fn();
      useRouter.mockReturnValue({ push });

      const { jobsStore } = renderJobFiltersSidebarOrganisations();

      jobsStore.UNIQUE_ORGANISATIONS = new Set(["Google"]);

      const button = screen.getByRole("button", { name: /organisations/i });
      await userEvent.click(button);

      const googleCheckbox = screen.getByRole("checkbox", {
        name: /google/i,
      });
      await userEvent.click(googleCheckbox);

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
