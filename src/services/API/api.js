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

export  const  getSegments  = async()=>{
  const res = await api.get(`/Segments/Get`).then(response =>  response).catch(error => error);
  return res.data
}

export  const  getProfiles  = async()=>{
  const res = await api.get(`/Profiles/Get`).then(response =>  response).catch(error => error);
  return res.data
}

export const getByID = async (query, id)=>{
  const res = await api.get(`/${query}/GetById/${id}`).then(response =>  response).catch(error => error);
  return res.data.data
}

export const getByCompanyId = async (query, id)=>{
  const res = await api.get(`/${query}/GetByIdCompany/${id}`).then(response =>  response).catch(error => error);
  return res.data.data
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


// export const editCompany = async (data)=>{
//  const res = await api.patch(`/Companies/Update`, data).then(response =>  response.data).catch( error => error.response.data);
//   return res
// }

// export const editUser = async (data)=>{
//   const res = await api.patch(`/Users/Update`, data).then(response =>  response.data).catch( error => error.response.data);
//    return res
//  }


// export const postUser = async (data)=>{
//   const res = await api.post(`/Users/Add`, data).then(response =>  response.data).catch(error => {return error.response.data});
//   return res
// }

// export const postWareHouse = async (data)=>{
//   const res = await api.post(`/Warehouses/Add`, data).then(response =>  response.data).catch(error => {return error.response.data}); 
//   return res
// }

// export const editWareHouse = async (data)=>{
//   const res = await api.patch(`/Warehouses/Update`, data).then(response =>  response.data).catch(error => {return error.response.data}); 
//   return res
// }

// export const getWarehouseByCompany = async(id)=>{
//   const res = await api.get(`/Warehouses/GetByIdCompany/${id}`).then(response =>  response).catch(error => error);
//   return res.data.data
// }

// export const getWarehouseById = async(id)=>{
//   const res = await api.get(`/Warehouses/GetById/${id}`).then(response =>  response).catch(error => error);
//   return res.data.data
// }



// export const getCompanyById = async(id)=>{
//   const res = await api.get( `/Companies/GetById/${id}`).then(response =>  response).catch(error => error); 
//   return res.data.data
// }

// export const getProductById = async(id)=>{
//   const res = await api.get( `/Products/GetById/${id}`).then(response =>  {return response}).catch(error => error); 
//   return res.data.data
// }

// export const getUserById = async(id)=>{
//   const res = await api.get( `/Users/GetById/${id}`).then(response =>  {return response}).catch(error => error); 
//   return res.data.data
// }

// export const getSalesmanById = async(id)=>{
//   const res = await api.get( `/Salesman/GetById/${id}`).then(response =>  response).catch(error => error); 
//   return res.data.data
// }

// export const getManufacturerByCompany = async(id)=>{
//   const res = await api.get( `/Manufacturer/GetByIdCompany/${id}`).then(response =>  response).catch(error => error); 
//   return res.data.data
// }

// export const postManufacturer = async (data)=>{
//   const res = await api.post( `/Manufacturer/Add`, data).then(response =>  response.data).catch(error => {return error.response.data});
//   return res
// }

// export const getCategoryByCompany = async(id)=>{
//   const res = await api.get( `/Categories/GetByIdCompany/${id}` ).then(response =>  response).catch(error => error);
//   return res.data.data
// }

// export const postCategory = async (data)=>{
//  const res = await api.post(`/Categories/Add`, data ).then(response =>  response).catch(error => {return error.response});
//   return res.data
// }

// export const postImage = async (data)=>{
//   const res = await api.post(`/Utilities/AddImage`, data).then(response =>  response).catch(error => {return error.response}); 
//   return res.data.data
// }

// export const postProduct = async (data)=>{
//   const res = await api.post(`/Products/Add`, data).then(response =>  response.data).catch(error => {return error.response.data});
//   return res
// }

// export const editProduct = async (data)=>{
//   const res = await api.patch(`/Products/Update`, data).then(response =>  response.data).catch(error => {return error.response.data});
//   return res
// }

// export const postSalesman = async (data)=>{
//   const res = await api.post(`/Salesman/Add`, data).then(response =>  response.data).catch(error => {return error.response.data});
//   return res
// }

// export const editSalesman = async (data)=>{
//   const res = await api.patch(`/Salesman/Update`, data).then(response =>  response.data).catch(error => {return error.response.data});
//   return res
// }



// export const postOffice = async (data)=>{
//   const res = await api.post(`/Offices/Add`, data).then(response =>  response.data).catch(error => {return error.response.data}); 
//   return res
// }

// export const editOffice = async (data)=>{
//   const res = await api.patch(`/Offices/Update`, data).then(response =>  response.data).catch(error => {return error.response.data}); 
//   return res
// }

// export const getOfficeByCompany = async(id)=>{
//   const res = await api.get(`/Offices/GetByIdCompany/${id}`).then(response =>  response).catch(error => error);
//   return res.data.data
// }

// export const getOfficeById = async(id)=>{
//   const res = await api.get(`/Offices/GetById/${id}`).then(response =>  response).catch(error => error);
//   return res.data.data
// }

