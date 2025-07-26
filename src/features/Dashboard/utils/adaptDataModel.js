
import { getBase64 } from "../../../shared/utils/utils"
import { getByCompanyId, postFile, postFolder, postImage } from "../../../shared/services/API/api"
import { fileModel, libraryModel } from "./models";

const rawData = window.localStorage.getItem("data")
const rawStore = window.localStorage.getItem("store")
const stored = JSON.parse(rawData)
const store = JSON.parse(rawStore)
const date = new Date().toISOString();
const rawPolicies = window.localStorage.getItem("policies");
const policies = JSON.parse(rawPolicies)

export const adaptWarehouseModel = (dataSet, origin, selectedCity,) =>{
   !dataSet.createdBy && (dataSet["createdBy"] = stored?.user.email)
   dataSet.city && delete dataSet.city
   dataSet["modifiedBy"]= stored?.user.email
   selectedCity && (dataSet["idCity"] = selectedCity.id)
  //  dataSet["isActive"] = isActive 
  //  dataSet["isPublic"] = isPublic
   dataSet["isWizard"] = (origin == "wizard" ? true: false) 
   console.log(dataSet)
   return dataSet
}

export const adaptCompanymodel = async (dataSet, origin, base64, fileOrigin)=> {
  const getUrl =  async (value)=> 
    {try {
      const data ={name: `companyImage${Date.now()}`, "base64": value, "imageType": 1}
        const url  = await postImage(data).then(res => {return res.data})
        dataSet["urlLogo"] = url
      } catch (error) {console.log(error)}} 
   
    if (base64 && fileOrigin == "local" ) {await getUrl(base64)}
    else if (base64 && fileOrigin != "local" ){dataSet["urlLogo"] = base64}
    else{ dataSet["urlLogo"] = stored?.company.urlLogo}
    !dataSet.createdBy && (dataSet["createdBy"]= stored?.user.email)
    !dataSet.name && (dataSet["name"] = stored?.company.name)
    dataSet["idSegment"]= parseInt(dataSet["idSegment"])
    dataSet["isWizard"] = (origin == "wizard" ? true: false) 
    return dataSet
}

export const adaptUserModel = (dataSet, origin, base64, fileOrigin) => {
  const getUrl = async (value)=> 
    {try {
      console.log("trying")
      const data ={name: `companyImage${Date.now()}`, "base64": value, "imageType": 1}
      const url  = await postImage(data).then(res => res.data)
      dataSet["avatar"] = url
      const collections = await getByCompanyId("Libraries", 1).then(res => res.data)
      const filtered = collections && collections.filter(col => col.name == "Default")
      const collection = filtered[0] ? filtered[0] : null
      !collection  ? await postFolder(libraryModel).then(res=>postFile(adaptFileModel(res.data.id,  `companyImage${Date.now()}`, url)).then(res=> console.log(res)))
      :postFile(adaptFileModel(filtered[0].id,  `companyImage${Date.now()}`, url)).then(res=> console.log(res))
      } catch (error) {console.log(error)}}

    if(base64 && fileOrigin == "local"){getUrl(base64)}
    else if(base64 && fileOrigin != "local"){dataSet["avatar"] = base64 }
        !dataSet.createdBy && (dataSet["createdBy"]= stored?.user.email)
        !dataSet.createdDate &&( dataSet["createdDate"] = date)
        dataSet["modifiedDate"]= date
        dataSet["isWizard"] = (origin == "wizard" ? true: false) 
        // dataSet["isSalesman"] = isSalesman
        console.log(dataSet)
        return dataSet
    }

