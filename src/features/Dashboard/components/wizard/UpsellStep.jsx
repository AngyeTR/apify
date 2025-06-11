import { useEffect, useState } from "react"
import { Heading } from "../../../../shared/components/uikit/heading"
import { Input } from "../../../../shared/components/uikit/input"
import { Select } from "../../../../shared/components/uikit/select"
import { getByCompanyId } from "../../../../shared/services/API/api"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { Combobox, ComboboxLabel, ComboboxOption } from '../../../../shared/components/uikit/combobox'
import { upsellModel } from "../../utils/models"

export const UpsellStep = ({data, setData})=>{
    const [ products, setProducts] = useState(null)
    const [ layouts, setLayouts] = useState(null)
    const [filteredLayouts, setFilteredLayouts] = useState([])
        const [ stored] = useLocalStorage("data")
    
    useEffect(()=>{
        getByCompanyId("Products", stored?.company.id).then(res=>setProducts(res.data))
        getByCompanyId("Layouts", stored?.company.id).then(res=>setLayouts(res.data))
    },[])

    const handleProduct=(id)=>{
        const product = upsellModel
        product.idProduct = id
        product.quantity= 1
        setData(prev => ({...prev, upsell: product}))
        setFilteredLayouts(layouts.filter(layout => layout.idProduct == id))
    }

   return (
     <div className="my-3 mt-10 ">
        <Heading className="my-5 text-center">Upsell </Heading>
        <Combobox className="my-3 w-sm sm:w-md" name="upsell" options={products ? products : []} displayValue={(product) => product?.name} 
               onChange={(e)=> handleProduct(parseInt(e))} placeholder={data?.upsell?.idProduct ? products?.filter(prod=>prod.id == data.upsell?.idProduct)?.[0].name  :"Buscar y Seleccionar producto"}>
                {(product) => (
                  <ComboboxOption value={product.id}>
                    <ComboboxLabel>{product.name}</ComboboxLabel>
                  </ComboboxOption>)}
              </Combobox>
        {filteredLayouts.length > 0 ?
            <Select  className="my-3" onChange={(e)=>setData(prev => ({...prev, "upsell": {...prev.upsell, "idLayout": parseInt(e.target.value)}})) }>
            <option>{data?.upsell?.idLayout ? layouts.filter(lay=> lay.id == data?.upsell?.idLayout)?.[0].name: "Seleccionar Layout"}</option>
            {filteredLayouts?.map(prod => <option value={prod.id}>{prod.name}</option>)}
        </Select> : <p className="my-3 text-zinc-700">Aún no se encontraron Layouts para este producto </p>
        }
        <Input placeholder={data?.upsell?.price ? data?.upsell?.price : "Precio final del producto"} type="number" onChange={(e)=> setData(prev => ({...prev, "upsell": {...prev.upsell, "price": parseInt(e.target.value)}})) }/>
    </div>
   )
}