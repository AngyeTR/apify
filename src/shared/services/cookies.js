import Cookies from "universal-cookie"

const cookies = new Cookies();

/////// Auth  ///////
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

/////// StoreUser  ///////
export const  getStoreUser = () => {
    return cookies.get("store-user")
}

export const setStoreUser = async (value) => {
     if(value == null){cookies.remove("store-user", { path: '/' })} 
     else {cookies.set("store-user", value, {path:"/"} ) }
}

export const deleteStoreUser = () => {
     cookies.remove("store-user", { path: '/' })
     cookies.remove("store-token", { path: '/' })
}

/////// StoreToken  ///////
export const  getStoreToken = () => {
    return cookies.get("store-token")
}

export const setStoreToken = async (value) => {
     if(value == null){cookies.remove("store-user", { path: '/' })} 
     else {cookies.set("store-token", value, {path:"/"} ) }
}

/////// FBP  ///////
export const  getFbp = () => {
    return cookies.get("_fbp")
}

export const setFbp =async (value)=> {
      cookies.set('fbp', value, { path: '/', sameSite: 'Lax' });
}
