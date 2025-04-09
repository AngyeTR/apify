
import { getBase64 } from "./functions"
import { postImage, postProduct } from "../services/API/api"

const rawData = window.localStorage.getItem("data")
const stored = JSON.parse(rawData)
const date = new Date().toISOString();

export const adaptWarehouseModel = (dataSet,  selectedCity, isActive) =>{
   dataSet["createdBy"] = stored.user.email
   dataSet["modifiedBy"]= stored.user.email
   dataSet["idCompany"]= stored.company.id
   dataSet["idCity"] = selectedCity.id
   dataSet["isActive"] = isActive  
   return dataSet
}

export const adaptCompanymodel = (dataSet, segment, base64)=> {
  const getUrl = async (value)=> 
    {try {
      const data ={name: `companyImage${Date.now()}`, "base64": value, "imageType": 1}
        const url  = await postImage(data).then(res => {return res})
        dataSet["urlLogo"] = url
      } catch (error) {console.log(error)}}
    getUrl(base64)
    dataSet["modifiedBy"] = stored.user.email
    dataSet["createdBy"]= stored.user.email
    dataSet["id"] = stored.company.id
    !dataSet.name && (dataSet["name"] = stored.company.name)
    dataSet["idSegment"]= parseInt(segment.id)
    return dataSet
}

export const adaptUserModel = (dataSet, base64) => {
  const getUrl = async (value)=> 
    {try {
      const data ={name: `companyImage${Date.now()}`, "base64": value, "imageType": 1}
        const url  = await postImage(data).then(res => {return res})
        dataSet["avatar"] = url
      } catch (error) {console.log(error)}}
    getUrl(base64)
        dataSet["createdBy"] = stored.user.email
        dataSet["modifiedBy"]= stored.user.email
        dataSet["createdDate"] = date
        dataSet["modifiedDate"]= date
        dataSet["idCompany"]= stored.company.id
        return dataSet
    }

export  const adaptProductModel =  (dataSet, status,  manufacturer,  category, isColors, isSizes, colorsState, sizes, stock, images) => {
    dataSet["images"] = []
    const modifyColor = (color)=> {
        color["createdBy"] = stored.user.email
        color["modifiedBy"]= stored.user.email
        color["nombre"]= color.name
        color["colorCode"]= color.code
        return color} 

    const adaptedImages =   async (images) => {
        for (const image of images) {
            try {
                const base64 = await getBase64(image.value)
                const url = await postImage({name: `productImage${Date.now()}`, "base64": base64, "imageType": 2})
                dataSet["images"].push({url: url,  modifiedBy: stored.user.email, createdBy: stored.user.email })
              } catch (error) {
                console.error("Error al convertir:", error);
              }              
      }; 
      dataSet["createdBy"] = stored.user.email
      dataSet["modifiedBy"]= stored.user.email
      dataSet["idCompany"]= parseInt(stored.company.id)
      dataSet["idCategory"] = category ?  parseInt(category) : null
      dataSet["idManufacturer"] = manufacturer ? parseInt(manufacturer) : null
      dataSet["isColors"] = isColors
      dataSet["isSizes"] = isSizes
      dataSet["isActive"] = status ? status : false
      dataSet["colors"] = colorsState.map((color) => modifyColor(color))
      dataSet["sizes"] = sizes
      dataSet["stock"] = stock
      const res = await postProduct(dataSet)
    }
      const img = ((async ()=>  await adaptedImages(images))())
    return res
}

export const adaptSalesmanModel = (dataSet, isActive) => {
  dataSet["createdBy"] = stored.user.email
  dataSet["modifiedBy"]= stored.user.email
  dataSet["createdDate"] = date
  dataSet["modifiedDate"]= date
  dataSet["idCompany"]= stored.company.id
  dataSet["fullname"] = dataSet.name + " "+ dataSet.lastName
  dataSet["isActive"] = isActive
  return dataSet
}
    
