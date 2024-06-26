import axios from "axios";
import { createPinia, setActivePinia } from "pinia";
import { type Mock, beforeEach, describe } from "vitest";

import { useDegreesStore } from "@/stores/degrees";
import { createDegree } from "../../utils/createDegree";

vi.mock("axios");
const axiosGetMock = axios.get as Mock;

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("stores all degrees that jobs may require", () => {
    const store = useDegreesStore();
    expect(store.degrees).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("FETCH_JOBS", () => {
    it("makes api request and stores received degrees", async () => {
      axiosGetMock.mockResolvedValue({
        data: [
          {
            id: 1,
            degree: "Bachelor's",
          },
        ],
      });

      const store = useDegreesStore();
      await store.FETCH_DEGREES();
      expect(store.degrees).toEqual([
        {
          id: 1,
          degree: "Bachelor's",
        },
      ]);
    });
  });
});

describe("getters", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("UNIQUE_DEGREES", () => {
    it("finds unique degrees from list of degrees", () => {
      const store = useDegreesStore();
      store.degrees = [
        createDegree({ degree: "Master's" }),
        createDegree({ degree: "Bachelor's" }),
      ];

      const result = store.UNIQUE_DEGREES;

      expect(result).toEqual(["Master's", "Bachelor's"]);
    });
  });
});
