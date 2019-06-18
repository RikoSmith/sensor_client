import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.0.40.99/api"
});

export default instance;
