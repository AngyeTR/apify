import { useEffect, useState } from "react"
import { Heading} from "../../../../shared/components/uikit/heading"
import { edit, getByCompanyId, getByID } from "../../../../shared/services/API/api"
import { Button } from "../../../../shared/components/uikit/button"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { useNavigate } from "react-router-dom"

export const Modal = ({invitations, setNotify})=> {
    const [companies, setCompanies] = useState([])
    const [stored] = useLocalStorage("data")
    const nav= useNavigate()
    useEffect(()=>{
        invitations?.map(invitation => getByID("Companies", invitation.idCompany).then(res => setCompanies(prev=> [... prev, res.data]))) 
    }, [invitations]) 

    const update =async (id, num)=>{
        id.status= num
        id.modifiedBy = stored .user.email
        const res = await edit("Delegates", id).then(res=>res)
        res.isValid && nav(0)
    }

    return ( 
    <div className="fixed top-0 left-0 w-[280px] h-full bg-black/50 flex items-center justify-center">
        <div className="bg-zinc-50 w-full h-[70vh] p-5 m-2 justify-items-center rounded-lg z-50 overflow-y-scroll">
             <Heading  >Invitaciones de Delegado</Heading>
             {console.log(companies, invitations)}
             <h1 className="my-3">Tienes {invitations?.length} invitaciones pendientes:</h1>
             {invitations?.map(inv => <div className="shadow-lg bg-zinc-200 w-full py-5 justify-items-center rounded-lg">
                <p> Invitación de <strong>{companies.filter(comp => comp.id == inv.idCompany)?.[0]?.name}</strong></p>
                <Button className="m-2" onClick={()=>update(inv, 3)}>Aceptar</Button>
                <Button className="m-2" onClick={()=>update(inv, 5)}> Rechazar</Button>
             </div>)}
             <Button className="my-5" onClick={()=>setNotify(false)}>Cerrar</Button>
        </div>
        
    </div>)}