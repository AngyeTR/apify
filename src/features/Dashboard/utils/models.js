export const productModel= 
{
    isActive: true,
    createdBy:	null,
    modifiedBy:	null,
    idCompany: null,
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
    modifiedBy:	null,
    name: "",
    idCompany: null,
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
    modifiedBy:	null,
    idCompany: null,
    firstName: "",
    lastName: "",
    fullname: "",
    idProfile: null,
    email: "",
    password: "",
    avatar: ""
    }

export const companyModel = {
    isActive: true,
    createdDate:  "",
    createdBy:	null,
    modifiedBy:	null,
    modifiedBy:	"",
    name: "",
    idSegment: 0,
    urlLogo: "",
    principalColor: "",
    secondaryColor:	""
        }

export const manufacturerModel= {
    createdBy:	null,
    modifiedBy:	null,
    idCompany: 0,
    name: ""
  }

export const  salesModel = {
    isActive: true,
    createdDate:  "",
    idCompany: null,
    name: "",
    lastName: "",
    fullname: "",
    email: "",
}

export const implementation = {
    isActive: true,
    createdBy:	null,
    modifiedBy:	null,
    idCompany: 0,
     implementationStep: 0,
     initial: "",
     end: "",
     success: true
}

export const officeModel = {
    isActive: true,
    createdBy:	null,
    modifiedBy:	null,
    name: "",
    idCompany: null,
    idCity: null,
    address: "",
    cellphone: "",
    contactName: "",
    latitude: "",
    longitude: "",
}