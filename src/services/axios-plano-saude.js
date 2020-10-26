import axios from "axios";

const serverInstance = axios.create({
  baseURL: "http://179.184.24.102:3331",
});

const clientInstance = axios.create({
  baseURL: "http://179.184.24.102:3332",
});

export { serverInstance, clientInstance };
