export const shortenAddress = (
  address,
  start = 4,
  end = 4
) => {
  if (!address) return "";

  return `${address.slice(
    0,
    start
  )}...${address.slice(-end)}`;
};

export const formatReward = (
  reward
) => {
  return `${reward} XLM`;
};

export const capitalize = (
  value
) => {
  if (!value) return "";

  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );
};