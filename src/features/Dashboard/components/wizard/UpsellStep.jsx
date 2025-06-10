import { useEffect, useState } from "react"
import { Heading } from "../../../../shared/components/uikit/heading"
import { Input } from "../../../../shared/components/uikit/input"
import { Select } from "../../../../shared/components/uikit/select"
import { getByCompanyId } from "../../../../shared/services/API/api"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"

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
        setData(prev => ({...prev, "upsellProductId" : id}))
        setFilteredLayouts(layouts.filter(layout => layout.idProduct == id))
    }

   return (
     <div className="my-3 mt-10 ">
        <Heading className="my-5 text-center">Upsell </Heading>
        {console.log(!!data.upsellProductId)}
        <Select className="my-3 w-sm sm:w-md" onChange={(e)=>handleProduct(parseInt(e.target.value)) }>
            <option>Selecciona un producto</option>
            {products?.map(prod => <option value={prod.id}>{prod.name}</option>)}
        </Select >
        {filteredLayouts.length > 0 ?
            <Select  className="my-3" onChange={(e)=>setData(prev => ({...prev, "upsellLayout" : parseInt(e.target.value)})) }>
            <option>Seleccionar Layout</option>
            {filteredLayouts?.map(prod => <option value={prod.id}>{prod.name}</option>)}
        </Select> : <p className="my-3 text-zinc-700">Aún no se encontraron Layouts para este producto </p>
        }
        <Input placeholder="Precio final del producto" type="number" onChange={(e)=> setData(prev=> ({...prev, "upsellPrice": parseFloat(e.target.value)}))}/>
    </div>
   )
}