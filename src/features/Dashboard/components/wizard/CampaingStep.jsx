import { Heading } from "../../../../shared/components/uikit/heading"
import { Switch} from "../../../../shared/components/uikit/switch"
import { Select } from "../../../../shared/components/uikit/select"
import { useEffect, useState } from "react"
import { getByCompanyId } from "../../../../shared/services/API/api"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { Combobox, ComboboxLabel, ComboboxOption } from '../../../../shared/components/uikit/combobox'
import { Input } from "../../../../shared/components/uikit/input"
import { Field, Label } from "../../../../shared/components/uikit/fieldset"

export const CampaignStep = ({data, setData})=>{
    const [stored] = useLocalStorage("data")
    const [ campaigns, setCampaigns] = useState(null)
    const [ products, setProducts] = useState(null)
    const [domains, setDomains] = useState(null)
    useEffect(()=>{
        getByCompanyId("Products", stored?.company.id).then(res=> setProducts(res.data))
        getByCompanyId("Domains", stored?.company.id).then(res=> setDomains(res.data))
        getByCompanyId("CampaingCompanies", stored.company.id).then(res=> setCampaigns(res.data))},[])
   return (
     <div className="justify-self-center w-full ">
        <Heading className="my-5 text-center">Campaña</Heading>
        <Field>
        <Label>Campaña<span className="text-red-600">*</span></Label>
        <Select  className="mb-5 w-sm sm:w-md" onChange={(e)=> setData(prev=> ({...prev, "idCampaign": parseInt(e.target.value)})) }>
            <option> Seleccione una campaña</option>
            {campaigns?.map(campaign => <option value={campaign.id} key={campaign.id}>{campaign.name}</option>)}
        </Select>
        <Label>Producto<span className="text-red-600">*</span></Label>
        <Combobox className="my-3 w-sm sm:w-md" name="product" options={products ? products : []} displayValue={(product) => product?.name} 
       onChange={(e)=> setData(prev=>({...prev, idProduct:e}))} placeholder={data.idProduct ? products?.filter(prod=>prod.id == data.idProduct)?.[0].name : "Buscar y Seleccionar producto"}>
        {(product) => (
          <ComboboxOption value={product.id}>
            <ComboboxLabel>{product.name}</ComboboxLabel>
          </ComboboxOption>)}
      </Combobox>
      <Label>Pixel<span className="text-red-600">*</span></Label>
      <Input className="my-3" placeholder={data?.facebookPixel ? data?.facebookPixel :"Ingresar Facebook Pixel"} onChange={(e)=> setData(prev=> ({...prev, "facebookPixel": e.target.value}))}/>
      <Input className="my-3" placeholder={data?.tikTokPixel ? data?.tikTokPixel: "Ingresar TikTok Pixel"} onChange={(e)=> setData(prev=> ({...prev, "tikTokPixel": e.target.value}))}/>
      <Label>Dominio<span className="text-red-600">*</span></Label>
      <Select className="my-5 w-sm sm:w-md"  onChange={(e)=> setData(prev=> ({...prev, "domain": e.target.value})) }>
        <option>{data.domain? data.domain : "Seleccione un dominio"}</option>
        {domains?.map(domain => <option value={domain.domain} key={domain.id}>{domain.domain}</option>)}
      </Select>
        <p className="my-2">¿Incluir pruebas A/B en este tunel de ventas? <Switch checked={data?.abTesting || data.layouts?.length != 0} onChange={()=>setData(prev=>({...prev, abTesting: !prev.abTesting}))}/></p>
        <p className="text-xs mt-2 mb-5 text-zinc-700 max-w-md">Si elige realizar pruebas A/B se utilizarán varios layouts en diferentes procentajes para mostrar a los compradores</p>
    </Field></div>
   )}