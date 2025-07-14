import { AuthLayout as Layout} from "../../../../shared/components/uikit/auth-layout"
import { Button } from "../../../../shared/components/uikit/button.jsx"
import { Avatar} from "../../../../shared/components/uikit/avatar.jsx"
import logo from "../../../../assets/gallery-icon.png"
import { Field, Label } from '../../../../shared/components/uikit/fieldset'
import { Heading } from '../../../../shared/components/uikit/heading'
import { Input } from '../../../../shared/components/uikit/input'
import { useState } from "react";
import { validateEmail } from "../../../../shared/utils/utils.jsx"
import { NavLink, useNavigate } from "react-router-dom"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage.js"
import { Loader } from "../Loader/Loader.jsx"
import { getByCompanyId, post } from "../../../../shared/services/API/landingApi.js"
import { getFavorites,} from "../../services/storeApi.js"
import { setStoreUser} from "../../../../shared/services/cookies.js"
import { filtercarts, filterFavorites} from "../../utils/functions.js"

export const  TemporaryUserForm = ()=> {
    const nav = useNavigate()
    const [loading, setLoading] = useState(false)
    const [stored] = useLocalStorage("storeCompany")
    const [error, setError] = useState(null)
    const [favorites, setFavorites] = useLocalStorage("favorites")
    const [cart, setCart] = useLocalStorage("cart", null)
    const [dataset, setDataset] = useState({isActive: true, createdBy: "System", modifiedBy: "System", idCompany: stored?.company?.id,
          password: "temporalPass2025.", dni: "none", address: "none",
})
    const save= async() =>{
        setLoading(true)
        setDataset(prev => ({...prev, ["fullname"] : dataset.firstname + " " + dataset.lastname}))
        const verifyEmail = validateEmail(dataset?.email)
      if(verifyEmail) {setError(verifyEmail) 
      }else {
        const res = await post("Customer", dataset).then(res => res)
        if (res.isValid) {
            await setStoreUser(res.data.id.toString()) 
            await getByCompanyId("Orders", stored?.company.id).then(response=> setCart(filtercarts(response.data, res.data.id)))
            await getFavorites(stored?.company.id, res.data.id).then(response => setFavorites(filterFavorites(response.data)))
            nav(-1)
        }else { setError(res?.errorMessages[0] ? res?.errorMessages[0] : " ")
            if(res?.errorMessages[0] == 'E-mail ya registrado' || res?.errorMessages[0] == "Celular ya registrado"){
                 await new Promise(resolve => setTimeout(resolve, 2000));
                nav("/store/login")
            } }
        setLoading(false)}
    }
 
    return (
        <Layout>
        <div className="flex-row sm:grid md:grid-cols-2 sm:items-start sm:gap-x-1 justify-items-center w-[99vw] self-start">
                <div onClick={()=>nav("/store")} >
                {stored?.company?.urlLogo ? <Avatar src={stored?.company.urlLogo} className="size-24 sm:size-60 md:size-80 justify-self-center py-0"/>
                :<Avatar src={logo} className="size-30 sm:size-40 md:size-50 justify-self-center py-0"/>}
                </div>
               <Field className="grid w-fit max-w-2xl gap-3 justify-items-center">
      <Field className="w-full max-w-md justify-self-center  p-5 rounded-lg " >
        <Heading className="py-0 pt-1 justify-self-center">Crear cuenta temporal</Heading>
        <Input placeholder="Nombre"  className="my-3 " name="name" disabled={loading} required onChange={e=> setDataset(prev => ({...prev, ["firstname"] : e.target.value}))}/>
        <Input placeholder="Apellido"  className="my-3 " name="lastname" disabled={loading} required onChange={e=> setDataset(prev => ({...prev, ["lastname"] : e.target.value}))}/>
        <Input placeholder="Teléfono" type="tel" className="my-3" name="phone" disabled={loading} required onChange={e=> setDataset(prev => ({...prev, ["cellphone"] : e.target.value}))}/>
        <Input placeholder="Email" type="email" className="my-3" name="email" disabled={loading} required onChange={e=> setDataset(prev => ({...prev, ["email"] : e.target.value}))}/>
        <div className="flex">
            <Button type="submit" className="w-xs mx-1" onClick={save} disabled={loading || !dataset.cellphone || !dataset.email|| !dataset.firstname|| !dataset.lastname }>
        {loading ? <Loader /> :"Iniciar Sesión"}
        </Button>
        <Button className="w-xs mx-1" onClick={()=> nav(-1)}>Cancelar</Button>  
        </div>
         </Field>
        <div>
        <NavLink to="/store/login" className="hover:underline text-zinc-800 text-sm mr-2">Ya tengo una cuenta</NavLink>
        |
        <NavLink to="/store/signup" className="hover:underline text-zinc-800 text-sm ml-2">Crear Cuenta</NavLink>
        </div>
        {error && <p className={`text-red-700 text-sm my-5 `}>Ups! Algo salió mal: {error}. Intenta de nuevo</p>}
        </Field>
                </div>
             
        </Layout>
    )
}