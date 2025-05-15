import { AuthLayout} from "../../../../shared/components/uikit/auth-layout"
import logo from "../../../../assets/gallery-icon.png"
import { Avatar } from "../../../../shared/components/uikit/avatar"
import { Button } from "../../../../shared/components/uikit/button.jsx"
import { Field, Label } from '../../../../shared/components/uikit/fieldset'
import { Heading } from '../../../../shared/components/uikit/heading'
import { Input } from '../../../../shared/components/uikit/input'
import { useState } from "react";
import { Loader} from "../Loader/Loader.jsx"
import { validateEmail } from "../../../../shared/utils/utils.jsx"
import { NavLink } from "react-router-dom"

export const LoginForm = ()=> {
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null)
    const [password, setPassword] = useState(null)
    const companyInfo={}

    const handleClick=(e)=>{
        e.preventDefault()
        setLoading(true)
        setError(null)
        const verifyEmail = validateEmail(user)
        if(verifyEmail) {setError(verifyEmail)  
        }else {console.log("login")}
        setLoading(false)}

    return (
    <AuthLayout >
        <div className="flex-row sm:grid sm:grid-cols-2 sm:items-start sm:gap-x-8">
        <NavLink to="/store">
        {companyInfo?.url ? <img className="mx-auto h-16 rounded-md w-auto bg-gray-400 px-20" src={logo} alt="Your Company"/>: 
      <Avatar src={logo} className="size-24 sm:size-60 md:size-80 justify-self-center py-0"/>}
        </NavLink>
      <div className="grid w-full max-w-sm grid-cols-1 gap-3">
  
      <Heading className="py-0">Iniciar sesión</Heading>

      <Field>
          <Input placeholder="Email" type="email" className="my-3" name="email" disabled={loading} required onChange={(e)=> setUser(e.target.value)}/>
          <Input placeholder="Contraseña" type="password" id="password" className="my-3 py-0" name="password" disabled={loading} required  onChange={(e)=> setPassword(e.target.value)}/>
        </Field>
        <Button type="submit" className="w-xs md:w-sm" onClick={(e)=>handleClick(e)} disabled={loading || !user || !password}>
        {loading ? <Loader /> :"Iniciar Sesión"}
        </Button>
        <NavLink to="/store/signup" className="hover:underline text-zinc-800 text-sm">Aún no tengo una cuenta</NavLink>
        <p className={`text-red-700 text-sm my-5 ${error ? "visible": "invisible"}`}>Ups! Algo salió mal: {error}. Intenta de nuevo</p>
        </div></div>
      </AuthLayout>
    )
}