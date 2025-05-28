import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { Button } from "../../../../shared/components/uikit/button"
import { Field, Label} from "../../../../shared/components/uikit/fieldset"
import { Heading } from "../../../../shared/components/uikit/heading"
import { Input } from "../../../../shared/components/uikit/input"
import { useEffect, useState } from "react"
import { edit, getByID } from "../../../../shared/services/API/api"
import { validateEmail } from "../../../../shared/utils/utils"
import { deleteStoreUser, getStoreUser } from "../../../../shared/services/cookies"

export const Profile = ()=> {
    const nav = useNavigate()
    const [storeUser, setStoreUser] = useState(null)
    const [editor, setEditor] = useState(null)
    const [error, setError] = useState(null)
    const [cart, setCart, removeCart] = useLocalStorage("cart")
    console.log(editor)
    const storeUserId = getStoreUser()
    const logOut=()=>{
        deleteStoreUser()
        removeCart()
        nav("/store/login")
    }

    useEffect(()=>{storeUserId && getByID("Customers", storeUserId).then(res=>setStoreUser(res?.data))},[])

    const save = async()=>{
        setEditor(prev=> ({...prev, ["fullname"] : editor.firstName + " " + editor.lastName}))
        const verifyEmail = validateEmail(editor.email)
        if(verifyEmail) {setError(verifyEmail) }
        else if(editor.cellphone == ""){setError("El campo teléfono se encuentra vacío")}
        else {
        const res = await edit("Customers", editor).then(res=> res)
        res.isValid ? setStoreUser(res.data) :setError("")
        res.isValid ? nav(-1): setError("")
        setEditor(false)}
    }

    return (
    <div className="p-8 m-6 w-full max-w-md  justify-self-center rounded-lg border border-zinc-300 bg-zinc-50">
        <Heading className="mb-3"> Tu Cuenta  </Heading> 
        <Field >
            <Label >Nombre : </Label> <Input  placeholder={storeUser?.firstName} disabled={!editor} className="block bg-white max-w-md"  onChange={(e)=> setEditor(prev=> ({...prev, ["firstName"] : e.target.value}))}/>
            <Label >Apellido : </Label> <Input  placeholder={storeUser?.lastName} disabled={!editor} className="max-w-md justify-self-center mb-3" onChange={e=> setEditor(prev=> ({...prev, ["lastName"] : e.target.value}))}/>
            <Label>Teléfono : </Label><Input   placeholder={storeUser?.cellphone} disabled={!editor} className="max-w-md justify-self-center mb-3" onChange={e=> setEditor(prev=> ({...prev, ["cellphone"] : e.target.value}))}/>
            <Label>Email : </Label><Input  placeholder={storeUser?.email} disabled={!editor} className="max-w-md justify-self-center mb-3" onChange={e=> setEditor(prev=> ({...prev, ["email"] : e.target.value}))}/>
            <Label>Fecha de nacimiento: </Label><Input  type="date" placeholder={storeUser?.birthday} disabled={!editor} className="max-w-md justify-self-center mb-3" onChange={e=> setEditor(prev=> ({...prev, ["birthday"] : e.target.value}))}/>
            <Label>Identificación : </Label><Input  placeholder={storeUser?.dni} disabled={!editor} className="max-w-md justify-self-center mb-3" onChange={e=> setEditor(prev=> ({...prev, ["dni"] : e.target.value}))}/>
        </Field>
        {storeUser ? <> <Button className="mx-2" onClick={logOut}>Cerrar Sesión</Button> 
        {!editor ? <Button className="mx-2" onClick={()=>setEditor(storeUser)}>Editar Información</Button>: 
        <Button className="mx-2" onClick={save}>Guardar</Button>} </>:
        <>
        <Button className="mx-2" onClick={()=>nav("/store/login")}>Iniciar Sesión</Button>
        <Button className="mx-2" onClick={()=> nav("/store/signup")}>Crear Cuenta</Button></>}
        {error && <p className={`text-red-700 text-sm my-5 `}>Ups! Algo salió mal: {error}. Intenta de nuevo</p>}

    </div>
)}