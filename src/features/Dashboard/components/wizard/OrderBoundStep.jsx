import { useEffect, useState } from "react"
import { Heading } from "../../../../shared/components/uikit/heading"
import { Input } from "../../../../shared/components/uikit/input"
import { Select } from "../../../../shared/components/uikit/select"
import { getByCompanyId } from "../../../../shared/services/API/api"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"

export const OrderBound = ({setData})=>{
    const [ products, setProducts] = useState(null)
    const [ stored] = useLocalStorage("data")
    useEffect(()=>{getByCompanyId("Products", stored?.company.id).then(res=>setProducts(res.data))},[])
   return (
     <div className="mt-10">
        <Heading className="my-5 text-center">Order Bound ( Gancho de Venta ) </Heading>
        <Select onChange={(e)=>setData(prev => ({...prev, "orderBound" : parseInt(e.target.value)})) } className="my-3">
            <option>Seleccione un Producto</option>
            {products?.map(prod => <option value={prod.id}>{prod.name}</option>)}
        </Select>
        <Input type="number" placeholder="Precio final del producto" className="my-3" onChange={(e)=>setData(prev => ({...prev, "orderBoundPrice" : parseFloat(e.target.value)})) }/>
    </div>
   )
}