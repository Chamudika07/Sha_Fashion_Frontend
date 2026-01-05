//this is the api service to make requests to the backend (backend connection)
import axios from "axios";  

const api = axios.create({
    baseURL : "http://127.0.0.1:8000", //my backend URL
    withCredentials: true,
});

//OPTIONAL (Recommended): Auto Attach Token to Requests

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

