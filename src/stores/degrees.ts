import { defineStore } from "pinia";
import { computed, ref } from "vue";

import getDegrees from "@/api/getDegrees";
import type { Degree } from "@/api/types";

//use newer syntax for Pinia (compare to user and jobs store)
export const useDegreesStore = defineStore("degrees", () => {
  const degrees = ref<Degree[]>([]);

  const FETCH_DEGREES = async () => {
    const receivedDegrees = await getDegrees();
    degrees.value = receivedDegrees;
  };
  const UNIQUE_DEGREES = computed(() => degrees.value.map((degree) => degree.degree));

  return {
    degrees,
    FETCH_DEGREES,
    UNIQUE_DEGREES,
  };
});
