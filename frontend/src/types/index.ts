export interface Bounty {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  rewardAmount: string;
  rewardAsset: "XLM" | "USDC";
  status: "open" | "in_review" | "completed" | "expired";
  deadline: string;
}

export interface Submission {
  id: string;
  bountyId: string;
  contributorId: string;
  content: string;
  status: "pending" | "approved" | "rejected";
}
