export default function emptyBasket(data) {
  return {
    type: "EMPTY_BASKET",
    payload: data,
  };
}
