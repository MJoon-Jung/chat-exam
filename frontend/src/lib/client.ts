import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3065/api",
  withCredentials: true,
});

export default client;
