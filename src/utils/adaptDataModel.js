
import { getBase64 } from "./functions"
import { postImage } from "../services/API/api"

const rawData = window.localStorage.getItem("data")
const stored = JSON.parse(rawData)
const date = new Date().toISOString();

export const adaptWarehouseModel = (dataSet, origin, selectedCity, isActive, isPublic) =>{
   !dataSet.createdBy && (dataSet["createdBy"] = stored.user.email)
   dataSet.city && delete dataSet.city
   dataSet["modifiedBy"]= stored.user.email
   dataSet["idCompany"]= stored.company.id
   selectedCity && (dataSet["idCity"] = selectedCity.id)
   dataSet["isActive"] = isActive 
   dataSet["isPublic"] = isPublic
   dataSet["isWizard"] = (origin == "wizard" ? true: false) 
   console.log(dataSet)
   return dataSet
}

export const adaptCompanymodel = async (dataSet, origin, segment, base64)=> {
  console.log(base64)
  const getUrl =  async (value)=> 
    {try {
      const data ={name: `companyImage${Date.now()}`, "base64": value, "imageType": 1}
        const url  = await postImage(data).then(res => {return res})
        dataSet["urlLogo"] = url
      } catch (error) {console.log(error)}}
    if (base64) {await getUrl(base64)}else{ dataSet["urlLogo"] = stored.company.urlLogo}
    dataSet["modifiedBy"] = stored.user.email
    !dataSet.createdBy && (dataSet["createdBy"]= stored.user.email)
    dataSet["id"] = stored.company.id
    !dataSet.name && (dataSet["name"] = stored.company.name)
    dataSet["idSegment"]= parseInt(segment.id)
    dataSet["isWizard"] = (origin == "wizard" ? true: false) 
    return dataSet
}

export const adaptUserModel = (dataSet, origin, base64, isSalesman) => {
  console.log(base64)
  const getUrl = async (value)=> 
    {try {
      console.log("trying")
      const data ={name: `companyImage${Date.now()}`, "base64": value, "imageType": 1}
        const url  = await postImage(data).then(res => {return res})
        console.log(url)
        dataSet["avatar"] = url
      } catch (error) {console.log(error)}}
    base64 && getUrl(base64)
        !dataSet.createdBy && (dataSet["createdBy"]= stored.user.email)
        dataSet["modifiedBy"]= stored.user.email
        !dataSet.createdDate &&( dataSet["createdDate"] = date)
        dataSet["modifiedDate"]= date
        dataSet["idCompany"]= stored.company.id
        dataSet["isWizard"] = (origin == "wizard" ? true: false) 
        dataSet["isSalesman"] = isSalesman
        console.log(dataSet)
        return dataSet
    }

export  const adaptProductModel =  (dataSet, origin, status,  manufacturer,  category, isColors, isSizes, colorsState, sizes, stock, images) => {
    const modifyColor = (color)=> {
        color["createdBy"] = stored.user.email
        color["modifiedBy"]= stored.user.email
        color["nombre"]= color.name
        color["colorCode"]= color.colorCode
        return color} 
    const modifyStock = (stock)=> {
        stock["createdBy"] = stored.user.email
        stock["modifiedBy"]= stored.user.email
        stock["idCompany"] = stored.company.id
        stock["transaction"] = 1
        stock["transactionDate"] = date
        return stock} 

    const adaptedImages =   async (images) => {
        for (const image of images) {
            try {
                const base64 = await getBase64(image.value)
                const url = await postImage({name: `productImage${Date.now()}`, "base64": base64, "imageType": 2}).then(res => {return res})
                dataSet["images"].push({url: url,  modifiedBy: stored.user.email, createdBy: stored.user.email })
              } catch (error) { console.error("Error al convertir:", error)}
            }; 
      return await dataSet.images
     }
     try {
      dataSet.images ? dataSet.images : (dataSet["images"] = [])
      dataSet["isWizard"] = origin  == "wizard" ? true : false
      !dataSet.createdBy && (dataSet["createdBy"] = stored.user.email)
      dataSet["modifiedBy"]= stored.user.email
      dataSet["idCompany"]= parseInt(stored.company.id)
      dataSet["idCategory"] = category &&  parseInt(category)
      manufacturer != null && (dataSet["idManufacturer"] =  parseInt(manufacturer))
      isSizes != null && (dataSet["isColors"] = isColors)
      isSizes != null && (dataSet["isSizes"] = isSizes)
      status != [] && ( dataSet["isActive"] = status)
      colorsState != [] && (dataSet["colors"] = colorsState.map((color) => modifyColor(color)))
      sizes != []&& (dataSet["sizes"] = sizes)
      stock != [] && (dataSet["stock"] = stock.map(st => modifyStock(st)))
      images != [] &&  adaptedImages(images)
     } catch (error) {console.log(error)}
    return dataSet
}

export const adaptSalesmanModel = (dataSet, origin, isActive) => {
  !dataSet.createdBy && (dataSet["createdBy"] = stored.user.email)
  dataSet["modifiedBy"]= stored.user.email
  !dataSet.createdDate && (dataSet["createdDate"] = date)
  dataSet["modifiedDate"]= date
  dataSet["idCompany"]= stored.company.id
  dataSet["fullname"] = dataSet.name + " "+ dataSet.lastName
  dataSet["isActive"] = isActive
  dataSet["isWizard"] = origin  == "wizard" ? true : false
  return dataSet
}

export const adaptImplementationModel = (step)=>{
  return {
  isActive: true,
  createdBy: stored.user.email,
  modifiedBy: stored.user.email,
  idCompany: stored.company.id,
   implementationStep: step,
   initial: date,
   end: date,
   success: true
  }
}