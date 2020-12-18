import axios from "axios";

const serverInstance = axios.create({
  baseURL: "http://179.184.24.102:3001",
});

const clientInstance = axios.create({
  baseURL: "http://179.184.24.102:3002",
});

export { serverInstance, clientInstance };
