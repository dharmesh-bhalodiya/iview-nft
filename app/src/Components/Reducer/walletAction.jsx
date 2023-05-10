export function walletAction(walletAddress) {
  return {
    type: "Address",
    payload: walletAddress,
  };
}
