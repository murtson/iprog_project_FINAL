const initState = {
  cardError: null
};

const cardReducer = (state = initState, action) => {
  switch (action.type) {
    case "REMOVE_SHOWCASE_CARD":
      console.log("removed card from showcase", action);
      return {
        ...state,
        showCaseError: null
      };

    case "REMOVE_SHOWCASE_CARD_ERROR":
      console.log("error while removing card from showcase", action.err);
      return {
        ...state,
        showCaseError: action.err.message
      };
    case "SELL_CARD":
      console.log("sold card!", action.name);
      return {
        ...state,
        collectionError: null
      };
    case "SELL_CARD_ERROR":
      console.log("could not sell the card", action.err);
      return {
        ...state,
        collectionError: action.err.message
      };

    case "ADD_SHOWCASE_CARD":
      console.log("showcase card added");
      return {
        ...state,
        showCaseError: null
      };
    case "ADD_SHOWCASE_CARD_ERROR":
      console.log("add showcase card error", action.err);
      return {
        ...state,
        showCaseError: action.err.message
      };
    case "FULL_SHOWCASE":
      console.log("the showcase is full");
      return {
        ...state,
        cardError: "the showcase is full"
      };
    case "ALREADY_IN_SHOWCASE":
      console.log("the card already exists in your showcase");
      return {
        ...state,
        cardError: "the card already exists in your showcase"
      };

    case "BUY_CARD_PACKAGE":
      console.log("bought card");
      return {
        ...state
      };
    case "BUY_CARD_PACKAGE_ERROR":
      console.log("buy card error");
      return {
        ...state
      };
    case "FREE_CARD_PACKAGE":
      console.log("bought card");
      return {
        ...state
      };

    case "FREE_CARD_PACKAGE_ERROR":
      console.log("free card error");
      return {
        ...state
      };

    case "OPEN_PACKAGE":
      console.log("opening package");
      return {
        ...state
      };

    default:
      return state;
  }
};

export default cardReducer;
