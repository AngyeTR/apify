import { Heading } from "../../../../shared/components/uikit/heading"
import { Input } from "../../../../shared/components/uikit/input"
import { Select } from "../../../../shared/components/uikit/select"

const campaigns = [{id:1, name:"Campaña 1"}, {id:2, name:"Campaña 2"}, {id:3, name:"Campaña 3"},{id:4, name: "Camapaña 4"}]
export const CampaignStep = ({data, setData})=>{
   return (
     <div>
        <Heading className="my-5 text-center">Campaña</Heading>
        {/* <Input onChange={} placeholder="Ingresar el nombre de Campaña"/> */}
        <Select  className="my-5"
        onChange={(e)=> setData(prev=> ({...prev, "campaignId": parseInt(e.target.value)})) }>
            <option> Seleccione una campaña</option>
            {campaigns.map(campaign => <option value={campaign.id} key={campaign.id}>{campaign.name}</option>)}
        </Select>
    </div>
   )
}