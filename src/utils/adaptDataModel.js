const rawData = window.localStorage.getItem("data")
const stored = JSON.parse(rawData)
const date= new Date().toISOString()


export const adaptWarehouseModel = (dataSet, country, state, selectedCity) =>{
    const city = {
     id : 	selectedCity.id,
     name: selectedCity.name,
     code: selectedCity.code,
     idState:  selectedCity.idState,
     state: {
       idState: state.id,
       name: state.name,
       code: state.code,
       country: {
         id: country.id,
         name: country.name,
         code: country.code}}
    }
   dataSet["createdDate"] = date
   dataSet["modifiedDate"] = date
   dataSet["createdBy"] = stored.user.name
   dataSet["createdBy"]= "string"
   dataSet["idCompany"]= stored.company.id
   dataSet["idCity"] = city.id
   dataSet["city"] = city  
   return dataSet
}

export const adaptCompanymodel = (dataSet, segment)=> {
    dataSet["id"] = stored.company.id
    dataSet["name"] = stored.company.name
    dataSet["idSegment"]= parseInt(segment.id)
    dataSet["segment"] = segment
    return dataSet
}

export const adaptUserModel = (dataSet) => {
        dataSet["createdDate"] = date
        dataSet["modifiedDate"] = date
        dataSet["createdBy"] = stored.user.name
        dataSet["createdBy"]= "string"
        dataSet["idCompany"]= stored.company.id
        dataSet["id"] = 15
        return dataSet
    }

export  const adaptProductModel = (dataSet) => {
    dataSet["createdDate"] = date
    dataSet["modifiedDate"] = date
    dataSet["createdBy"] = stored.user.name
    dataSet["createdBy"]= "string"
    dataSet["idCompany"]= stored.company.id
    dataSet["company"]= stored.company
    // isActive: true,
    // id: 0,
    // idManufacturer: 0,
    // manufacturer: {},
    // isSizes: true,
    // isColors: true,
    // guid: "",
    // groupGuid:  "",
    // images: [],
    // colors:	[],
    // prices:	{},
    // stock: {}
    return dataSet

}

    
