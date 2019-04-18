import pic from "../images/thor.jpg";

const initState = {
  showCase: [
    {
      id: 1,
      name: "idiot hero",
      picture: pic,
      description: "description 1",
      cost: 50
    },
    {
      id: 2,
      name: "asshole hero",
      picture: pic,
      description: "description 2",
      cost: 75
    }
  ]
};

const rootReducer = (state = initState, action) => {
  return state;
};

export default rootReducer;
