import { useEffect, useState } from "react"
import { Heading } from "../../../../shared/components/uikit/heading"
import { Button } from "../../../../shared/components/uikit/button"
import { Input } from "../../../../shared/components/uikit/input"
import { Select } from "../../../../shared/components/uikit/select"
import { getByCompanyId } from "../../../../shared/services/API/api"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { Description, Fieldset, Label } from "../../../../shared/components/uikit/fieldset"

const colors = [{name: "Azul", value:"blue"}, {name: "Verde", value:"green"}, {name: "Rojo", value: "red"}, {name: "Amarillo", value: "ambar"}, {name: "Naranja", value: "orange"}]
export const ProductStep = ({data, setData})=>{
    const [stored] = useLocalStorage("data")
    const [layouts, setLayouts] = useState(null)
    const [prices, setPrices] = useState([])
    const [price, setPrice] = useState({})
    useEffect(()=>{getByCompanyId("Layouts", stored?.company.id).then(res=> setLayouts(res.data))},[])

const handleprice = ()=>{
    setData(prev => ({...prev, prices: [...prev.prices, price]}))
    setPrice({})
}

   return (
     <div className="mt-10 overflow-scroll">
        <Heading className="my-5 text-center">Producto</Heading>
        <Select onChange={(e)=>setData(prev => ({...prev, "layout": parseInt(e.target.value)})) }>
            <option>Selecciona un Layout</option>
            {layouts?.map(layout => <option value={layout.id} key={layout.id}>{layout.name}</option>)}
        </Select>
        <Fieldset className="my-5 bg-zinc-100 p-2 rounded-lg">
        <Heading>Crear Precios</Heading>
        <Input placeholder="Nombre del precio" onChange={e=> setPrice(prev=> ({...prev, name : e.target.value}))}/>
        <p className="text-[14px] text-zinc-700">Por ejemplo: Combo 2, 2X1, superPromo, etc</p>
        <Input type="number" placeholder="Precio anterior" onChange={e=> setPrice(prev=> ({...prev, initialPrice : parseFloat(e.target.value)}))}/>
        <p className="text-[14px] text-zinc-700">Este precio se mostrará <span className="line-through">tachado</span></p>
        <Input type="number" placeholder="Precio Final" onChange={e=> setPrice(prev=> ({...prev, finalPrice : parseFloat(e.target.value)}))}/>
        <Input placeholder="Etiqueta" onChange={e=> setPrice(prev=> ({...prev, tag : e.target.value}))}/>
        <p className="text-[14px] text-zinc-700">Una etiqueta llamativa, por ejemplo:
            <span className="bg-red-600 text-white">HotSale</span>, <span className="bg-green-600 text-white">Fin de temporada</span></p>
        <Select onChange={e=> setPrice(prev=> ({...prev, tagColor : e.target.value}))}>
            <option>Selecciona un color para la etiqueta</option>
            {colors.map(color=> <option value={color.value}>{color.name}</option>)}
        </Select>
        <Button className="my-2" onClick={handleprice} disabled={!price.name || !price.initialPrice || !price.finalPrice}>Crear Precio</Button>
        </Fieldset>
        <h2 className="font-medium my-2">Tus compradores verán estos precios especiales:</h2>
        {data.prices.length > 0 ? data.prices?.map(price=> 
        <p className="my-2">{price.name} {price.tag && <span className={`bg-${price.tagColor}-600 text-white`}> {price.tag}</span>}</p>) : 
        <p className="my-2"> Aún no hay precios creados</p>}
    </div>
   )
}