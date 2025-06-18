import { useEffect, useState } from "react"
import { Heading } from "../../../../shared/components/uikit/heading"
import { Button } from "../../../../shared/components/uikit/button"
import { Input } from "../../../../shared/components/uikit/input"
import { Select } from "../../../../shared/components/uikit/select"
import { getByCompanyId, getByID } from "../../../../shared/services/API/api"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { CheckboxGroup, CheckboxField, Checkbox } from "../../../../shared/components/uikit/checkbox"
import { Description, Field, Fieldset, Label } from "../../../../shared/components/uikit/fieldset"
import { pricesModel } from "../../utils/models"

const paymentOptions = [{name:"Efectivo Contraentrega", id:"paymentOnDelivery"}, {name: "Pago online", id:"paymentGateway"}]
const colors = [ {name: "Verde", value:"green"}, {name: "Rojo", value: "red"}, {name: "Amarillo", value: "ambar"}]
export const ProductStep = ({data, setData})=>{
    const [stored] = useLocalStorage("data")
    const [prices, setPrices] = useState([])
    const [price, setPrice] = useState(pricesModel)
    const methods = [{name:"Efectivo Contraentrega", id:"paymentOnDelivery"}, {name: "Pago online", id:"paymentGateway"}]
  useEffect(()=>{getByID("Products", data.idProduct).then(res=> setPrice(prev=>({...prev, oldPrice: res.data.price + 20000, price: res.data.price})))},[])

const handleprice = ()=>{ setData(prev => ({...prev, prices: [...prev.prices, price]}))
    setPrice(pricesModel)}

const handlePaymentMethod = (name, value) => {name == "Efectivo Contraentrega" ? setData(prev=>({...prev, paymentOnDelivery: value})): setData(prev=>({...prev, paymentGateway: value}))}

   return (
     <div className="mt-10 ">
        <Heading className="my-5 text-center">Precios y Métodos de Pago</Heading>
        <Field>
             <CheckboxGroup >
        {methods?.map(method=> <CheckboxField className="my-3" key={method.name}>
          <Checkbox checked={data[method.id]} onChange={(e)=> handlePaymentMethod(method.name, e)} name={method.name} value={method.name} />
          <Label>{method.name}</Label>
        </CheckboxField>)}
      </CheckboxGroup>
        <Field className="my-5 bg-zinc-100 p-2 rounded-lg">
        <Heading>Crear Precios</Heading>
        <Label>Nombre del Precio/Promoción</Label>
        <Input defaultValue={price?.name} className="my-0" placeholder="Nombre del precio" onChange={e=> setPrice(prev=> ({...prev, name : e.target.value, idProduct:data.idProduct}))}/>
        <p className="text-[14px] mb-5 text-zinc-700">Por ejemplo: Combo 2, 2X1, superPromo, etc</p>
        <Label >Cantidad</Label>
       <Input type="number" defaultValue={price?.quantity} placeholder="Cantidad que el comprador estaría llevando" onChange={e=> setPrice(prev=> ({...prev, quantity: parseInt(e.target.value)}))}/>
        <p className="text-[14px] mb-5 text-zinc-700">Por ejemplo: en pague 1 lleve 2, la cantidad será 2</p>
        <Label >Precio Anterior</Label>
        <Input type="number" defaultValue={price?.oldPrice} placeholder="Precio anterior" onChange={e=> setPrice(prev=> ({...prev, oldPrice : parseFloat(e.target.value)}))}/>
        <p className="text-[14px] mb-5 text-zinc-700">Este precio se mostrará <span className="line-through">tachado</span></p>
        <Label >Precio Final</Label>
        <Input defaultValue={price?.price} type="number" placeholder="Precio Final" onChange={e=> setPrice(prev=> ({...prev, price : parseFloat(e.target.value)}))}/>
        <Label >Etiquetas</Label>
        <Input placeholder="Etiqueta" onChange={e=> setPrice(prev=> ({...prev, tagName : e.target.value}))}/>
        <p className="text-[14px] mb-3 text-zinc-700">Una etiqueta llamativa, por ejemplo:
            <span className="bg-red-600 text-white">HotSale</span>, <span className="bg-green-600 text-white">Fin de temporada</span></p>
        <Select onChange={e=> setPrice(prev=> ({...prev, tagColor : e.target.value}))}>
            <option>Selecciona un color para la etiqueta</option>
            {colors.map(color=> <option value={color.value}>{color.name}</option>)}
        </Select>
        <Button className="my-2" onClick={handleprice} disabled={!price.name || !price.oldPrice || !price.price}>Crear Precio</Button>
        </Field>
      </Field>
        <h2 className="font-medium my-2">Tus compradores verán estos precios especiales:</h2>
        {data.prices?.length > 0 ? data.prices?.map(price=> 
        <p className="my-2">{price.name} {price.tagName && <span className={`bg-${price.tagColor}-600 text-white`}> {price.tagName}</span>}</p>) : 
        <p className="my-2"> Aún no hay precios creados</p>}
    </div>
   )
}