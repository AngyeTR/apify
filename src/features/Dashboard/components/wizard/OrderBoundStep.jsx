import { useEffect, useState } from "react"
import { Heading } from "../../../../shared/components/uikit/heading"
import { Input } from "../../../../shared/components/uikit/input"
import { Select } from "../../../../shared/components/uikit/select"
import { getByCompanyId } from "../../../../shared/services/API/api"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"

export const OrderBound = ({setData})=>{
    const [ products, setProducts] = useState(null)
    const [ stored] = useLocalStorage("data")
    useEffect(()=>{getByCompanyId("Peoducts", stored?.company.id).then(res=>setProducts(res.data))},[])
   return (
     <div>
        <Heading>Order Bound ( Gancho de Venta ) </Heading>
        <Select onChange={(e)=>setData(prev => ({...prev, "orderBound" : e.target.value})) }>
            {products?.map(prod => <option value={prod.id}>{prod.name}</option>)}
        </Select>
        <Input placeholder="Precio final del producto"/>
    </div>
   )
}