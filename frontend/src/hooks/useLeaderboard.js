import mockLeaderboard from "../lib/mockLeaderboard";

const useLeaderboard = () => {
  return {
    leaderboard: mockLeaderboard,
    loading: false,
  };
};

export default useLeaderboard;