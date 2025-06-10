import { useEffect, useState } from "react"
import { Heading } from "../../../../shared/components/uikit/heading"
import { Input } from "../../../../shared/components/uikit/input"
import { Select } from "../../../../shared/components/uikit/select"
import { getByCompanyId } from "../../../../shared/services/API/api"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { Field } from "../../../../shared/components/uikit/fieldset"
import { Button } from "../../../../shared/components/uikit/button"

export const OrderBound = ({setData})=>{
    const [ products, setProducts] = useState(null)
    const [ stored] = useLocalStorage("data")
    const [newItem, setNewItem] = useState({})
    const [internalData, setInternalData] = useState([])

    useEffect(()=>{getByCompanyId("Products", stored?.company.id).then(res=>setProducts(res.data))},[])

    const handleInternal= (action, id)=>{
        const filtered = internalData.filter(int=> int.idProduct != id) 
        action == "add" && filtered.push(newItem)
        setInternalData(filtered)
        setNewItem({})
        setData(prev=>({...prev, "orderBounds": filtered}))}

   return (
     <div className="mt-10">
       
        <Heading className="my-5 text-center">Order Bound ( Gancho de Venta ) </Heading>
        <Field>
            <Select onChange={(e)=> setNewItem(prev=> ({...prev, "idProduct": parseInt(e.target.value)})) } className="my-3">
            <option>Seleccione un Producto</option>
            {products?.map(prod => <option value={prod.id}>{prod.name}</option>)}
            </Select>
            <Input defaultValue={newItem.price ? newItem.price: 0} type="number" placeholder="Precio final del producto" className="my-3" onChange={(e)=>setNewItem(prev => ({...prev, "price" : parseFloat(e.target.value)})) }/>
            <Button onClick={()=>handleInternal("add", newItem.idProduct)} disabled={!newItem.idProduct || !newItem.price} className="my-5">Añadir</Button>
        </Field>
        <div className="my-5">
            {internalData?.map(item=> <p className="my-2">
            <span className="text-red-500 hover:underline cursor-pointer font-bold" onClick={()=>handleInternal("delete", item.idProduct)}> X </span> {products.filter(prod=>prod.id == item.idProduct)[0].name}: ${item.price}</p>)}
        </div>
    </div>
   )
}