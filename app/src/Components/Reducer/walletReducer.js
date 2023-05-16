const initialState = {
  walletAddress: "",
  nftDetail: [],
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Address": {
      console.log("Reducer", action, state);
      return { ...state, walletAddress: action.payload };
    }

    case "NFTinfo":
      return { ...state, nftDetail: action.payload };

    default:
      return state;
  }
};

export default walletReducer;
