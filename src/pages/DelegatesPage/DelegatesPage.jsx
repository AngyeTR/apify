
import { Fieldset } from "../../components/fieldset"
import { Divider} from "../../components/divider"
import { MyLayout } from "../../components/myComponents/MyLayout"
import { useEffect, useState } from "react"
import { getProfiles } from "../../services/API/api"
import { Button } from "../../components/button"
import { MyDelegatesTable } from "../../components/myComponents/MyDelegatesTable"
import { Heading } from "../../components/heading"

export const DelegatesPage = ()=> { 
    const [profiles, setProfiles] = useState(null)
    const [profile, setProfile] = useState(null)
    const [email, setEmail] = useState(null)
    const data = [{email: "a@a.com", id:1, idProfile:1, isActive:true, name:"Delegado1"},
        {email: "a@abc.com", id:2, idProfile:2, isActive:false, name:"Delegado1"},
        {email: "a@abcde.com", id:3, idProfile:1, isActive:true, name:"Delegado1"},

    ]
useEffect(() => {getProfiles ().then((res) => {setProfiles(res.data)})}, [ ]);
    return (
        <MyLayout >
            <Fieldset className="my-6">
                <Heading >Enviar invitación como delegado</Heading>
                <input  placeholder="Email"className="group relative w-xs m-2 p-1 border border-zinc-400 rounded-lg"/>
                <select name="idProfile" onChange={(e)=>setProfile(e.target.value)} className="group relative w-40 m-2 p-1 border border-zinc-400 rounded-lg">
                    <option value="">Selecciona un perfil</option>
                    { profiles?.map((profile)=> <option value={profile.id}>{profile.name}</option>)}
                </select>
                <Button>Enviar Invitación</Button>
            </Fieldset>
            <div className=" mt-6">
            <Heading>Delegados</Heading>
            <MyDelegatesTable profiles={profiles} data={data}/>
            </div>
            
            
        </MyLayout>
    )
}