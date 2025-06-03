import {  useState } from "react";
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage.js";
import { getLogin } from "../../../../shared/services/API/api/";
import logo from "../../../../assets/logo.avif"
import { adjustLoginData } from "../../utils/functions.jsx";
import { validateEmail} from "../../../../shared/utils/utils.jsx"
import { useNavigate } from "react-router-dom";
import { MyLoader } from "./MyLoader";
import { setToken } from "../../../../shared/services/cookies.js";
import { AuthLayout } from "../../../../shared/components/uikit/auth-layout.jsx"
import { Button } from "../../../../shared/components/uikit/button.jsx"
import { Field, Label } from '../../../../shared/components/uikit/fieldset'
import { Heading } from '../../../../shared/components/uikit/heading'
import { Input } from '../../../../shared/components/uikit/input'
import { Strong, Text, TextLink } from '../../../../shared/components/uikit/text'

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
    nav(!response.implementation.success && response .user.idProfile ==1  ? "/dashboard/wizard" : "/dashboard" )
    nav(0)
    }   else setError(response?.response?.message ? response.response.message : "Error de red" );
    setLoading(false)    
  }

  return (
    <AuthLayout>
      <Field className="grid w-full max-w-md grid-cols-1 gap-8 justify-items-center">
      <img className="mx-auto h-16 rounded-md w-auto bg-gray-400 px-20" src={logo} alt="Your Company"/>
      <Heading>Iniciar sesión</Heading>
      <Field className="w-sm">
          <Label className="my-0 ">Email</Label>
          <Input type="email" className="my-0 " name="email" disabled={loading} required onChange={(e)=> setUser(e.target.value)}/>
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