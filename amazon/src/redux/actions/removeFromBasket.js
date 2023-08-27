export default function removeFromBasket(data) {
    return {
      type: "REMOVE_FROM_BASKET",
      payload: data,
    };
  }