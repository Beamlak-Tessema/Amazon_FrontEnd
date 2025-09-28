import axios from "axios";

const api = axios.create({
  // baseURL: "https://fakestoreapi.com", // base API URL
  //RENDER BASE URL;
  baseURL: "https://amazon-backend-p6nz.onrender.com",
});

export default api;
