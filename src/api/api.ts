import axios from "axios";

export const publicReq = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 30000,
});

export const privateReq = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 30000,
  headers: {
    Authorization: `Bearer token`
  }
})