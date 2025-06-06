import { Radio, RadioField, RadioGroup } from "../../../../shared/components/uikit/radio"
import { Description, Field, Label } from "../../../../shared/components/uikit/fieldset"
import { Heading } from "../../../../shared/components/uikit/heading"
import { PriceCard } from "./PriceCard"
import { OrderBound } from "./OrderBound"
import { Switch } from "../../../../shared/components/uikit/switch"
import { useEffect, useState } from "react"
import { getByID } from "../../../../shared/services/API/api"
import { Button } from "../../../../shared/components/uikit/button"

export const SalesForm =({data, setDataSet, dataSet, handleClick})=> {
    const [priced, setPriced] = useState(null)
    const [accepted, setAccepted] = useState(false)
    const [orderBound, setOrderBound] = useState(null)

    useEffect(()=>{getByID("Products", data.orderBoundId).then(res=>setOrderBound(res.data))},[])
    return (
        <div className="justify-center  justify-items-center bg-zinc-50 mt-5 w-[px] md:w-[600px] rounded-lg p-5">
        <Field>
            <Heading className="text-center my-5">Información de Venta</Heading>
            <Label>Selecciona el precio que deseas pagar</Label>
            <PriceCard  price={{name: "Precio Normal", price: orderBound?.price}} setDataSet={setDataSet} setPriced={setPriced} selected={priced == "Precio Normal"}/> 
            {data?.prices?.map(price => <PriceCard price={price} setDataSet={setDataSet} selected={priced == price.name} setPriced={setPriced}/>)}
            <RadioGroup name="resale" defaultValue="permit" className="m-2" onChange={e=>setDataSet(prev=> ({...prev, paymentMethod: e}))}>
            <Label>Seleccione Método de pago</Label>
            {data?.paymentMethods?.map(method => <RadioField>
          <Radio value={method.name} />
          <Label>{method.name}</Label>
        </RadioField>)}
      </RadioGroup>
      <Label>¿Deseas incluir este producto en tu compra? </Label>
          <OrderBound id={data.orderBoundId} price={data.orderBoundPrice}/>
          {!accepted ?  <p className="hover:underline" onClick={()=>{setDataSet(prev=> ({...prev, orderBoundAccepted: !accepted})); setAccepted(!accepted)}}>Añadir a mi compra</p> : <p className="text-center text-green-700">Añadido</p>}
        </Field>
        <Button disabled={!dataSet.paymentMethod || !dataSet.price} color="yellow" onClick={()=>handleClick(1)}>Siguiente</Button>
        </div>

    )
}