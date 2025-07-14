import axios from 'axios';
import { getStoreToken } from '../../../shared/services/cookies';

const api = axios.create({
  baseURL: "https://app.dashwork.co:444/api"});
  api.interceptors.request.use(
  (config) => {
    const token = getStoreToken(); 
    if (token) {config.headers.Authorization = `Bearer ${token}`}
    return config; 
  },
  (error) => Promise.reject(error)
);

const noTokenApi = axios.create({baseURL: "https://app.dashwork.co:444/api"});


export const getFavorites = async (idCompany, idUser)=>{
  const res = await api.get(`/Products/GetByIdCompanyCustomer/${idCompany}/${idUser}`).then(response =>  response).catch(error => {return error.response}); 
  return res.data
}

export const markFavorite = async (data) => {
  const res = await api.post(`/Products/MarkFavorite`, data).then(response =>  response).catch(error => {return error.response}); 
  return res.data
}

export const unMarkFavorite = async (data) => {
  const res = await api.post(`/Products/UnmarkFavorite`, data).then(response =>  response).catch(error => {return error.response}); 
  return res.data
}

export const getLoginCustomer = async (email, password)=> {
  const res = await noTokenApi.post(`Login/LoginCustomer`,  { email: email, password: password } ).then(response =>  response.data).catch(error => error.response.data.response);
  return res
}