export  const adaptProductModel =  (dataSet, origin, stock) => {
    const modifyColor = (color)=> {
        color["createdBy"] = stored?.user.email
        color["modifiedBy"] = stored?.user.email
        color["nombre"]= color.name
        color["colorCode"]= color.colorCode
        return color} 
    const modifyStock = (stock)=> {
        stock["createdBy"] = stored?.user.email
        stock["modifiedBy"] = stored?.user.email
        stock["transaction"] = 1
        stock["transactionDate"] = date
        return stock} 

    const adaptedImages = async (images) => {
      console.log(images)
        // for (const image of images) {
        //     try {
        //         const base64 = await getBase64(image.value)
        //         const url = await postImage({name: `productImage${Date.now()}`, "base64": base64, "imageType": 2}).then(res => {return res.data})
        //         dataSet["images"].push({url: url,  modifiedBy: stored?.user.email, createdBy: stored?.user.email })
        //       } catch (error) { console.error("Error al convertir:", error)}
        //    console.log(dataSet.images, index)
        //     }; 
        for(let i = 0; i < images.length;  i++){
          try {
            const base64 = await getBase64(images[i].value)
            const url = await postImage({name: `productImage${Date.now()}`, "base64": base64, "imageType": 2}).then(res => {return res.data})
          dataSet["images"][i] = {url: url,  modifiedBy: stored?.user.email, createdBy: stored?.user.email }
          !dataSet["images"][i].createdBy && (dataSet["images"][i]["createdBy"] = stored?.user.email)
          !dataSet["images"][i].modifiedBy && (dataSet["images"][i]["modifiedBy"] = stored?.user.email)            
          } catch (error) { console.error("Error al convertir:", error)}
console.log(dataSet)
        }
      return await dataSet.images
     }
     try {
      dataSet.images ? dataSet.images : (dataSet["images"] = [])
      !dataSet.isColors && (dataSet["colors"] = [])
      dataSet.isSizes && (dataSet["sizes"] = [])
      dataSet["isWizard"] = origin  == "wizard" ? true : false
      !dataSet.createdBy && (dataSet["createdBy"] = stored?.user.email)
      dataSet["idCompany"]= parseInt(stored?.company.id)
      dataSet.colors != [] && (dataSet["colors"] = dataSet.colors.map((color) => modifyColor(color)))
      stock != [] && (dataSet["stock"] = stock.map(st => modifyStock(st)))
      console.log(dataSet.images)
      dataSet.images != [] && adaptedImages(dataSet.images)
     } catch (error) {console.log(error)}
    return dataSet
}

export const adaptSalesmanModel = (dataSet, origin, isActive) => {
  !dataSet.createdBy && (dataSet["createdBy"] = stored?.user.email)
  !dataSet.createdDate && (dataSet["createdDate"] = date)
  dataSet["modifiedDate"]= date
  dataSet["fullname"] = dataSet.name + " "+ dataSet.lastName
  dataSet["isActive"] = isActive
  dataSet["isWizard"] = origin  == "wizard" ? true : false
  return dataSet
}

export const adaptImplementationModel = (step)=>{
  console.log(step)
  return {
  isActive: true,
  createdBy: stored?.user.email,
  modifiedBy: stored?.user.email,
  idCompany: stored?.company.id,
   implementationStep: step,
   initial: date,
   end: date,
   success: true
  }
}

export const adaptDelegateModel = (idUser)=> {
  return  {
    isActive: true,
    createdBy:	stored?.user.email,
    modifiedBy:	stored?.user.email,
    idCompany: stored?.user.company.id,
    idUser: idUser,
    startDelegation: date,
    endDelegation: date
}
}

export const adaptCategoryModel = (dataSet, base64)=> {
 console.log(base64)
  const getUrl = async (value)=> 
    {try {
      const data ={name: `companyImage${Date.now()}`, "base64": value, "imageType": 1}
      const url  = await postImage(data).then(res => res.data)
      console.log(url)
      dataSet["avatar"] = url
      } catch (error) {console.log(error)}}
    base64 && getUrl(base64)
    dataSet["modifiedBy"]= stored?.user.email
    return dataSet
    }

export const adaptFileModel =(idFolder, name, url)=>{
  const file = fileModel
  file.name = name
  file.idFolder = idFolder
  file.url = url
  return file
}

export const adaptLibraryModel = (name) =>{
  const library = libraryModel
  library.name = name
   return library
}

