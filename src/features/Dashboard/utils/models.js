const rawData = window.localStorage.getItem("data")
const stored = JSON.parse(rawData)

export const productModel= 
{
    isActive: true,
    createdBy:	null,
    modifiedBy:	 stored?.user.email,
    idCompany:  stored?.company.id,
    idManufacturer: null,
    name: "",
    reference: "",
    description: "",
    isSizes: false,
    isColors: false,
    idManufacturer: null,
    images: [],
    colors:	[],
    sizes:	[],
    prices:	[],
    stock: []
}

export const warehouseModel = {
    isActive: true,
    createdBy:	null,
    modifiedBy:	stored?.user.email,
    idCompany:  stored?.company.id,
    name: "",
    idCity: null,
    address: "",
    cellphone: "",
    contactName: "",
    latitude: "",
    longitude: "",
}

export const userModel = {
    isActive: true,
    createdDate:  "",
    modifiedDate: "",
    createdBy:	null,
    modifiedBy:stored?.user.email,
    idCompany:  stored?.company.id,
    firstName: "",
    lastName: "",
    fullname: "",
    idProfile: null,
    email: "",
    password: "",
     avatar: "",
    isSalesman: true
    }

export const companyModel = {
    isActive: true,
    createdDate:  "",
    createdBy:	null,
    modifiedBy:	null,
    modifiedBy:	 stored?.user.email,
    id:  stored?.company.id,
    name: "",
    idSegment: 0,
    urlLogo: "",
    principalColor: "",
    secondaryColor:	""
        }

export const manufacturerModel= {
    createdBy:	null,
    modifiedBy:	stored?.user.email,
    idCompany:  stored?.company.id,
    name: ""
  }

export const  salesModel = {
    isActive: true,
    createdDate:  "",
    modifiedBy:	 stored?.user.email,
    idCompany:  stored?.company.id,
    name: "",
    lastName: "",
    fullname: "",
    email: "",
}

export const implementation = {
    isActive: true,
    createdBy:	null,
    modifiedBy:	stored?.user.email,
    idCompany:  stored?.company.id,
     implementationStep: 0,
     initial: "",
     end: "",
     success: true
}

export const officeModel = {
    isActive: true,
    createdBy:	null,
    name: "",
     modifiedBy:	stored?.user.email,
    idCompany:  stored?.company.id,
    idCity: null,
    address: "",
    cellphone: "",
    contactName: "",
    latitude: "",
    longitude: "",
}

export const delegateModel = {
    isActive: true,
    createdBy:	null,
     modifiedBy: stored?.user.email,
    idCompany:  stored?.company.id,
    idUser: 0,
    startDelegation: "",
    endDelegation: ""
}

export const  libraryModel = {
    isActive: true,
    createdBy:	stored?.user.email,
    modifiedBy:	stored?.user.email,
    idCompany:  stored?.company.id,
    name: "Default",
    files: []
}

export const fileModel = {
    isActive: true,
    createdBy:	stored?.user.email,
    modifiedBy:	stored?.user.email,
    idCompany:  stored?.company.id,
    idFolder: 0,
  name: "string",
    url: "string",
  fileType: 1
}

export const campaignModel = {
    isActive: true,
    createdBy:	stored?.user.email,
    modifiedBy:	stored?.user.email,
    idCompany:  stored?.company.id,
    name: null,
    startDate: null,
    endDate: null,
}