
import { Fieldset } from "../../../../shared/components/uikit/fieldset"
import { MyLayout } from "../../components/myComponents/MyLayout"
import { useEffect, useState } from "react"
import { getByCompanyId, getByDelegateId, getProfiles } from "../../../../shared/services/API/api"
import { Button } from "../../../../shared/components/uikit/button"
import { MyDelegatesTable } from "../../components/myComponents/MyDelegatesTable"
import { Heading } from "../../../../shared/components/uikit/heading"
import { validateEmail } from "../../../../shared/utils/utils"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"

export const DelegatesPage = ()=> { 
    const [profiles, setProfiles] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [profile, setProfile] = useState(null)
    const [email, setEmail] = useState(null)
    const [stored, setStored] = useLocalStorage("data", null)
    const [data, setData] = useState([])

    useEffect(() => {getByCompanyId("Delegates", stored.company.id).then((res) => setData(res.data))}, []); 
console.log(data)
    const sendInvitation = () =>{
        setLoading(true)
        setError(null)
        const verifyEmail = validateEmail(email)
        if(verifyEmail) {setError(verifyEmail) 
        }else {console.log("Inmvitado")}
        setLoading(false)}

useEffect(() => {getProfiles ().then((res) => {setProfiles(res.data)})}, [ ]);
    return (
        <MyLayout >
            <Fieldset className="my-6">
                <Heading >Enviar invitación como delegado</Heading>
                <input  placeholder="Email"className="group relative w-xs m-2 p-1 border border-zinc-400 rounded-lg" onChange={(e)=>setEmail(e.target.value)}/>
                {/* <select name="idProfile" onChange={(e)=>setProfile(e.target.value)} className="group relative w-40 m-2 p-1 border border-zinc-400 rounded-lg">
                    <option value="">Selecciona un perfil</option>
                    { profiles?.map((profile)=> <option value={profile.id}>{profile.name}</option>)}
                </select> */}
                <Button disabled={!email } onClick={sendInvitation}>Enviar Invitación</Button>
            </Fieldset>
            {error && <p className="text-red-700 text-sm my-5 ">Ups! Algo salió mal: {error}. Intenta de nuevo</p>
        }
            <div className=" mt-6">
            <Heading>Delegados</Heading>
            <MyDelegatesTable profiles={profiles} data={data}/>
            </div>
        </MyLayout>
    )
}