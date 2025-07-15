import axios from 'axios';

const api = axios.create({baseURL: "https://app.dashwork.co:444/api"});

  ////// Location  //////

export const getCountries = async () => {
  const res = await api.get("/Landing/GetCountries").then(response =>  response.data).catch(error => {return error.response.data});
  return res
};

export  const  getStates  = async(id)=>{
  const res = await api.get(`/Landing/GetByIdCountry/${id}`).then(response =>  response.data).catch(error => {return error.response.data});
  return res
}

export  const  getCities  = async(id)=>{
  const res = await api.get(`/Landing/GetByIdState/${id}`).then(response =>  response.data).catch(error => {return error.response.data});
  return res
}

////// Generales  //////

export  const  getByID  = async(query, id)=>{
  const res = await api.get(`/Landing/Get${query}ById/${id}`).then(response =>  response.data).catch(error => {return error.response.data});
  return res
}

export  const  getByCompanyId  = async(query, id)=>{
  const res = await api.get(`/Landing/Get${query}ByIdCompany/${id}`).then(response =>  response.data).catch(error => {return error.response.data});
  return res
}

export const post = async (query, data)=>{
  const res = await api.post(`/Landing/Add${query}`, data).then(response =>  response.data).catch(error => {return error.response.data});
  return res
}

export const edit = async (query, data)=>{
  const res = await api.patch(`/Landing/Update${query}`, data).then(response =>  response.data).catch(error => {return error.response.data});
  return res
}

////// Customers  //////

export const getCustomerByPhone = async (id, phone)=>{
  const res = await api.get(`/Landing/GetCustomerByCellphone/${id}/${phone}`).then(response =>  response).catch(error => error);
  return res.data
}

export const getCustomerScore = async (phone)=>{
  const res = await api.get(`/Landing/GetScore/${phone}`).then(response =>  response).catch(error => error);
  return res.data
}

////// Domains  //////

export const getByDomain = async (domain)=>{
  const res = await api.get(`Landing/GetCompanyByDomain/${domain}`).then(response =>  response?.data).catch(error => {return error.response?.data});
  return res
}

////// Navigation  //////

export const postNavigation = async ( data)=>{
  const res = await api.post(`Navigation/Add`, data).then(response =>  response.data).catch(error => {return error.response.data});
  return res
}

 ////// Reportes  //////

export const convertions = async (query, data) => {
  const res = await api.post(`/FacebookConversions/${query}`, data).then(response =>  response).catch(error => {return error.response}); 
  return res
}
