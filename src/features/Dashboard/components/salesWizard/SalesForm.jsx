import { Radio, RadioField, RadioGroup } from "../../../../shared/components/uikit/radio"
import { Description, Field, Label } from "../../../../shared/components/uikit/fieldset"
import { Heading } from "../../../../shared/components/uikit/heading"
import { PriceCard } from "./PriceCard"
import { OrderBound } from "./OrderBound"
import { Switch } from "../../../../shared/components/uikit/switch"
import { useEffect, useState } from "react"
import { getByID } from "../../../../shared/services/API/landingApi"
import { Button } from "../../../../shared/components/uikit/button"
import { useTunnelCart } from "../../hooks/useTunnelCart"

export const SalesForm =({data, setDataSet, dataSet, handleClick})=> {
    const [priced, setPriced] = useState(null)
    const [acceptedOrderBounds, setAcceptedOrderBounds] = useState([])
    const [mainProduct, setMainProduct] = useState(null)
    const [orderBounds, setOrderBounds] = useState([])
    const [cart, setCart] = useState(dataSet.cart)
    const { updateQuantity, updateCart }  = useTunnelCart()

    useEffect(()=>{
      getByID("Product", data?.idProduct).then(res=>{setMainProduct(res.data);console.log(res)})
      !dataSet.customerScore.isEnabled && setDataSet(prev=> ({...prev, paymentMethod: "paymentGateway"}))
      console.log(data.orderBounds)
      data?.orderBounds?.map(bound=> getByID("Product", bound.idProduct).then(res=>setOrderBounds(prev=> [...prev,res.data])))},[ , data])

      const save= async()=>{
        console.log(dataSet)
        console.log(acceptedOrderBounds)
        const result = await updateQuantity(dataSet.cart, mainProduct.id, dataSet.price.quantity, 0).then(res=> {console.log(res);()=> res; setDataSet(prev=> ({...prev, cart: res})); setCart(res)})
        setDataSet(prev=>({...prev, orderBounds: acceptedOrderBounds}))
        // dataSet.price.name != "Precio Normal" && await  updateQuantity(cart, data.idProduct, dataSet.price.quantity, dataSet.oldPrice-dataSet.price).then(res=>{setDataSet(prev=> ({...prev, cart: res})); setCart(res)})
        result?.status && console.log(result)
        acceptedOrderBounds?.map(ob=> updateCart(cart, {id:ob.id, name:ob.name, price:data?.orderBounds.filter(bound=> bound.idProduct == ob.id)?.[0]?.price}, dataSet.customerData.id).then(res => {setDataSet(prev=> ({...prev, cart: res})); setCart(res)}))
        acceptedOrderBounds?.map(ob=> console.log("ob ",ob))
        handleClick(1)
      }

    return (
        <div className="justify-center  justify-items-center bg-zinc-50 mt-5 w-[px] md:w-[600px] rounded-lg p-5">
        <Field>
            <Heading className="text-center my-5">Información de Venta</Heading>
            <Label>Selecciona el precio que deseas pagar</Label>
            <PriceCard  price={{name: "Precio Normal", price: mainProduct?.price}} setDataSet={setDataSet} setPriced={setPriced} selected={priced == "Precio Normal"}/> 
            {data?.prices?.map(price => <PriceCard price={price} setDataSet={setDataSet} selected={priced == price.name} setPriced={setPriced}/>)}
            <RadioGroup name="resale" defaultValue="permit" className="m-2" onChange={e=>setDataSet(prev=> ({...prev, paymentMethod: e}))}>
            {dataSet.customerScore.isEnabled ? <>
            <Label>Seleccione Método de pago</Label>
             {data?.paymentGateway && <RadioField><Radio value="paymentGateway" /><Label>Pago Online</Label></RadioField>}
            {data?.paymentOnDelivery && <RadioField><Radio value="paymentOnDelivery" /><Label>Pago contraentrega</Label></RadioField>}
            </>: <p className="my-3 underline">Pago anticipado requerido</p>}
            </RadioGroup>
      {data?.orderBounds && <Label>¿Deseas incluir este producto en tu compra? </Label>}
           {data?.orderBounds?.map(bound=> <OrderBound id={bound.idProduct} price={bound.price} orderBounds={acceptedOrderBounds} setOrderBounds={setAcceptedOrderBounds}/>)}
          {/* {!accepted ?  <p className="hover:underline" onClick={()=>{setDataSet(prev=> ({...prev, orderBoundAccepted: !accepted})); setAccepted(!accepted)}}>Añadir a mi compra</p> : <p className="text-center text-green-700">Añadido</p>} */}
        </Field>
        <Button disabled={  !dataSet.price || !dataSet.paymentMethod } color="yellow" onClick={save}>Siguiente</Button>
        </div>

    )
}