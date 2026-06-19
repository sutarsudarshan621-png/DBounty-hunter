// src/services/userService.js

import api from "../lib/api";

export const getUserProfile = async () => {
  return await api.get("/users/profile");
};

export const getUserByWallet = async (walletAddress) => {
  return await api.get(`/users/${walletAddress}`);
};

export const updateUserProfile = async (profileData) => {
  return await api.put("/users/profile", profileData);
};

export const getUserAchievements = async () => {
  return await api.get("/users/achievements");
};

export const getUserSubmissions = async () => {
  return await api.get("/users/submissions");
};