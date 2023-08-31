import axios from "axios";

let url = "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: url,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const { get, post, put, patch, delete: destroy } = apiClient;
export { get, post, put, patch, destroy };
