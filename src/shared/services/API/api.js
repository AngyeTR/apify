import axios from 'axios';
import { getToken } from '../cookies';
import { adaptImplementationModel } from "../../../features/Dashboard/utils/adaptDataModel" 

const api = axios.create({
  baseURL: "https://app.dashwork.co:444/api"});
  api.interceptors.request.use(
  (config) => {
    const token = getToken(); 
    if (token) {config.headers.Authorization = `Bearer ${token}`}
    return config; 
  },
  (error) => Promise.reject(error)
);

const noTokenApi = axios.create({
  baseURL: "https://app.dashwork.co:444/api"});

  ////// Location  //////

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

////// Login  //////

export const getLogin = async (email, password)=> {
  const res = await api.post(`/login/login`,  { email: email, password: password }).then(response =>  response.data).catch(error => error);
  return res
}

export const getLoginCustomer = async (email, password)=> {
  const res = await api.post(`Login/LoginCustomer`,  { email: email, password: password } ).then(response =>  response.data).catch(error => error.response.data.response);
  return res
}

////// Customers  //////

export const getByCustomerId = async (query, id)=>{
  const res = await api.get(`/${query}/GetByIdCustomer/${id}`).then(response =>  response).catch(error => error);
  return res.data.data
}

export const getCustomerByPhone = async (id, phone)=>{
  const res = await api.get(`/Customers/GetByCellphone/${id}/${phone}`).then(response =>  response).catch(error => error);
  return res.data
}

export const getCustomerScore = async (phone)=>{
  const res = await api.get(`/Customers/GetScore/${phone}`).then(response =>  response).catch(error => error);
  return res.data
}

export const getCustomerByEmail = async (id, email)=>{
  const res = await api.get(`/Customers/GetByEmail/${id}/${email}`).then(response =>  response).catch(error => error);
  return res.data
}

////// Users  //////

export const  getByEmail = async (email) => {
  const res = await api.get(`Users/GetByEmail/${email}`).then(response =>  response.data).catch(error => error.response.data);
  return res
}

////// Accounts  //////

export  const  getSegments  = async()=>{
  const res = await api.get(`/Segments/Get`).then(response =>  response.data).catch(error => {return error.response.data});
  return res
}

export  const  getProfiles  = async()=>{
  const res = await api.get(`/Profiles/Get`).then(response =>  response.data).catch(error => {return error.response.data});
  return res
}

export const updateWizard = async (step)=>{
  const data = adaptImplementationModel(step)
  const res = await api.patch(`/Implementation/Update`, data).then(response =>  response.data).catch(error => {return error.response.data});
  return res
}

export const finishWizard = async (step)=>{
  const data = adaptImplementationModel(step)
  console.log(data)
  const res = await api.patch(`/Implementation/Finish`, data).then(response =>  response.data).catch(error => {return error.response});
  return res
}

////// Generales  //////

export const getByID = async (query, id)=>{
  const res = await api.get(`/${query}/GetById/${id}`).then(response =>  response.data).catch(error => {return error.response.data});
  return res
}

export const getByCompanyId = async (query, id)=>{
  const res = await api.get(`/${query}/GetByIdCompany/${id}`).then(response =>  response?.data).catch(error => {return error?.response?.data});
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

////// Delegates  //////

export const getByDelegateId = async ( id)=>{
  const res = await api.get(`/Delegates/GetByidDelegate/${id}`).then(response =>  response?.data).catch(error => {return error.response?.data});
  return res
}

////// Domains  //////

// export const getByDomain = async (domain)=>{
//   const res = await api.get(`/CompaniesDomain/GetByDomain/${domain}`).then(response =>  response?.data).catch(error => {return error.response?.data});
//   return res
// }

export const getByDomain = async (domain)=>{
  const res = await api.get(`/Domains/GetByDomain/${domain}?d=${domain}`).then(response =>  response?.data).catch(error => {return error.response?.data});
  return res
}

export const validateDomain = async (data) =>{
  const res = await api.patch(`/Domains/Validate`, data).then(response =>  response?.data).catch(error => {return error.response?.data});
  return res
}

////// Layouts  //////

export const cloneLayout = async ( data)=>{
  const res = await api.post(`/Layouts/clone`, data).then(response =>  response.data).catch(error => {return error.response.data});
  return res
}

////// Resources  //////

export const postImage = async (data)=>{
  const res = await api.post(`/Utilities/AddImage`, data).then(response =>  response.data).catch(error => {return error.response.data});
  return res
}

export const getByFolderID = async ( id)=>{
  const res = await api.get(`/Libraries/GetByIdCompany/${id}`).then(response =>  response).catch(error => error);
  return res.data.data
}

export const postFolder = async (data)=>{
  const res = await api.post(`/Libraries/AddFolder`, data).then(response =>  response.data).catch(error => {return error.response.data}); 
  return res
}

export const postFile = async (data)=>{
  const res = await api.post(`/Libraries/AddFile`, data).then(response =>  response).catch(error => {return error.response}); 
  return res.data
}

 ////// Reportes  //////

export const convertions = async (query, data) => {
  const res = await api.post(`/FacebookConversions/${query}`, data).then(response =>  response).catch(error => {return error.response}); 
  // const res = await noTokenApi.post(`/FacebookConversions/${query}`, data).then(response =>  response).catch(error => {return error.response}); 
  return res
}

 ////// WhatsApp Cloud  //////

 export const getChatByPhone = async (idCompany, phoneNumber)=>{
  const res = await api.get(`WhatsAppCloud/GetsByCellphone/${idCompany}/${phoneNumber}`).then(response => response).catch(error => {return error.response}); 
  return res.data ? res.data : {data: []}
}

 export const getChatList = async (idCompany)=>{
  const res = await api.get(`WhatsAppCloud/GetsGeneral/${idCompany}`).then(response => response).catch(error => {return error.response}); 
  return res.data
}

export const sendMessage = async (data) =>{
  const res = await api.post(`WhatsAppCloud/GetsGeneral`, data).then(response => response).catch(error => {return error.response}); 
  // return res.data
}





