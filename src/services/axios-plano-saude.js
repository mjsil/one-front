import axios from "axios";

const serverInstance = axios.create({
  baseURL: "http://134.209.167.35:3000",
});

const clientInstance = axios.create({
  baseURL: "http://134.209.167.35",
});

export { serverInstance, clientInstance };
