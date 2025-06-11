import { useEffect, useState } from "react"
import { Heading } from "../../../../shared/components/uikit/heading"
import { Button } from "../../../../shared/components/uikit/button"
import { Input } from "../../../../shared/components/uikit/input"
import { Select } from "../../../../shared/components/uikit/select"
import { getByCompanyId } from "../../../../shared/services/API/api"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { CheckboxGroup, CheckboxField, Checkbox } from "../../../../shared/components/uikit/checkbox"
import { Description, Fieldset, Label } from "../../../../shared/components/uikit/fieldset"

const paymentOptions = [{name:"Efectivo Contraentrega"}, {name: "Pago online"}]
const colors = [{name: "Azul", value:"blue"}, {name: "Verde", value:"green"}, {name: "Rojo", value: "red"}, {name: "Amarillo", value: "ambar"}]
export const ProductStep = ({data, setData})=>{
    const [stored] = useLocalStorage("data")
    const [prices, setPrices] = useState([])
    const [price, setPrice] = useState({})
    const methods = [{name:"Efectivo Contraentrega"}, {name: "Pago online"}]

    useEffect(()=>{ setData(prev=>({...prev, paymentMethods : methods}))},[])

const handleprice = ()=>{ setData(prev => ({...prev, prices: [...prev.prices, price]}))
    setPrice({})}

const handlePaymentMethod = (name, value) => {
      const options = data.paymentMethods
     const index = options.findIndex(obj => obj.name === name)
     options[index].value = value
     setData(prev=>({...prev, paymentMethods : options}))}

   return (
     <div className="mt-10 ">
        <Heading className="my-5 text-center">Precios y Métodos de Pago</Heading>
             <CheckboxGroup >
        {methods?.map(method=> <CheckboxField className="my-3" key={method.name}>
          <Checkbox  onChange={(e)=> handlePaymentMethod(method.name, e)} name={method.name} value={method.name} />
          <Label>{method.name}</Label>
        </CheckboxField>)}
      </CheckboxGroup>
        <Fieldset className="my-5 bg-zinc-100 p-2 rounded-lg">
        <Heading>Crear Precios</Heading>
        <Input placeholder="Nombre del precio" onChange={e=> setPrice(prev=> ({...prev, name : e.target.value}))}/>
        <p className="text-[14px] text-zinc-700">Por ejemplo: Combo 2, 2X1, superPromo, etc</p>
       <Input type="number" placeholder="Cantidad que el comprador estaría llevando" onChange={e=> setPrice(prev=> ({...prev, quantity: parseInt(e.target.value)}))}/>
        <p className="text-[14px] text-zinc-700">Por ejemplo: en pague 1 lleve 2, la cantidad será 2</p>
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
        {data.prices?.length > 0 ? data.prices?.map(price=> 
        <p className="my-2">{price.name} {price.tag && <span className={`bg-${price.tagColor}-600 text-white`}> {price.tag}</span>}</p>) : 
        <p className="my-2"> Aún no hay precios creados</p>}
    </div>
   )
}