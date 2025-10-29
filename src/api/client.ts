import axios from 'axios'
export const api = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com', timeout: 15000 })
api.interceptors.response.use((resp)=>resp,(error)=>{ console.error('[API Error]', error?.response?.status, error?.message); return Promise.reject(error) })
