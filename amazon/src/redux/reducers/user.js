const Initial_State = {
  user: null,
};

export default function registerReducer(state = Initial_State, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
