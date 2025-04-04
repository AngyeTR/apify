export const productModel= 
{
    isActive: true,
    createdDate:  "",
    modifiedDate: "",
    createdBy:	"",
    modifiedBy:	"",
    id: 0,
    idCompany: 0,
    company: {},
    idManufacturer: 0,
    manufacturer: {},
    name: "",
    reference: "",
    description: "",
    isSizes: true,
    isColors: true,
    guid: "",
    groupGuid:  "",
    images: [],
    colors:	[],
    prices:	{},
    stock: {}
}

export const warehouseModel = {
    isActive: true,
    createdDate:  "",
    modifiedDate: "",
    createdBy:	"",
    modifiedBy:	"",
    id: 0,
    name: "",
    idCompany: 0,
    idCity: 0,
    city: {},
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
    idCompany: 0,
    firstName: "",
    lastName: "",
    fullname: "",
    idProfile: 0,
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
    id: 0,
    name: "",
    idSegment: 0,
    segment: {},
    urlLogo: "",
    principalColor: "",
    secondaryColor:	""
        }