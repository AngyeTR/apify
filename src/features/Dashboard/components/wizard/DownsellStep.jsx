import { useEffect, useState } from "react"
import { Heading } from "../../../../shared/components/uikit/heading"
import { Input } from "../../../../shared/components/uikit/input"
import { Select } from "../../../../shared/components/uikit/select"
import { getByCompanyId } from "../../../../shared/services/API/api"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { downsellModel } from "../../utils/models"

export const DownsellStep = ({data, setData})=>{
    const [ products, setProducts] = useState(null)
    const [ layouts, setLayouts] = useState(null)
    const [ stored] = useLocalStorage("data")
    
    useEffect(()=>{ getByCompanyId("Products", stored?.company.id).then(res=>setProducts(res.data))
        data.upsell?.idProduct && getByCompanyId("Layouts", stored?.company.id).then(res=>setLayouts(res.data.filter(layout=> data.upsell?.idProduct == layout.idProduct)))},[])
   
    const handleDownSell = (id)=>{
    const product = downsellModel
    product.idProduct = data.upsell.idProduct
    product.idLayout = id
    product.quantity= 1
    setData(prev => ({...prev, "downsell": product}))}

    return (
     <div className="mt-10">
        <Heading className="my-5 text-center">DownSell </Heading>
        {data?.upsell?.idProduct ?
            <><Select className="my-3 w-sm sm:w-md" onChange={(e)=>handleDownSell(parseInt(e.target.value)) }>
            <option>{data?.downsell?.idLayout ? layouts.filter(lay=> lay.id == data?.downsell?.idLayout)?.[0].name: "Seleccionar Layout"}</option>
            {layouts?.map(prod => <option value={prod.id}>{prod.name}</option>)}
        </Select>
        <Input className="my-3  w-sm sm:w-md" placeholder="Precio final del producto"  type="number" onChange={(e)=> setData(prev => ({...prev, "downsell": {...prev.downsell, "price": parseInt(e.target.value)}})) }/>
        </>: <p className="my-3">Tunel de ventas casi listo. Solo falta guardar</p>
        }
    </div>
   )
}