import { useEffect, useState } from "react"
import { Heading } from "../../../../shared/components/uikit/heading"
import { Input } from "../../../../shared/components/uikit/input"
import { Select } from "../../../../shared/components/uikit/select"
import { getByCompanyId } from "../../../../shared/services/API/api"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"

export const DownsellStep = ({data, setData})=>{
    const [ products, setProducts] = useState(null)
    const [ layouts, setLayouts] = useState(null)
    const [ stored] = useLocalStorage("data")
    
    useEffect(()=>{ getByCompanyId("Products", stored?.company.id).then(res=>setProducts(res.data))
        getByCompanyId("Layouts", stored?.company.id).then(res=>setLayouts(res.data.filter(layout=> data.upsellProductId == layout.idProduct)))},[])
   return (
     <div className="mt-10">
        <Heading className="my-5 text-center">DownSell </Heading>
        {data.upsellProductId &&
            <Select className="my-3 w-sm sm:w-md" onChange={(e)=>setData(prev => ({...prev, "downsellLayout" :parseInt(e.target.value)})) }>
            <option>Seleccionar Layout</option>
            {layouts?.map(prod => <option value={prod.id}>{prod.name}</option>)}
        </Select>
        }
        <Input className="my-3" placeholder="Precio final del producto"  type="number" onChange={(e)=> setData(prev=> ({...prev, "downsellPrice": parseFloat(e.target.value)}))}/>
    </div>
   )
}