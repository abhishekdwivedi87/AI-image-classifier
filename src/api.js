export const API_URL = (
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "development" ? "http://localhost:5000" : "")
).replace(/\/+$/, "");

function getApiUrl() {
  if (!API_URL) {
    throw new Error("Set REACT_APP_API_URL to the deployed backend URL.");
  }
  return API_URL;
}

export function apiUrl(path) {
  return `${getApiUrl()}/${path.replace(/^\/+/, "")}`;
}

export function assetUrl(path) {
  return new URL(path, `${getApiUrl()}/`).toString();
}
