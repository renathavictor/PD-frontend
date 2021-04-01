import axios from 'axios'

// require('dotenv').config()

const { NEXT_PUBLIC_PROJECT_ENDPOINT } = process.env

const urls = {
  'development': 'http://localhost:3000',
  'production': NEXT_PUBLIC_PROJECT_ENDPOINT
}

const api = axios.create({
  baseURL: urls[process.env.NODE_ENV] || urls['development'],
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export default api
