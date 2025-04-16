import {  useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import { getLogin } from "../../services/API/api";
import logo from "../../assets/logo.avif"
import { adjustLoginData, validateEmail } from "../../utils/functions.jsx";
import { useNavigate } from "react-router-dom";
import { MyLoader } from "./MyLoader";
import { setToken } from "../../services/cookies.js";
import { AuthLayout } from "../auth-layout.jsx"
import { Button } from "../button.jsx"
import { Field, Label } from '../fieldset'
import { Heading } from '../heading'
import { Input } from '../input'
import { Strong, Text, TextLink } from '../text'

export function LoginForm() {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useLocalStorage("data", null)
  const [mods, setMods] = useLocalStorage("modules", null)
  const [modules, setModules] = useLocalStorage("alteredModules", null)
  const nav = useNavigate()
  const handleClick = async (e)=>{
    e.preventDefault()
    setLoading(true)
    setError(null)
    const response = await getLogin(user, password)
    if(response?.response?.isValid){
    await setToken(response.token.token.toString(), response.token.expiredDate.toString())
    await setData(adjustLoginData(response))
    let adaptedModules = {}
    response.options.map(module=>{adaptedModules[module.module.name] = {options:[], id: module.module.id, name:module.module.name}})
    response.options.map(module => adaptedModules[module.module.name].options.push(module.name))
    await setMods(response.options)
    await setModules(adaptedModules)
    setError(null)
    nav(!response.implementation.success && response.user.idProfile ==1  ? "/wizard" : "/" )
    nav(0)
    }   else setError(response.response.message);
    setLoading(false)    
  }

  return (
    <AuthLayout>
      <Field className="grid w-full max-w-sm grid-cols-1 gap-8">
      <img className="mx-auto h-16 rounded-md w-auto bg-gray-400 px-20" src={logo} alt="Your Company"/>
      <Heading>Iniciar sesión</Heading>
      <Field>
          <Label className="my-0">Email</Label>
          <Input type="email" className="my-0" name="email" disabled={loading} required onChange={(e)=> setUser(e.target.value)}/>
          <Label className="my-0 py-0">Contraseña</Label>
          <Input type="password" id="password" className="my-0 py-0" name="password" disabled={loading} required  onChange={(e)=> setPassword(e.target.value)}/>
        </Field>
        <div className="flex items-center justify-between">
          <Text>
            <TextLink href="#">
              <Strong>Recuperar contraseña</Strong>
            </TextLink>
          </Text>
        </div>
        <Button type="submit" className="w-xs md:w-md" onClick={(e)=>handleClick(e)} disabled={loading || !user || !password}>
        {loading ? <MyLoader /> :"Iniciar Sesión"}
        </Button>
        <p className={`text-red-700 text-sm my-5 ${error ? "visible": "invisible"}`}>Ups! Algo salió mal: {error}. Intenta de nuevo</p>
        </Field>
      </AuthLayout>
  )
}