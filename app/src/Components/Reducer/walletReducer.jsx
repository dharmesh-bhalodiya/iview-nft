const initialState = {
  walletAddress: "",
};

export function walletReducer(state = initialState, action) {
  switch (action.type) {
    case "Address":
      return { ...state, walletAddress: action.payload };

    default:
      return state;
  }
}
