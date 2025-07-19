import { Radio, RadioField, RadioGroup } from "../../../../shared/components/uikit/radio"
import { Description, Field, Label } from "../../../../shared/components/uikit/fieldset"
import { Heading } from "../../../../shared/components/uikit/heading"
import { PriceCard } from "./PriceCard"
import { OrderBound } from "./OrderBound"
import { Switch } from "../../../../shared/components/uikit/switch"
import { Divider } from "../../../../shared/components/uikit/divider"
import { useEffect, useState } from "react"
import { getByID } from "../../../../shared/services/API/landingApi"
import { Button } from "../../../../shared/components/uikit/button"
import { useTunnelCart } from "../../hooks/useTunnelCart"
import { CheckboxGroup } from "../../../../shared/components/uikit/checkbox"

export const SalesForm =({data, setDataSet, dataSet, handleClick})=> {
    const [priced, setPriced] = useState(null)
    const [acceptedOrderBounds, setAcceptedOrderBounds] = useState([])
    const [mainProduct, setMainProduct] = useState(null)
    const [orderBounds, setOrderBounds] = useState([])
    const [cart, setCart] = useState(dataSet.cart)
    const { updateQuantity, updateCart }  = useTunnelCart()
    const checked = data?.paymentOnDelivery && data?.paymentGateway
    

    useEffect(()=>{
      getByID("Product", data?.idProduct).then(res=>{setMainProduct(res.data);console.log(res)})
      setDataSet(prev => ({ ...prev, price: { name: "Precio Normal", price: mainProduct?.price, quantity: 1 } }));
      setPriced({ name: "Precio Normal", price: mainProduct?.price, quantity: 1 });
      !dataSet.customerScore.isEnabled && setDataSet(prev=> ({...prev, paymentMethod: "paymentGateway"}))
      const defaultPaymentMethod = data?.paymentGateway ? "paymentGateway" : data?.paymentOnDelivery ? "paymentOnDelivery": null
      !checked && setDataSet(prev=> ({...prev, paymentMethod: defaultPaymentMethod}))
      data?.orderBounds?.map(bound=> getByID("Product", bound.idProduct).then(res=>setOrderBounds(prev=> [...prev,res.data])))},[ , data])

      const save= async()=>{
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
{          console.log(dataSet)
}{        console.log(data)}      
          <Heading className="text-center my-5">Información de Venta</Heading>
          <Label>Selecciona el precio que deseas pagar</Label>
          <RadioGroup name="price"  className="m-2" defaultValue="Precio Normal"
          onChange={(selectedName) => { const selectedPrice = [{ name: "Precio Normal", price: mainProduct?.price, quantity: 1 },...data?.prices ?? []].find(p => p.name === selectedName);
          setDataSet(prev => ({ ...prev, price: selectedPrice }));
          setPriced(selectedName)}}
          >
            <PriceCard  price={{name: "Precio Normal", price: mainProduct?.price, quantity: 1}} setDataSet={setDataSet} setPriced={setPriced} selected={priced?.name == "Precio Normal"}/> 
            {data?.prices?.map(price => <PriceCard price={price} setDataSet={setDataSet} selected={priced == price.name} setPriced={setPriced}/>)}
            </RadioGroup>

          <Divider className="my-6"/>
          <RadioGroup name="paymentMethod" defaultValue={data?.paymentOnDelivery ? "paymentOnDelivery" : "paymentGateway"} className="m-2" onChange={e=>setDataSet(prev=> ({...prev, paymentMethod: e}))}>
            {dataSet.customerScore.isEnabled ? <>
            <Label>Seleccione Método de pago</Label>
            {data?.paymentGateway && <RadioField><Radio value="paymentGateway" /><Label>Pago Online</Label></RadioField>}
            {data?.paymentOnDelivery && <RadioField><Radio value="paymentOnDelivery" /><Label>Pago contraentrega</Label></RadioField>}
            </>: <p className="my-3 underline">Pago anticipado requerido</p>}
          </RadioGroup>
          
          <Divider className="my-6"/>
          {data?.orderBounds && <Label>¿Deseas incluir este producto en tu compra? </Label>}
          <CheckboxGroup>
            {data?.orderBounds?.map(bound=> <OrderBound id={bound.idProduct} price={bound.price} orderBounds={acceptedOrderBounds} setOrderBounds={setAcceptedOrderBounds}/>)}
          </CheckboxGroup>
        </Field>
        <Button disabled={  !dataSet.price || !dataSet.paymentMethod } color="yellow" onClick={save}>Siguiente</Button>
        </div>

    )
}