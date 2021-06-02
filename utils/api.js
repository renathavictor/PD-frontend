import axios from 'axios'

const urls = {
  'development': 'http://localhost:3000',
  'production': 'https://olimpiadaapi.herokuapp.com'
}

const api = axios.create({
  baseURL: urls[process.env.NEXT_PUBLIC_NODE_ENV] || urls['development'],
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export default api
