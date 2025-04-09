export const productModel= 
{
    isActive: true,
    createdBy:	"",
    modifiedBy:	"",
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
    prices:	[],
    stock: []
}

export const warehouseModel = {
    isActive: true,
    createdBy:	"",
    modifiedBy:	"",
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
    createdBy:	"",
    modifiedBy:	"",
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
    modifiedDate: "",
    createdBy:	"",
    modifiedBy:	"",
    name: "",
    idSegment: 0,
    urlLogo: "",
    principalColor: "",
    secondaryColor:	""
        }

export const manufacturerModel= {
    createdBy: "",
    modifiedBy: "",
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