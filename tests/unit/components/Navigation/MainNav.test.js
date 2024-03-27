import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { expect } from "vitest";

import { useRoute } from "vue-router";
vi.mock("vue-router");

import MainNav from "@/components/Navigation/MainNav.vue";
import { useUserStore } from "@/stores/user";

describe("MainNav", () => {
  const renderMainNav = () => {
    useRoute.mockReturnValue({ name: "Home" });
    //make a testing pinia, still relying on real store
    const pinia = createTestingPinia();

    render(MainNav, {
      global: {
        plugis: [pinia],
        stubs: {
          FontAwesomeIcon: true,
          //RouterLinkStub has additional functionality to help the tests
          RouterLink: RouterLinkStub,
        },
      },
    });
  };
  it("displays company name", () => {
    renderMainNav();
    //check that text occurs only once
    //good to test just for the text, test should not care about too many details
    //e.g. should not test that we have an h1 containing text, then later we change el type
    const companyName = screen.getByText("Bobo Careers");
    //this is redundant as getByText would fail if not found
    //but good practise
    expect(companyName).toBeInTheDocument();
  });
  it("displays menu items for navigation", () => {
    renderMainNav();
    const navigationMenuItems = screen.getAllByRole("listitem");
    const navigationMenuTexts = navigationMenuItems.map((item) => item.textContent);
    //toBe would expect exactly the same array as in memory
    expect(navigationMenuTexts).toEqual([
      "Teams",
      "Locations",
      "Life at Bobo Corp",
      "How we hire",
      "Students",
      "Jobs",
    ]);
  });
  describe("when the user logs in", () => {
    it("displays user profile picture", async () => {
      renderMainNav();
      const userStore = useUserStore();

      let profileImage = screen.queryByRole("img", {
        name: /user profile image/i,
      });
      expect(profileImage).not.toBeInTheDocument();

      const loginButton = screen.getByRole("button", {
        name: /sign in/i,
      });
      //set login state manually as the test does not have access to the real Pinia store
      //Pinia testing allows to set store state directly without actions
      userStore.isLoggedIn = true;
      await userEvent.click(loginButton);
      profileImage = screen.getByRole("img", {
        name: /user profile image/i,
      });
      expect(profileImage).toBeInTheDocument();
    });
  });
});
