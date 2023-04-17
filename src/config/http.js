import axios from "axios";
export const baseURL = process.env.REACT_APP_API_BASE_URL;

const http = axios.create({
  baseURL: baseURL,
});

// Request interceptors for API calls
http.interceptors.request.use(
  (request) => {
    const user = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

    request.headers["Authorization"] = `Bearer ${user?.token}`;

    request.headers["Access-Control-Allow-Origin"] = "*";

    if (request.method !== "GET") {
      request.headers["Content-Type"] = "application/json";
    }

    return request;
  },
  (error) => {
    //eslint-disable-next-line
    return Promise.reject(error);
  }
);

export default http