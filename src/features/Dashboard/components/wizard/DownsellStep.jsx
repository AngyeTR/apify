import { useEffect, useState } from "react"
import { Heading } from "../../../../shared/components/uikit/heading"
import { Input } from "../../../../shared/components/uikit/input"
import { Select } from "../../../../shared/components/uikit/select"
import { getByCompanyId } from "../../../../shared/services/API/api"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { downsellModel } from "../../utils/models"
import { Field, Label } from "../../../../shared/components/uikit/fieldset"
import { Switch } from "../../../../shared/components/uikit/switch"

export const DownsellStep = ({data, setData})=>{
    const [ hasDownsell, setHasDownsell] = useState(null)
    const [ products, setProducts] = useState(null)
    const [ layouts, setLayouts] = useState(null)
    const [ stored] = useLocalStorage("data") 

    useEffect(()=>{!hasDownsell && setData(prev => ({...prev, downsell: null})) },[hasDownsell])
    useEffect(()=>{setHasDownsell(!!data.downsell)},[ ,  data])
    
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
        <p className=" text-lg">Incluir Downsell <Switch checked={hasDownsell} onChange={()=>setHasDownsell(prev=> !prev)}/></p>
        {<Field>
        {hasDownsell && data?.upsell?.idProduct ?
            <>
            <Label>Producto Downsell</Label>
            <Select className="my-3 w-sm sm:w-md" onChange={(e)=>handleDownSell(parseInt(e.target.value)) }>
            <option>{data?.downsell?.idLayout ? layouts?.filter(lay=> lay.id == data?.downsell?.idLayout)?.[0].name: "Seleccionar Layout"}</option>
            {layouts?.map(prod => <option value={prod.id}>{prod.name}</option>)}
        </Select>
        <Label>Precio Downsell</Label>
        <Input defaultValue={data.upsell.price} className="my-3  w-sm sm:w-md" placeholder="Precio final del producto"  type="number" onChange={(e)=> setData(prev => ({...prev, "downsell": {...prev.downsell, "price": parseInt(e.target.value)}})) }/>
        </>: <p className="my-3">Tunel de ventas casi listo. Solo falta guardar</p>
        }</Field>}
    </div>
   )
} 