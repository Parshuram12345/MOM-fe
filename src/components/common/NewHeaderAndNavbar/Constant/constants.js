export const constants = { B2B_BASE: "https://pro-api.idesign.market" };
export function getToken() {
  return `Bearer ${localStorage.getItem("token")}`;
}
