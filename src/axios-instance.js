import axios from "axios";

import { getToken } from "./services/auth";

const instance = axios.create({
  baseURL: "http://1net.net.br:3331",
});

instance.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
