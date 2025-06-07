import {  HiCalculator, HiCog, HiBell, HiChartPie, HiGlobeAlt, HiLibrary } from "react-icons/hi";

export const adjustLoginData = (data)=>{
    const newData = {
        company : {
            id: data.company?.id,
            name: data.company?.name,
            urlLogo: data.company?.urlLogo,
            principalColor: data.company?.principalColor,
            secondaryColor: data.company?.secondaryColor,
            idSegment: data.company?.idSegment },
        user: {
            firstName: data.user?.firstName,
            lastName: data.user?.lastName, 
            fullname: data.user?.fullname,
            email: data.user?.email,
            isActive: data.user?.isActive,
            id: data.user?.id,
            avatar: data.user?.avatar,
            company: {id:data.company.id, name: data.company.name}},
        subscription: {
            id: data.suscription?.id,
            type: data.suscription?.suscriptionType.name,
            maxUsers: data.suscription?.suscriptionType.maxUsers,
            maxWarehouse: data.suscription?.suscriptionType.maxWarehouse,
            endDate: data.suscription?.detail[0].endDate,
            startDate: data.suscription?.detail[0].startDate,},
        delegated: [],
        implementation: {
            implementationStep: data.implementation?.implementationStep,
            success:  data.implementation?.success},
        }
    return newData
    }

export const getModuleIcon = (id)=>{
    const modules = {
        // calculator: <HiCalculator className="size-6 shrink-0"/> ,
        1: {icon: <HiCog className="text-zinc-500 size-6 shrink-0  hover:text-zinc-950"/>, url: "/dashboard/settings"},
        2:{icon:   <HiBell className=" text-zinc-500 size-6 shrink-0 hover:text-zinc-950"/> , url:"/dashboard/marketing" }, 
        // analytics: <HiChartPie className="size-6 shrink-0"/>,
        // logistics: <HiGlobeAlt  className="size-6 shrink-0"/>,
        // store: <HiLibrary className="size-6 shrink-0"/>,
      }
      return modules[id] 
}

export const getTranslate= (name)=>{
    const dictionary = {
        general: "general",
        sedes: "offices",
        usuarios: "users",
        campañas: "salestunnel",
        diseñador: "designers",
        marketing: "marketing",
        configuración: "settings",
        vendedores: "salesman", 
        "not-found": "not-found"
    }
    return dictionary[name] ?  dictionary[name] : "not-found"
}

export const getModuleId = (name)=>{
    const dictionary = {
        settings: {id: 1, name:"Configuración"} ,
        marketing:{id: 2, name: "Marketing"}
    }
    return dictionary[name]
}

export const getTableHeaders = (name)=>{
    const dictionary = {
    products: [["Actions", "Activo", "Nombre", "Referencia", "Descripción"],["id" ,"isActive", "name", "reference", "description" ]],
    warehouses: [["Actions", "Activo","Nombre", "Dirección", "Teléfono", "Encargad@"], ["id" , "isActive","name", "address", "cellphone", "contactName"]],
    users: [["Actions", "Activo","Nombre", "Email", "Rol"], ["id" , "isActive","fullname", "email", "idProfile"]], 
    salesman: [["Actions","Activo","Nombre", "Email",], ["id" , "isActive","fullname", "email"]],
    offices: [["Actions", "Activo","Nombre", "Dirección", "Teléfono", "Encargad@"], ["id" ,"isActive","name", "address", "cellphone", "contactName"]],
    salestunnel: [["Acciones", "Nombre", "Fecha de Inicio", "Fecha de Fin", "Tuneles"], ["id", "name", "startDate", "endDate", "tunnels"]],
    tunnels: [["Acciones", "Nombre", "Fecha de Inicio", "Fecha de Fin", "producto", "orderBound", "UpSell", "DonwSell"], ["id", "name", "startDate", "endDate", "tunnels"]]}
    return dictionary[name]
}

export const getDataToShow = (data, name) => {
    let newData = []
    const keys = getTableHeaders(name)
     const campaignData = [[1, "Campaña 1", "2025-06-05T14:13", "2025-06-15T14:13", 2], [2, "Campaña 2", "2025-06-05T14:13", "2025-06-15T14:13", 6], [3, "Campaña 3", "2025-06-05T14:13", "2025-06-15T14:13", 20]]
    name == "salestunnel" ? newData = campaignData : name == "tunnels" ? newData = []: data?.map((item => newData.push(keys[1].map(key=> key == "isActive" ? (item["isActive"] ? "Activo" : "Inactivo") : item[key]))))
    return [newData, keys[0]]
}

export const getIsTable = (name)=>{
    const dictionary = ["products", "warehouses", "users", "salesman", "offices",]
    return dictionary?.includes(name)
}
export const getUpdatedLocalData = (data, newData)=>{
    data.company.id = newData.id
    data.company.idSegment = newData.idSegment
    data.company.name = newData.name
    data.company.principalColor = newData.principalColor
    data.company.secondaryColor = newData.secondaryColor
    data.company.urlLogo = newData.urlLogo
    return data
}
export const getUpdatedLocalUser = (data, newData)=>{ 
    data.user.lastname = newData.lastname
    data.user.name= newData.firstName
    data.user.fullname = newData.fullname
    data.user.avatar = newData.avatar
    return data
}



