export default function registerUser(data) {
  return {
    type: "SET_USER",
    payload: data,
  };
}
