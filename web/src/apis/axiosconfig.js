import axios from "axios";

export const api = axios.create({
  ///baseURL: "http://192.168.18.100:50530/api"
  // baseURL: "https://localhost:7119/api"
  //baseURL: "https://xptrackercs-api.saqibrazzaq.com/api",
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// defining a custom error handler for all APIs
const errorHandler = (error) => {
  const statusCode = error.response?.status;

  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    console.error(error);
  }

  return Promise.reject(error);
};

// registering the custom error handler to the
// "api" axios instance
api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});
