const rawData = window.localStorage.getItem("data")
const stored = JSON.parse(rawData)
const date= new Date().toISOString()


export const adaptWarehouseModel = (dataSet, country, state, selectedCity, isActive) =>{
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
   dataSet["isActive"] = isActive  
   return dataSet
}

export const adaptCompanymodel = (dataSet, segment)=> {
    dataSet["createdDate"] = date
    dataSet["modifiedDate"] = date
    dataSet["modifiedBy"] = stored.user.name
    dataSet["createdBy"]= stored.user.name
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
        dataSet["createdBy"]= stored.user.name
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
    // dataSet["company"]= stored.company
    // company : {
        // id	[...]
        // name*	[...]
        // idSegment*	[...]
        // segment	: {
            // id	[...]
            // name*	[...}
        // urlLogo	[...]
        // principalColor	[...]
        // secondaryColor	[...]}
    // id: 0,
    // idManufacturer: 0,
    // manufacturer: {
            // isActive	[...]
            // createdDate	[...]
            // modifiedDate	[...]
            // createdBy*	[...]
            // modifiedBy*	[...]
            // id	[...]
            // idCompany*	[...]
            // company	CompanyModel{...}
            // name*	[...]},
    // guid: "",
    // groupGuid:  "",
    // // images: [ {
    //   "isActive": true,
    //   "createdDate": "2025-04-04T19:44:44.311Z",
    //   "modifiedDate": "2025-04-04T19:44:44.311Z",
    //   "createdBy": "string",
    //   "modifiedBy": "string",
    //   "id": 0,
    //   "idProduct": 0,
    //   "product": "string",
    //   "position": 0,
    //   "url": "string",
    //   "isPrincipal": true
    // }],
    // colors:	[ {
        // isActive	[...]
        // createdDate	[...]
        // modifiedDate	[...]
        // createdBy*	[...]
        // modifiedBy*	[...]
        // id	[...]
        // idProduct	[...]
        // product	{...}
        // nombre*	[...]
        // colorCode*	[...]}
    // ],
    // prices : {
        // isActive	[...]
        // createdDate	[...]
        // modifiedDate	[...]
        // createdBy*	[...]
        // modifiedBy*	[...]
        // id	[...]
        // idProduct	[...]
        // product	{...}
        // name*	[...]
        // quantity*	[...]
        // price*	[...]}
    // stock: [
//             {
//                 id	[...]
// idWarehouse	[...]
// // warehouse: {
//     isActive	[...]
//     createdDate	[...]
//     modifiedDate	[...]
//     createdBy*	[...]
//     modifiedBy*	[...]
//     id	[...]
//     name*	[...]
//     idCompany*	[...]
//     idCity*	[...]
//     city	CityDTO{...}
//     address*	[...]
//     cellphone*	[...]
//     contactName*	[...]
//     latitude	[...]
//     longitude	[...]}
// stock	[...
//             }  

//]
    return dataSet

}

    
