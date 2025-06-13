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
}

export const salesTunnelModel = {
  isActive: true,
  createdBy:	stored?.user.email,
  modifiedBy:	stored?.user.email,
  idCompany:  stored?.company.id,
  idCampaign: null,
  name: null,
  description: null,
  domain: null,
  initialDate: null,
  endDate: null,
  orderBounds: [],
  layouts: [],
  facebookPixel: null,
  tikTokPixel: null,
  abTesting: false,
  paymentOnDelivery: true,
  paymentGateway: true,
}

export const orderBoundModel= { 
    isActive: true,
    createdBy:	stored?.user.email,
    modifiedBy:	stored?.user.email,
    idCompany:  stored?.company.id,
    idProduct: null,
    quantity: null,
    price: null}

export const layoutsModel =  {
    isActive: true,
    createdBy:	stored?.user.email,
    modifiedBy:	stored?.user.email,
    idLayout: null,
    percent: null
    }

 export const upsellModel= {
    isActive: true,
    createdBy:	stored?.user.email,
    modifiedBy:	stored?.user.email,
    idProduct: null,
    quantity: null,
    price: null
  }

  export const downsellModel= {
    isActive: true,
    createdBy:	stored?.user.email,
    modifiedBy:	stored?.user.email,
    idProduct: null,
    quantity: null,
    price: null
  }


  export const pricesModel =  {
    isActive: true,
    createdBy:	stored?.user.email,
    modifiedBy:	stored?.user.email,
    idProduct: null,
    name: null,
    quantity: 1,
    oldPrice: null,
    price: null,
    tagColor: null,
    tagName: null
    }

  export const  CartModel = 
    {
  isActive: true,
  createdBy: "System",
  modifiedBy: "System",
  idCompany: 0,
  idCustomer: 0,
  guid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  docDate: "",
  docTotal: 0,
  app: 0,
  lines: []
}