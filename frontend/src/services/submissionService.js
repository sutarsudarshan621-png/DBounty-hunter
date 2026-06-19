// src/services/submissionService.js

import api from "../lib/api";

export const createSubmission = async (submissionData) => {
  return await api.post("/submissions", submissionData);
};

export const getSubmissionById = async (id) => {
  return await api.get(`/submissions/${id}`);
};

export const getMySubmissions = async () => {
  return await api.get("/submissions/my");
};

export const getBountySubmissions = async (bountyId) => {
  return await api.get(`/bounties/${bountyId}/submissions`);
};

export const updateSubmissionStatus = async (id, status) => {
  return await api.patch(`/submissions/${id}/status`, {
    status,
  });
};