export function walletAction(walletAddress) {
  return {
    type: "Address",
    payload: walletAddress,
  };
}

export function nftInfo(nftDetail) {
  return {
    type: "NFTinfo",
    payload: nftDetail,
  };
}
