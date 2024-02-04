import { render, screen } from "@testing-library/vue";

import TheSubnav from "@/components/Navigation/TheSubnav.vue";
import { describe, expect, it } from "vitest";

describe("TheSubnav", () => {
  const renderTheSubnav = (routeName) => {
    //this is not actually linked to vue-router
    //just a normal object with the same name prop
    const $route = {
      name: routeName,
    }
    render(TheSubnav, {
      global: {
        mocks: {
          //ES6 shorthand
          $route,
        },
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });
  };
  describe("when user is on jobs page", () => {
    it("displays job count", () => {
      const routeName = "JobResults";
      renderTheSubnav(routeName);
      const jobCount = screen.getByText("1653");
      expect(jobCount).toBeInTheDocument();
    });
  });

  describe("when user is not on jobs page", () => {
    it("Does NOT display job count", () => {
      const routeName = "Home";
      renderTheSubnav(routeName);
      const jobCount = screen.queryByText("1653");
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
