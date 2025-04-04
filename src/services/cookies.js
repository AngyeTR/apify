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