import { Button } from "../../../../shared/components/uikit/button.jsx"
import { Field } from '../../../../shared/components/uikit/fieldset.jsx'
import { Heading } from '../../../../shared/components/uikit/heading.jsx'
import { Input } from '../../../../shared/components/uikit/input'
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage.js"
import { post } from "../../../../shared/services/API/landingApi.js"
import { setStoreUser } from "../../../../shared/services/cookies.js";

export const  TemporaryUserForm = ()=> {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [stored] = useLocalStorage("storeCompany")
    const [dataset, setDataset] = useState({isActive: true, createdBy: "System", modifiedBy: "System", idCompany: stored?.company.id,
        firstName: "Usuario", lastName: "Temporal",fullname: "Usuario Temporal", email : "noemail@noemail.com", password: "temporalPass2025.", dni: "none", address: "none",})
    
    const nav = useNavigate()

    const handleRes= async() =>{
        setLoading(true)
        const res = await post("Customer", dataset).then(res => res)
        console.log(res)
        res.isValid ? setStoreUser(res.data.id) : setError("algo salió mal. Intenta de nuevo")
        res.isValid ? nav(-1) : setLoading(false)}
 
    return (
    <div className="flex-row justify-items-center">
      <Field className="grid w-full max-w-2xl gap-3 justify-items-center">
        <p> Puedes añadir los artículos de tu interés al carrito para no dejarlos pasar</p>
        <p> Si ya tienes una cuenta, puedes iniciar sesión, en caso contrario, puedes crearte una cuenta o generar una sesión temporal</p>
        <Field className="w-full max-w-md justify-self-center border border-zinc-300 p-5 rounded-lg" >
            <Heading className="py-0">Crear usuario temporal</Heading>
            <Input placeholder="Nombre"  className="my-3 " name="name" disabled={loading} required onChange={e=> setDataset(prev => ({...prev, ["fullname"] : e.target.value}))}/>
            <Input placeholder="Teléfono" type="tel" className="my-3" name="phone" disabled={loading} required onChange={e=> setDataset(prev => ({...prev, ["cellphone"] : e.target.value}))}/>
            <div className="flex">
                <Button type="submit" className="w-xs mx-1" onClick={handleRes} disabled={loading || !dataset.cellphone }>
                    {/* {loading ? <Loader /> :"Iniciar Sesión"} */} Crear sesión temporal</Button>
                <Button className="w-xs mx-1" onClick={()=> nav(-1)}>Cancelar</Button>   
            </div>
         </Field>
        <div>
            <NavLink to="/login" className="hover:underline text-zinc-800 text-sm mr-2">Ya tengo una cuenta</NavLink>
            <NavLink to="/Signup" className="hover:underline text-zinc-800 text-sm ml-2">Crear Cuenta</NavLink>
        </div>
        {error && <p className={`text-red-700 text-sm my-5 `}>Ups! Algo salió mal: {error}. Intenta de nuevo</p>}
        </Field>
    </div>    )
}