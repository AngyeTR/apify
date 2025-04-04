export  const items = [
    {key: "settings", name: "Configuración", options: null}, 
    {key: "store", name: "Tienda", options: [
        {name: "Sedes", key: "branchs"}, 
        {name: "Usuarios", key: "users"},
        {name: "Bodegas", key: "warehouses"},
        {name: "Vendedores", key: "sellers"},
        {name: "Articulos", key: "articles"}]}, 
    {key: "campaigns", name: "Campañas",  options: [
        {name: "Historial", key: "history"}, 
        {name: "Crear Campaña", key: "new-campaign"}, ]}, 
    {key:"calculator", name: "calculadora", options: null},
    {key: "logistics", name: "Logística", options: null},
    {key: "analytics",name: "Analítica", options: null },
 ]


export const events = [
    {name: "Planetaria", link:"https://www.google.com/imghp?hl=es&tab=ri&ogbl"},
    {name: "Protocol", link:"https://www.google.com/imghp?hl=es&tab=ri&ogbl"}, 
    {name: "Tailwind Labs", link:"https://www.google.com/imghp?hl=es&tab=ri&ogbl"}]

export const sampleAdmin = {
    name: "Admin User",
    email: "a@a.com",
    subscription: "plan1",
    subscriptionStatus: "active",
    profile: "admin",
    implementation: {implemented: true, lastStep:6}
}

export const sampleMarketingUser = {
    name: "Marketing User",
    email: "a@a.com",
    subscription: "plan1",
    subscriptionStatus: "active",
    profile: "marketing",
    implementation: {implemented: true, lastStep:6}
}
export const sampleSeller = {
    name: "Sales User",
    email: "a@a.com",
    subscription: "plan1",
    subscriptionStatus: "active",
    profile: "seller",
    implementation: {implemented: true, lastStep:6}
}

export const samplePlan = {
    name: "plan1",
    maxuser: 20,
    maxarticles: 100,
    maxSellers: 10,
}

export const  profiles = {
    admin: {
        permisos: {
        configuracion: [true, true, true, true],
        // Colores de marca, nombre, logo,
        tienda: [true, true, true, true],
            // sedes y sus datos, 
        usuarios:[true, true, true, true],
            // usuarios, datos basicos y permisos asignados segun un perfil
        bodegas: [true, true, true, true],
            // Bodegas con info basica como localización, nombre, persona encargada y contacto
        vendedores: [true, true, true, true],
            // Vendedores con sus datos básicos y si estan en punto fisico o no y si tienen un usuario asignado
        articulos: [true, true, true, true],
            // Articulos con datos basicos como categoria, nombre, referencia, precio, costo (opc), tallas y colores.
        campanas: [true, true, true, true],
            // campañas filtros de público encadenados, fechas, medios,  disparadores
        landing:  [true, true, true, true],
        // Landing para acompañar campañas con su diseñador tipo no-code
        website: [true, true, true, true],
        // Website estandar vinculado al dominio del cliente
        calculadora: [true, true, true, true],
        // Requiere información del cliente como el costo, se puede proporcionar data aprox e histórica - si existe-
        integraciones: [true, true, true, true],
        // Api keys y config necesaria para incorporar otras plataformas y servicios
        logistica: [true, true, true, true],
        // Proveedores de servicio con sus datos principales
        analitica: [true, true, true, true],
        //data básica que puede ser filtrada, contar con alertas personalizadas
        },
        tabs: ["settings", "store", "campaigns","calculator", "logistics", "analytics" ]

    },
    marketing: {
        permisos: {
            configuracion: [false, false, false, false],
        tienda: [false, true, false, false],
        usuarios:[false, false, false, false],
        bodegas: [false, true, false, false],
        vendedores: [false, true, false, false],
        articulos:[false, true, false, false],
        campanas: [true, true, true, true],
        landing:  [true, true, true, true],
        website: [true, true, true, true],
        calculadora: [false, true, false, false],
        integraciones: [false, false, false, false],
        logistica: [false, true, false, false],
        analitica: [true, true, true, true],
        },
        tabs: [ "store", "campaigns","calculator", "logistics", "analytics" ]
        
        },
    seller: {
        permisos: {
            configuracion: [false, false, false, false],
            tienda: [false, true, false, false],
            usuarios:[false, false, false, false],
            bodegas: [false, true, false, false],
            vendedores: [false, true, false, false],
            articulos:[false, true, false, false],
            campanas: [false, false, false, false],
            landing:  [false, true, false, false],
            website: [false, true, false, false],
            calculadora: [false, false, false, false],
            integraciones: [false, false, false, false],
            logistica: [false, true, false, false],
            analitica: [false, false, false, false],
        },
        tabs: ["store" ]
       
        },
    }
