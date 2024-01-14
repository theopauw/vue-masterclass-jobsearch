import { render, screen } from "@testing-library/vue";

import MainNav from "@/components/MainNav.vue";
import { expect } from "vitest";

describe("MainNav", () => {
  it("displays company name", () => {
    render(MainNav);
    //check that text occurs only once
    //good to test just for the text, test should not care about too many details
    //e.g. should not test that we have an h1 containing text, then later we change el type
    const companyName = screen.getByText("Bobo Careers");
    //this is redundant as getByText would fail if not found
    //but good practise
    expect(companyName).toBeInTheDocument();
  });
  it("displays menu items for navigation", () => {
    render(MainNav);
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
});
