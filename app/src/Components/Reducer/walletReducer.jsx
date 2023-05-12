const initialState = {
  walletAddress: "",
  nftDetail: [],
};

export function walletReducer(state = initialState, action) {
  switch (action.type) {
    case "Address":
      return { ...state, walletAddress: action.payload };

    case "NFTinfo":
      return { ...state, nftDetail: action.payload };

    default:
      return state;
  }
}
