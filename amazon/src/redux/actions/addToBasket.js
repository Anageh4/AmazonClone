export default function addToBasket(data) {
  return {
    type: "ADD_ITEM",
    payload: data,
  };
}
