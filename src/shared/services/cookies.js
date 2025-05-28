import Cookies from "universal-cookie"

const cookies = new Cookies();

export const  getToken = () => {
    return cookies.get("authentication-token")
}
export const  getTokenExpiration = () => {
    return cookies.get("authentication-expiration")
}

export const setToken = async (value, date) => {
     if(value == null){
          cookies.remove('authentication-token', { path: '/' })
          cookies.remove('authentication-expiration', { path: '/' })
     } else {
           cookies.set("authentication-token", value, {path:"/"} )
           cookies.set("authentication-expiration", date, {path:"/"} )
     }
}

export const deleteToken = () => {
     cookies.remove('authentication-token', { path: '/' })
     cookies.remove('authentication-expiration', { path: '/' })
}

export const  getStoreUser = () => {
    return cookies.get("store-user")
}

export const setStoreUser = async (value) => {
     if(value == null){cookies.remove("store-user", { path: '/' })} 
     else {cookies.set("store-user", value, {path:"/"} ) }
}


export const deleteStoreUser = () => {
     cookies.remove("store-user", { path: '/' })
}