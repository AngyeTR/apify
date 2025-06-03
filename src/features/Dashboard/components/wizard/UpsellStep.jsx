import { useEffect, useState } from "react"
import { Heading } from "../../../../shared/components/uikit/heading"
import { Input } from "../../../../shared/components/uikit/input"
import { Select } from "../../../../shared/components/uikit/select"
import { getByCompanyId } from "../../../../shared/services/API/api"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"

export const UpsellStep = ({data, setData})=>{
    const [ products, setProducts] = useState(null)
    const [ layouts, setLayouts] = useState(null)
        const [ stored] = useLocalStorage("data")
    
    useEffect(()=>{
        getByCompanyId("Products", stored?.company.id).then(res=>setProducts(res.data))
        getByCompanyId("Layouts", stored?.company.id).then(res=>setLayouts(res.data))
    },[])
   return (
     <div>
        <Heading>Upsell </Heading>
        <Select onChange={(e)=>setData(prev => ({...prev, "upsellProductId" : e.target.value})) }>
            {products?.map(prod => <option value={prod.id}>{prod.name}</option>)}
        </Select>
        {data.upsellProductId &&
            <Select onChange={(e)=>setData(prev => ({...prev, "orderBound" : e.target.value})) }>
            {layouts?.map(prod => <option value={prod.id}>{prod.name}</option>)}
        </Select>
        }
        <Input placeholder="Precio final del producto"/>
    </div>
   )
}