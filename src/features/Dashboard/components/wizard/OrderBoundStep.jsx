import { useEffect, useState } from "react"
import { Heading } from "../../../../shared/components/uikit/heading"
import { Input } from "../../../../shared/components/uikit/input"
import { Select } from "../../../../shared/components/uikit/select"
import { getByCompanyId } from "../../../../shared/services/API/api"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { Field, Label } from "../../../../shared/components/uikit/fieldset"
import { Button } from "../../../../shared/components/uikit/button"
import { Combobox, ComboboxLabel, ComboboxOption } from '../../../../shared/components/uikit/combobox'
import { orderBoundModel } from "../../utils/models"

export const OrderBound = ({data, setData})=>{
    const [ products, setProducts] = useState(null)
    const [ stored] = useLocalStorage("data")
    const [newItem, setNewItem] = useState(orderBoundModel)
    const [internalData, setInternalData] = useState([])

    useEffect(()=>{data.orderBounds && setInternalData(data.orderBounds)
        getByCompanyId("Products", stored?.company.id).then(res=>setProducts(res.data))},[])

    const handleInternal= (action, id)=>{
        const filtered = internalData.filter(int=> int.idProduct != id) 
        action == "add" && filtered.push(newItem)
        setInternalData(filtered)
        setNewItem(orderBoundModel)
        setData(prev=>({...prev, "orderBounds": filtered}))}

   return (
     <div className="mt-10">
       
        <Heading className="my-5 text-center">Order Bound ( Gancho de Venta ) </Heading>
        <Field>
            <Label>Producto</Label>
            <Combobox className="my-3 w-sm sm:w-md" name="product" options={products ? products : []} displayValue={(product) => product?.name} 
       onChange={(e)=> e && setNewItem(prev=> ({...prev, "idProduct": parseInt(e.id), quantity: 1, price: parseFloat(e.price)}))} placeholder={newItem?.idProduct ? products?.filter(prod=>prod.id == newItem?.idProduct)?.[0].name  :"Buscar y Seleccionar producto"}>
        {(product) => (
          <ComboboxOption value={product}>
            <ComboboxLabel>{product.name}</ComboboxLabel>
          </ComboboxOption>)}
      </Combobox>
        {newItem.idProduct && <> <Label>Precio</Label>
            <Input defaultValue={newItem.price} type="number" placeholder="Precio final del producto" className="my-3" onChange={(e)=>setNewItem(prev => ({...prev, "price" : parseFloat(e.target.value)})) }/>
           </>}
        <Button onClick={()=>handleInternal("add", newItem.idProduct)} disabled={!newItem.idProduct || !newItem.price} className="my-5">Añadir</Button>
        </Field>
        <div className="my-5">
            {internalData?.map(item=> <p className="my-2" key={item.idProduct}>
            <span className="text-red-500 hover:underline cursor-pointer font-bold" onClick={()=>handleInternal("delete", item.idProduct)}> X </span> {products?.filter(prod=>prod.id == item.idProduct)[0].name}: ${item.price}</p>)}
        </div>
    </div>
   )
}