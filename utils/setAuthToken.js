import api from './api'

const setAuthToken = data => {
  if (data) {
    const credentials = JSON.parse(data)
    api.defaults.headers.common['X-User-Token'] = credentials?.token
    api.defaults.headers.common['X-User-Email'] = credentials?.email
  } else {
    delete api.defaults.headers.common['X-User-Token']
    delete api.defaults.headers.common['X-User-Email']
  }
}

export default setAuthToken