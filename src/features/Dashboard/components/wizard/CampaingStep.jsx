import { Label } from "../../../../shared/components/uikit/fieldset"
import { Heading } from "../../../../shared/components/uikit/heading"
import { Input } from "../../../../shared/components/uikit/input"
import { Switch} from "../../../../shared/components/uikit/switch"
import { Select } from "../../../../shared/components/uikit/select"
import { useEffect, useState } from "react"
import { getByCompanyId } from "../../../../shared/services/API/api"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"

const campaigns = [{id:1, name:"Campaña 1"}, {id:2, name:"Campaña 2"}, {id:3, name:"Campaña 3"},{id:4, name: "Camapaña 4"}]
export const CampaignStep = ({data, setData})=>{
    const [stored] = useLocalStorage("data")
    const [ campaigns, setCampaigns] = useState(null)
    const [ products, setProducts] = useState(null)

    useEffect(()=>{
        getByCompanyId("Products", stored?.company.id).then(res=> setProducts(res.data))
        getByCompanyId("CampaingCompanies", stored.company.id).then(res=> setCampaigns(res.data))},[])
   return (
     <div className="justify-self-center w-full ">
        <Heading className="my-5 text-center">Campaña</Heading>
        {/* <Input onChange={} placeholder="Ingresar el nombre de Campaña"/> */}
        <Select  className="my-5 w-sm sm:w-md"
        onChange={(e)=> setData(prev=> ({...prev, "campaignId": parseInt(e.target.value)})) }>
            <option> Seleccione una campaña</option>
            {campaigns?.map(campaign => <option value={campaign.id} key={campaign.id}>{campaign.name}</option>)}
        </Select>
        <Select className="my-3" onChange={(e)=>setData(prev=> ({...prev, productId: parseInt(e.target.value)}))}>
            <option>Seleccione un producto</option>
            {products?.map(prod => <option value={prod.id} key={prod.id}>{prod.name}</option>)}
        </Select>
        <p className="my-2">¿Incluir pruebas A/B en este tunel de ventas? <Switch checked={data?.abTesting} onChange={()=>setData(prev=>({...prev, abTesting: !prev.abTesting}))}/></p>
        <p className="text-xs mt-2 mb-5 text-zinc-700 max-w-md">Si elige realizar pruebas A/B se utilizarán varios layouts en diferentes procentajes para mostrar a los compradores</p>
        {console.log(data)}
    </div>
   )
}