import axios from "axios"

export const api = axios.create({
  baseURL: "http://192.168.0.213:3333", // Obs: o endereço muda!
  timeout: 700,
})