export const adaptNewCartModel= (dataSet, product, customer) => {
  console.log(customer)
  dataSet["status"] = 0
  dataSet["idCompany"]=  store.idCompany
  dataSet["idProduct"] = product.id
  dataSet["idCustomer"]= customer.id
  dataSet["fUllname"] = customer.firstName + " " + customer.lastName
  dataSet["address"] = customer.address + ", " + customer.cityData.name
  dataSet["cellphone"]= customer.cellphone,
  dataSet["idCity"]= customer.idCity,
  dataSet["docDate"]= date
  dataSet["app"]= 1
  dataSet["lines"]=   dataSet["lines"]= [
    {
      isActive: true,
      idCompany: store.idCompany,
      createdBy: "SalesTunnel",
      modifiedBy:"SalesTunnel",
      idCustomer: customer.id,
      idProduct: product.id, 
      lineNum: 1,
      productName: product.name,
      quantity: 1,
      price: product.price,
      taxRate: 0,
      taxValue: 0,
      discPrcnt: 0,
      discValue: 0,
      total: product.price,
      idPreOrder: dataSet.id
    }]
    console.log(dataSet)
    return dataSet 
}

export const adaptAddingCartModel= (dataSet, product, userId, quantity, origin) => {
  dataSet["status"] = 0
  const quant = quantity ?  quantity  : 1
  dataSet["app"]= dataSet.app + 1
  dataSet["lines"].push( {
      isActive: true,
      idCompany: origin == "salesTunnel" ? store.idCompany : stored?.company.id,
      createdBy: origin == "salesTunnel"?  "SalesTunnel": stored?.user.email,
      modifiedBy: origin == "salesTunnel"?  "SalesTunnel": stored?.user.email,
      idCustomer: userId,
      idProduct: product.id, 
      lineNum: dataSet.lines.length,
      productName: product.name,
      quantity: quant,
      price: product.price,
      taxRate: 0,
      taxValue: 0,
      discPrcnt: 0,
      discValue: 0,
      total: 0,
      idPreOrder: dataSet.id
    })
    return dataSet
}

export const adaptquantityChangeCartModel= (dataSet, productId, quantity, price) => {
  const index = dataSet.lines.findIndex(item => item.idProduct == productId);
  dataSet["status"] = 0
  dataSet["lines"][index].quantity= quantity
  dataSet["lines"][index].price = price
  return dataSet 
}

export const adaptDeleteCartModel= (dataSet, productId) => {
  dataSet["status"] = 0
  const newLines = dataSet.lines.filter(item => item.idProduct != productId)
  newLines.map(item => {delete item.id; delete item.idPreOrder})
  dataSet["app"]= dataSet.app -1
  dataSet["lines"]= newLines
  return dataSet
}

export const adaptNavigationModel = (dataSet, section, idLayout, uuid, time, timeSpent, type, isPurchase, idPreOrder ) => {
    dataSet["section"] = section;
    dataSet["idLayout"] = idLayout?  idLayout : 1;
    dataSet["guid"] = uuid;
    dataSet["time"] = time
    dataSet["totalTime"] = timeSpent;
    dataSet["typeNavigation"] = type
    dataSet["isPurchase"]= isPurchase ? isPurchase : false;
    dataSet["idPreOrder"]= idPreOrder ? idPreOrder : null;
    return dataSet
}

export const adaptFinishCartModel= (dataSet, score, address) => {
  let status = 1
  if (policies){
    if(score < policies.min ){status = 13}
    else if ( score <= policies.mid) { status = 12}
    else {status = 1}
  }
  console.log(status)
  dataSet.status = status
  dataSet.address = address
  return dataSet
}

export const adaptPhoneModel = (dataSet, phone, id)=>{
  dataSet["phone"]= phone, 
  dataSet["whatsappID"]= id
  return dataSet
}

export const adaptPolicyModel = (dataSet, policy)=>{
  dataSet["minimalValue"]= policy.min, 
  dataSet["mediumValue"]= policy.mid
  dataSet["ammount"]= policy.amount, 
  dataSet["description"]= policy.description
  return dataSet
}
export const adaptPixelModel = (dataSet, pixel)=>{
  dataSet["plattform"]= pixel.plattform, 
  dataSet["pixelId"]= pixel.pixelId
  dataSet["accessToken"]= pixel.accessToken, 
  dataSet["description"]= pixel.description
  return dataSet
}