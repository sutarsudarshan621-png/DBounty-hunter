// src/services/bountyService.js

import api from "../lib/api";
import mockBounties from "../lib/mockBounties";

export const getAllBounties = async () => {
  try {
    return await api.get("/bounties");
  } catch (error) {
    console.warn(
      "Backend unavailable, using mock data."
    );

    return mockBounties;
  }
};

export const getBountyById = async (id) => {
  try {
    return await api.get(`/bounties/${id}`);
  } catch (error) {
    return mockBounties.find(
      (bounty) => bounty.id === Number(id)
    );
  }
};

export const createBounty = async (data) => {
  return await api.post("/bounties", data);
};