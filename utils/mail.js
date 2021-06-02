import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MAIL_HOST,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
})

export const notifyUser = async data => {
  return await api.post('/mail', data)
}