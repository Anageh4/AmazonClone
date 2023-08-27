export const getBasketTotal = (basket) => {
  return basket.reduce((amount, item) => {
    return amount + item.item.price;
  }, 0);
};

const Initial_State = {
  basket: [],
};

export default function basketReducer(state = Initial_State, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        basket: [...state.basket, action.payload],
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product {id ${action.id} as it's not in the basket}`
        );
      }

      return {
        ...state,
        basket: newBasket,
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    default:
      return state;
  }
}
