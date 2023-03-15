import axios from "axios";
import { Message } from "element-ui";

const baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000/api" : "/api";

const service = axios.create({
  baseURL,
  timeout: 0,
});

// response interceptor
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const res = error.response;
    // response timeout
    if (error.message && error.message.startsWith("timeout")) {
      Message({
        message: "网络超时",
        type: "error",
        duration: 2 * 1000,
      });
      return Promise.reject(error);
    } else {
      Message({
        message: res.data.message,
        type: "error",
        duration: 2 * 1000,
      });
    }
    return Promise.reject(res.data);
  }
);

export default service;
