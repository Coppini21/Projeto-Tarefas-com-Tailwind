import axios from "axios";
export const TOKEN = "Bearer 1/1203990077602562:5574b297c7fe6d9f9f28f3804cdfc33e";

export const instanceAxios = axios.create({
  baseURL: "https://app.asana.com/api/1.0",
  timeout: 1000,
  headers: {
    accept: "application/json",
    authorization: TOKEN,
  },
});



