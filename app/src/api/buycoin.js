export const getIVCoinValue = () => {
  return 1;
};

export const getTotalETHCoin = (inputAmount) => {
  const coinValue = getIVCoinValue();
  return coinValue * inputAmount;
};
