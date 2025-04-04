import {  useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import { getLogin } from "../../services/API/api";
import logo from "../../assets/logo.avif"
import { adjustLoginData } from "../../utils/functions.jsx";
import { useNavigate, Navigate } from "react-router-dom";
import { MyLoader } from "./MyLoader";
import { getToken, setToken } from "../../services/cookies.js";

export const LoginForm = ()=>{
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useLocalStorage("data", null)
    const [mods, setMods] = useLocalStorage("modules", null)
    const nav = useNavigate()
    const handleClick = async (e)=>{
        e.preventDefault()
        setLoading(true)
        const response = await getLogin(user, password)
        if(response?.response?.isValid){
            await setToken(response.token.token.toString(), response.token.expiredDate.toString())
            await setData(adjustLoginData(response))
            await setMods(response.options)
            setError(false)
            // nav(!response.implementation.success ? "/" : "/wizard")
            nav("/")
            nav(0)
        }   else setError(true);
        setLoading(false)    
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8  justify-self-center ">
            <div className="shadow-lg w-md pb-15 ">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
                    <img className="mx-auto h-16 rounded-md w-auto bg-gray-400 px-20" src={logo} alt="Your Company"/>
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-800">Iniciar sesión</h2>
                </div>
                <form className="space-y-6 mt-10 sm:mx-auto sm:w-full sm:max-w-sm" >
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 m-0 p-0 mt-5">Email</label>
                    <input disabled={loading} type="email" name="email" id="email" autoComplete="email" required onChange={(e)=> setUser(e.target.value)}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 m-0 p-0 mt-5">Contraseña</label>
                    <input type="password" disabled={loading} name="password" id="password" autoComplete="current-password" required  onChange={(e)=> setPassword(e.target.value)}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                    <button type="submit" onClick={(e)=>handleClick(e)} disabled={loading || !user || !password}
                        className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-200 disabled:text-gray-500">{loading ? <MyLoader />:"Iniciar Sesión"}</button>
                    <a href="#" className="font-semibold text-gray-600 hover:text-gray-500">Recuperar contraseña</a>
                </form>
                <p className={`text-red-700 text-sm my-5 ${error ? "visible": "invisible"}`}>Ups! Algo salió mal. Intenta de nuevo</p>
            </div>
        </div>
    )
}