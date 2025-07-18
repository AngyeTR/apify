import { useState } from "react"
import { Button } from "../../../../shared/components/uikit/button"

export const FormNewCampaign = ()=>{
    const [created, setCreated] = useState(false)
    const [newCampaign, setNewCampaign] = useState(null)

    const createCampaign = async()=>{
        setLoading(true)
        const camp = campaignModel
        camp.name = newCampaign
        const res = await post("CampaingCompanies", camp).then(res=>res)
        res.isValid && setNewCampaign(null)
        setCreated(true);
        setTimeout(() => setCreated(false), 1000);
        setLoading(false)}

    return (
        <div>
            <input className="w-[150px] sm:w-xs border border-zinc-400 rounded-lg p-1 mr-2" placeholder="Nueva campaña" 
            onChange={(e)=>setNewCampaign(e.target.value)}/>
            <Button  onClick={createCampaign} color={created? "green": "zinc"} disabled={!newCampaign} className="mx-2">{created? "Creado" : "Crear"}</Button>       
        </div>
    )
}