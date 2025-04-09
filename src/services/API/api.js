import axios from 'axios';
import { getToken } from '../cookies';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_HOST});
  api.interceptors.request.use(
  (config) => {
    const token = getToken(); 
    if (token) {config.headers.Authorization = `Bearer ${token}`}
    return config;
  },
  (error) => Promise.reject(error)
);

export const getCountries = async () => {
  const response = await api.get("/Countries/Get").then(response =>  response).catch(error => error);
  return response.data.data;
};

export  const  getStates  = async(id)=>{
  const res = await api.get(`/States/GetByIdCountry/${id}`).then(response =>  response).catch(error => error);
  return res.data.data
}

export  const  getCities  = async(id)=>{
  const res = await api.get(`/Cities/GetByIdState/${id}`).then(response =>  response).catch(error => error);
  return res.data.data
}

export const getLogin = async (email, password)=> {
  const res = await api.post(`/login/login`,  { email: email, password: password } ).then(response =>  response.data).catch(error => error.response.data);
  return res
}

export const editCompany = async (data)=>{
 const res = await api.patch(`/Companies/Update`, data).then(response =>  response.data).catch( error => error.response.data);
  return res
}

export  const  getSegments  = async()=>{
  const res = await api.get(`/Segments/Get`).then(response =>  response).catch(error => error);
  return res.data
}

export  const  getProfiles  = async()=>{
  const res = await api.get(`/Profiles/Get`).then(response =>  response).catch(error => error);
  return res.data
}

export const postUser = async (data)=>{
  const res = await api.post(`/Users/Add`, data).then(response =>  response.data).catch(error => {return error.response.data});
  return res
}

export const postWareHouse = async (data)=>{
  const res = await api.post(`/Warehouses/Add`, data).then(response =>  response.data).catch(error => {return error.response.data}); 
  return res
}

export const getWarehouseByCompany = async(id)=>{
  const res = await api.get(`/Warehouses/GetByIdCompany/${id}`).then(response =>  response).catch(error => error);
  return res.data.data
}

export const getManufacturerByCompany = async(id)=>{
  const res = await api.get( `/Manufacturer/GetByIdCompany/${id}`).then(response =>  response).catch(error => error); 
  return res.data.data
}

export const postManufacturer = async (data)=>{
  const res = await api.post( `/Manufacturer/Add`, data).then(response =>  response.data).catch(error => {return error.response.data});
  return res
}

export const getCategoryByCompany = async(id)=>{
  const res = await api.get( `/Categories/GetByIdCompany/${id}` ).then(response =>  response).catch(error => error);
  return res.data.data
}

export const postCategory = async (data)=>{
 const res = await api.post(`/Categories/Add`, data ).then(response =>  response).catch(error => {return error.response});
  return res.data
}

export const postImage = async (data)=>{
  const res = await api.post(`/Utilities/AddImage`, data).then(response =>  response).catch(error => {return error.response}); 
  return res.data.data
}

export const postProduct = async (data)=>{
  const res = await api.post(`/Products/Add`, data).then(response =>  response.data).catch(error => {return error.response.data});
  return res
}

export const postSalesman = async (data)=>{
  const res = await api.post(`/Salesman/Add`, data).then(response =>  response.data).catch(error => {return error.response.data});
  return res
}
