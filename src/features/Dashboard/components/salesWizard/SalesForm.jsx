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
    const [acceptedOrderBounds, setAcceptedOrderBounds] = useState([])
    const [mainProduct, setMainProduct] = useState(null)
    const [orderBounds, setOrderBounds] = useState([])
  console.log(data)

    useEffect(()=>{
      getByID("Products", data?.idProduct).then(res=>{setMainProduct(res.data);console.log(res)})
      data?.orderBounds?.map(bound=> getByID("Products", bound.id).then(res=>setOrderBounds(prev=> [...prev,res.data])))},[ , data])

      const save=()=>{
        setDataSet(prev=>({...prev, orderBounds: acceptedOrderBounds}))
        handleClick(1)
      }

    return (
        <div className="justify-center  justify-items-center bg-zinc-50 mt-5 w-[px] md:w-[600px] rounded-lg p-5">
        <Field>
             {console.log(dataSet)}
             {console.log(mainProduct)}
             {console.log(orderBounds)}
            <Heading className="text-center my-5">Información de Venta</Heading>
            <Label>Selecciona el precio que deseas pagar</Label>
            <PriceCard  price={{name: "Precio Normal", price: mainProduct?.price}} setDataSet={setDataSet} setPriced={setPriced} selected={priced == "Precio Normal"}/> 
            {data?.prices?.map(price => <PriceCard price={price} setDataSet={setDataSet} selected={priced == price.name} setPriced={setPriced}/>)}
            <RadioGroup name="resale" defaultValue="permit" className="m-2" onChange={e=>setDataSet(prev=> ({...prev, paymentMethod: e}))}>
            <Label>Seleccione Método de pago</Label>
            {data?.paymentGateway && <RadioField><Radio value="paymentGateway" /><Label>Pago Online</Label></RadioField>}
            {data?.paymentOnDelivery && <RadioField><Radio value="paymentOnDelivery" /><Label>Pago contraentrega</Label></RadioField>}
      </RadioGroup>
      {data?.orderBounds && <Label>¿Deseas incluir este producto en tu compra? </Label>}
           {data?.orderBounds?.map(bound=> <OrderBound id={bound.idProduct} price={bound.price} orderBounds={acceptedOrderBounds} setOrderBounds={setAcceptedOrderBounds}/>)}
          {/* {!accepted ?  <p className="hover:underline" onClick={()=>{setDataSet(prev=> ({...prev, orderBoundAccepted: !accepted})); setAccepted(!accepted)}}>Añadir a mi compra</p> : <p className="text-center text-green-700">Añadido</p>} */}
        </Field>
        <Button disabled={  !dataSet.price || !dataSet.paymentMethod } color="yellow" onClick={save}>Siguiente</Button>
        </div>

    )
}