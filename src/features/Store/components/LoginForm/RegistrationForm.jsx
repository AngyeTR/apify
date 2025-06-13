import { AuthLayout} from "../../../../shared/components/uikit/auth-layout"
import logo from "../../../../assets/gallery-icon.png"
import { Avatar } from "../../../../shared/components/uikit/avatar"
import { Button } from "../../../../shared/components/uikit/button.jsx"
import { Field, Label } from '../../../../shared/components/uikit/fieldset'
import { Heading } from '../../../../shared/components/uikit/heading'
import { Input } from '../../../../shared/components/uikit/input'
import { useState } from "react";
import { validateEmail } from "../../../../shared/utils/utils.jsx"
import { NavLink, useNavigate } from "react-router-dom"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage.js"
import { Loader } from "../Loader/Loader.jsx"
import { getByCompanyId, getFavorites, post } from "../../../../shared/services/API/api.js"
import { setStoreUser } from "../../../../shared/services/cookies.js"
import { filtercarts } from "../../utils/functions.js"

export const RegistrationForm = ()=> {
  const nav = useNavigate()
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)
  const [stored] = useLocalStorage("data")
  const [favorites, setFavorites] = useLocalStorage("favorites")
  const [cart, setCart] = useLocalStorage("cart", null)
  const [dataset, setDataset] = useState({isActive: true, createdBy: "System", modifiedBy: "System", idCompany: stored?.company.id})
    
 
    const handleClick= async (e)=>{
      e.preventDefault()
      setLoading(true)
      setError(null)
      const verifyEmail = validateEmail(dataset?.email)
      if(verifyEmail) {setError(verifyEmail) 
      }else {
        const fullName = (dataset.firstName && dataset.lastName) ? dataset.firstName + " " + dataset.lastName: null
        setDataset(prev => ({...prev, ["fullname"] : fullName})) 
        const res = await post("Customers", dataset).then(res=> res)
        res.isValid ? setStoreUser(res.data.id) : setError("algo salió mal. Intenta de nuevo")
        res.isValid && await getByCompanyId("PreOrders", stored?.company.id).then(response=> setCart(filtercarts(response.data, res.data.id)))
        res.isValid &&  await getFavorites(stored?.company.id, res.data.id).then(response => setFavorites(filterFavorites(response.data)))
        res.isValid && nav(-1)
      }
      setLoading(false)}

    return (
    <AuthLayout >
      <div className="flex-row sm:grid sm:grid-cols-2 sm:items-start sm:gap-x-8 justify-items-center self-start">
        <div onClick={()=>nav("/store")}>
        {stored?.company?.urlLogo ? <Avatar src={stored?.company.urlLogo} className="size-30 sm:size-60 md:size-80 justify-self-center py-0"/>
        :<Avatar src={logo} className="size-24 sm:size-60 md:size-80 justify-self-center py-0"/>}
        </div>
      <Field className="grid w-full max-w-sm grid-cols-1 gap-3">
      <Heading className="py-0 pt-1 justify-self-center">Crear Cuenta</Heading>

      <Field>
          <Input placeholder="Nombre" className="my-3" name="firstname" disabled={loading} required onChange={e=> setDataset(prev => ({...prev, ["firstName"] : e.target.value}))}/>
          <Input placeholder="Apellido" className="my-3" name="lastname" disabled={loading} required onChange={e=> setDataset(prev => ({...prev, ["lastName"] : e.target.value}))}/>
          <Input placeholder="Email" type="email" className="my-3" name="email" disabled={loading} required onChange={e=> setDataset(prev => ({...prev, ["email"] : e.target.value}))}/>
          <Input placeholder="Teléfono" type="tel" className="my-3" name="phone" disabled={loading} required onChange={e=> setDataset(prev => ({...prev, ["cellphone"] : e.target.value}))}/>
          <Input placeholder="Identificación" className="my-3" name="dni" disabled={loading} required onChange={e=> setDataset(prev => ({...prev, ["dni"] : e.target.value}))}/>
          <Input placeholder="Dirección" className="my-3" name="address" disabled={loading} required onChange={e=> setDataset(prev => ({...prev, ["address"] : e.target.value}))}/>
          <Input placeholder="Contraseña" type="password" id="password" className="my-3 py-0" name="password" disabled={loading} required  onChange={e=> setDataset(prev => ({...prev, ["password"] : e.target.value}))}/>
       </Field>
        <Button type="submit" className="w-xs md:w-sm" onClick={(e)=>handleClick(e)} disabled={loading || !dataset.email || !dataset.password}>
        {loading ? <Loader /> :"Iniciar Sesión"}
        </Button>
        <NavLink to="/store/login" className="hover:underline text-zinc-800 text-sm">Ya tengo una cuenta</NavLink>
        <p className={`text-red-700 text-sm my-5 ${error ? "visible": "invisible"}`}>Ups! Algo salió mal: {error}. Intenta de nuevo</p>
        </Field>
        </div>
      </AuthLayout> 
    )
}