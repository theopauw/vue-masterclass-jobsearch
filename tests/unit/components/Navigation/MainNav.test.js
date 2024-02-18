import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import MainNav from "@/components/Navigation/MainNav.vue";
import { expect } from "vitest";

describe("MainNav", () => {
  const renderMainNav = () => {
    //make a testing pinia, still relying on real store
    const pinia = createTestingPinia({ stubActions: false });

    //this is not actually linked to vue-router
    //just a normal object with the same name prop
    const $route = {
      name: "Home",
    }
    render(MainNav, {
      global: {
        plugis: [pinia],
        mocks: {
          //ES6 shorthand
          $route,
        },
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

      let profileImage = screen.queryByRole("img", {
        name: /user profile image/i,
      });
      expect(profileImage).not.toBeInTheDocument();

      const loginButton = screen.getByRole("button", {
        name: /sign in/i,
      });
      await userEvent.click(loginButton);
      profileImage = screen.getByRole("img", {
        name: /user profile image/i,
      });
      expect(profileImage).toBeInTheDocument();
    });
  });
});
