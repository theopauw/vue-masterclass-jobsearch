import { useUserStore } from "@/stores/user";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe } from "vitest";

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("keeps track of whether user is logged in", () => {
    const store = useUserStore();
    expect(store.isLoggedIn).toBe(false);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("loginUser", () => {
    it("logs the user in", () => {
      const store = useUserStore();
      store.loginUser();
      expect(store.isLoggedIn).toBe(true);
    });
  });
});
