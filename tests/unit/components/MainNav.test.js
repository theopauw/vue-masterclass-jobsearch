import { render, screen } from "@testing-library/vue";

import MainNav from "@/components/MainNav.vue";

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
});
