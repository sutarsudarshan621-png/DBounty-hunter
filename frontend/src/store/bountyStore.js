// src/store/bountyStore.js

import { create } from "zustand";

const useBountyStore = create((set) => ({
  selectedBounty: null,

  setSelectedBounty: (bounty) =>
    set({
      selectedBounty: bounty,
    }),

  clearSelectedBounty: () =>
    set({
      selectedBounty: null,
    }),
}));

export default useBountyStore;