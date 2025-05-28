import { useState } from "react"
import { Heading } from "../../../../shared/components/uikit/heading"
import { Button } from "../../../../shared/components/uikit/button"
import { Fieldset } from "../../../../shared/components/uikit/fieldset"
import { getByEmail, post } from "../../../../shared/services/API/api"
import { validateEmail } from "../../../../shared/utils/utils"
import { MyLoader} from "./MyLoader"
import { adaptDelegateModel } from "../../utils/adaptDataModel"
import { useNavigate } from "react-router-dom"

export const MyDelegatesInvitationForm = ({id})=>{
const [error, setError] = useState(null)
const [loading, setLoading] = useState(null)
const [email, setEmail] = useState(null)
const [user, setUser] =  useState(null)
const nav = useNavigate()

const checkEmail = async() =>{
    setLoading(true)
    setError(null)
    const verifyEmail = validateEmail(email)
    if(verifyEmail) {setError(verifyEmail) 
    }else {const res = await getByEmail(email).then(res=>res)
    res.isValid ? setUser(res.data) : setError(res.errorMessages[0])}
    setLoading(false)}

const sendInvitation = async () =>{
    setLoading(true)
    setError(null)
    const dataset = adaptDelegateModel(user.id)
    const res = await post("Delegates", dataset).then(res=>res)
    console.log(res, res.isValid)
    res.isValid ? nav(0) : setError(res.errorMessages?.[0] ? res.errorMessages?.[0] : " " )
    setLoading(false)
}

    return (
         <Fieldset className="my-6">
            <Heading >Enviar invitación como delegado</Heading>
            {!user ? <>
            <input  placeholder="Email"className="group relative w-xs m-2 p-1 border border-zinc-400 rounded-lg" onChange={(e)=>setEmail(e.target.value)}/>
            {loading ? <MyLoader /> : <Button disabled={!email } onClick={checkEmail}>Validar correo</Button>}
            </>: <>
            <p className="my-2">Usuario encontrado: <strong> {user?.fullname} </strong></p>
             {loading ? <MyLoader /> :<Button className="mr-1" onClick={sendInvitation}>Enviar invitación</Button>}
             {loading ? <MyLoader /> :<Button className="mx-1" onClick={()=>{setUser(null); setEmail(null)}}>Cancelar</Button>}
            </>}
            {error && <p className="text-red-700 text-sm my-5 ">Ups! Algo salió mal: {error}. Intenta de nuevo</p>}
        </Fieldset>
        )}
