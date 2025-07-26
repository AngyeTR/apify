import { useEffect, useState } from "react"
import { Heading } from "../../../../shared/components/uikit/heading"
import { Input } from "../../../../shared/components/uikit/input"
import { Select } from "../../../../shared/components/uikit/select"
import { getByCompanyId } from "../../../../shared/services/API/api"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { Combobox, ComboboxLabel, ComboboxOption } from '../../../../shared/components/uikit/combobox'
import { upsellModel } from "../../utils/models"
import { Field, Label } from "../../../../shared/components/uikit/fieldset"
import { Switch } from "../../../../shared/components/uikit/switch"

export const UpsellStep = ({data, setData})=>{
    const [ products, setProducts] = useState(null)
    const [ hasUpsell, setHasUpsell] = useState(null)
    const [ layouts, setLayouts] = useState(null)
    const [filteredLayouts, setFilteredLayouts] = useState([])
    const [ stored] = useLocalStorage("data")
    
    useEffect(()=>{!hasUpsell && setData(prev => ({...prev, upsell: null})) },[hasUpsell])
    useEffect(()=>{setHasUpsell(!!data.upsell)},[ ,  data])

    useEffect(()=>{
        getByCompanyId("Products", stored?.company.id).then(res=>setProducts(res.data))
        getByCompanyId("Layouts", stored?.company.id).then(res=>setLayouts(res.data))
    },[])

    const handleProduct=(data)=>{
        const product = upsellModel
        product.idProduct = parseInt(data.id)
        product.quantity= 1
        product.price = parseFloat(data.price)
        setData(prev => ({...prev, upsell: product}))
        setFilteredLayouts(layouts.filter(layout => layout.idProduct == data.id))
    }

   return (
     <div className="my-3 mt-10 ">
        <Heading className="my-5 text-center">Upsell </Heading>
        <p className=" text-lg">Incluir Upsell <Switch checked={hasUpsell} onChange={()=>setHasUpsell(prev=> !prev)}/></p>
        {hasUpsell && 
        <Field> 
        <Label>Producto Upsell</Label>
        <Combobox className="my-3 w-sm sm:w-md" name="upsell" options={products ? products : []} displayValue={(product) => product?.name} 
               onChange={(e)=> e && handleProduct(e)} placeholder={data?.upsell?.idProduct ? products?.filter(prod=>prod.id == data.upsell?.idProduct)?.[0].name  :"Buscar y Seleccionar producto"}>
                {(product) => (
                  <ComboboxOption value={product}>
                    <ComboboxLabel>{product.name}</ComboboxLabel>
                  </ComboboxOption>)}
              </Combobox>
        {filteredLayouts.length > 0 ?
            <>
            <Label>Layout Upsell</Label>
            <Select  className="my-3" onChange={(e)=>setData(prev => ({...prev, "upsell": {...prev.upsell, "idLayout": parseInt(e.target.value)}})) }>
            <option>{data?.upsell?.idLayout ? layouts.filter(lay=> lay.id == data?.upsell?.idLayout)?.[0].name: "Seleccionar Layout"}</option>
            {filteredLayouts?.map(prod => <option value={prod.id}>{prod.name}</option>)}
            </Select>
            <Label>Precio Upsell</Label>
            <Input defaultValue={data?.upsell?.price} placeholder={"Precio final del producto"} type="number" onChange={(e)=> setData(prev => ({...prev, "upsell": {...prev.upsell, "price": parseFloat(e.target.value)}})) }/> </>
        : <p className="my-3 text-zinc-700">Aún no se encontraron Layouts para este producto </p>
        }
    </Field>}</div>
   )
}