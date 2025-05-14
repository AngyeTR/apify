import axios from 'axios';
import { getToken } from '../cookies';
import { adaptImplementationModel } from '../../utils/adaptDataModel';

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
  const res = await api.get("/Countries/Get").then(response =>  response.data).catch(error => {return error.response.data});
  return res
};

export  const  getStates  = async(id)=>{
  const res = await api.get(`/States/GetByIdCountry/${id}`).then(response =>  response.data).catch(error => {return error.response.data});
  return res
}

export  const  getCities  = async(id)=>{
  const res = await api.get(`/Cities/GetByIdState/${id}`).then(response =>  response.data).catch(error => {return error.response.data});
  return res
}

export const getLogin = async (email, password)=> {
  const res = await api.post(`/login/login`,  { email: email, password: password } ).then(response =>  response.data).catch(error => error);
  return res
}

export  const  getSegments  = async()=>{
  const res = await api.get(`/Segments/Get`).then(response =>  response.data).catch(error => {return error.response.data});
  return res
}

export  const  getProfiles  = async()=>{
  const res = await api.get(`/Profiles/Get`).then(response =>  response.data).catch(error => {return error.response.data});
  return res
}

export const getByID = async (query, id)=>{
  const res = await api.get(`/${query}/GetById/${id}`).then(response =>  response.data).catch(error => {return error.response.data});
  return res
}

export const getByCompanyId = async (query, id)=>{
  const res = await api.get(`/${query}/GetByIdCompany/${id}`).then(response =>  response.data).catch(error => {return error.response.data});
  return res
}

export const getByDelegateId = async ( id)=>{
  const res = await api.get(`/Delegates/GetByidDelegate/${id}`).then(response =>  response.data).catch(error => {return error.response.data});
  return res
}

export const post = async (query, data)=>{
  const res = await api.post(`/${query}/Add`, data).then(response =>  response.data).catch(error => {return error.response.data});
  return res
}

export const edit = async (query, data)=>{
  const res = await api.patch(`/${query}/Update`, data).then(response =>  response.data).catch(error => {return error.response.data});
  return res
}

export const updateWizard = async (step)=>{
  const data = adaptImplementationModel(step)
  const res = await api.patch(`/Implementation/Update`, data).then(response =>  response.data).catch(error => {return error.response.data});
  return res
}

export const finishWizard = async (step)=>{
  const data = adaptImplementationModel(step)
  const res = await api.patch(`/Implementation/Finish`, data).then(response =>  response.data).catch(error => {return error.response.data});
  return res
}

export const postImage = async (data)=>{
  const res = await api.post(`/Utilities/AddImage`, data).then(response =>  response.data).catch(error => {return error.response.data});
  return res
}
