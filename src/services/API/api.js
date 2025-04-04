import axios from 'axios';
import { getToken } from '../cookies';
const host = import.meta.env.VITE_API_HOST

export const getLogin = async (email, password)=> {
    const endPoint = `${host}/login/login`
    const res = await axios.post(endPoint, { email: email, password: password })
      .then(response =>  response)
      .catch(error => error);
    return res.data
  }

  export const editCompany = async (data)=>{
    const token = getToken();
    const endPoint = `${host}/Companies/Update`
      await axios.patch(endPoint, data,
      { 
        headers:
         {  "Authorization": "Bearer " + token,}})
      .then(response =>  console.log(response))
      .catch(error => console.log(error));
  }

  export  const  getSegments  = async()=>{
    const token = getToken();
    const endPoint = `${host}/Segments/Get`
    const res = await axios.get(endPoint, 
      { 
        headers:
         {  "Authorization": "Bearer " + token,}})
         .then(response =>  {return response.data})
         .catch(error =>  error)
    return res
  }

  export const postUser = async (data)=>{
    const token = getToken();
    const endPoint = `${host}/Users/Add`
      await axios.post(endPoint, data,
      { 
        headers:
         {  "Authorization": "Bearer " + token,}})
      .then(response =>  console.log(response))
      .catch(error => console.log(error));
  }

  export  const  getCountries  = async()=>{
    const token = getToken();
    const endPoint = `${host}/Countries/Get`
    const res = await axios.get(endPoint, 
      { 
        headers:
         {  "Authorization": "Bearer " + token,}})
         .then(response =>  {return response.data.data})
         .catch(error =>  error)

    return res
  }

  export  const  getStates  = async(id)=>{
    const token = getToken();
    const endPoint = `${host}/States/GetByIdCountry/${id}` 
    const res = await axios.get(endPoint,
      { 
        headers:
         {  "Authorization": "Bearer " + token,}})
         .then(response =>  {return response.data.data})
         .catch(error =>  error)
    return res
  }

  export  const  getCities  = async(id)=>{
    const token = getToken();
    const endPoint = `${host}/Cities/GetByIdState/${id}` 
    const res = await axios.get(endPoint,
      { 
        headers:
         {  "Authorization": "Bearer " + token,}})
         .then(response =>  {return response.data.data})
         .catch(error =>  error)
    return res
  }

  export const postWareHouse = async (data)=>{
    const token = getToken();
    const endPoint = `${host}/Warehouses/Add` 
      await axios.post(endPoint, data,
      { 
        headers:
         {  "Authorization": "Bearer " + token,}})
      .then(response =>  console.log(response))
      .catch(error => console.log(error));
  }

 