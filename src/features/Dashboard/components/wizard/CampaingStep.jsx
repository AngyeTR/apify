import { Heading } from "../../../../shared/components/uikit/heading"
import { Switch} from "../../../../shared/components/uikit/switch"
import { Select } from "../../../../shared/components/uikit/select"
import { useEffect, useState } from "react"
import { getByCompanyId } from "../../../../shared/services/API/api"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { Combobox, ComboboxLabel, ComboboxOption } from '../../../../shared/components/uikit/combobox'

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
        <Select  className="my-5 w-sm sm:w-md"
        onChange={(e)=> setData(prev=> ({...prev, "idCampaign": parseInt(e.target.value)})) }>
            <option> Seleccione una campaña</option>
            {campaigns?.map(campaign => <option value={campaign.id} key={campaign.id}>{campaign.name}</option>)}
        </Select>
        <Combobox className="my-3 w-sm sm:w-md" name="product" options={products ? products : []} displayValue={(product) => product?.name} 
       onChange={(e)=> setData(prev=>({...prev, productId:e}))} placeholder={data.productId ? products.filter(prod=>prod.id == data.productId)?.[0].name : "Buscar y Seleccionar producto"}>
        {(product) => (
          <ComboboxOption value={product.id}>
            <ComboboxLabel>{product.name}</ComboboxLabel>
          </ComboboxOption>)}
      </Combobox>
        <p className="my-2">¿Incluir pruebas A/B en este tunel de ventas? <Switch checked={data?.abTesting || data.layouts?.length != 0} onChange={()=>setData(prev=>({...prev, abTesting: !prev.abTesting}))}/></p>
        <p className="text-xs mt-2 mb-5 text-zinc-700 max-w-md">Si elige realizar pruebas A/B se utilizarán varios layouts en diferentes procentajes para mostrar a los compradores</p>
    </div>
   )}