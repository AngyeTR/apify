import { useEffect, useState } from "react";
import { Heading } from "../../../../shared/components/uikit/heading";
import {  getByID } from "../../../../shared/services/API/landingApi";
import { Button } from "../../../../shared/components/uikit/button";
import { useTunnelCart } from "../../hooks/useTunnelCart"

export const Upsale = ({data, dataSet, setDataSet, handleUpsell})=> {
    const host = window.location.origin
    const [product, setProduct] = useState(null)
    const [accepted, setAccepted] = useState(false)
    const { updateQuantity, updateCart }  = useTunnelCart()

    useEffect(()=>{const res = getByID("Product", data.upsell.idProduct).then(res => setProduct(res.data))},[])
    
    const handleUpdateCart =async ()=>{
    await updateCart(dataSet.cart, {id: product.id, name: product.name, price: data.upsell.price }, dataSet.customerData.id).then(res=>console.log(res))
    handleUpsell()
}

    return (
    <div className="justify-center justify-items-center text-center bg-zinc-50 mt-5 w-[px] md:w-[600px] rounded-lg p-5">
<Heading className="text-center">Tenemos una gran oportunidad para ti</Heading>
{console.log(`${host}/dashboard/layout/${data.upsell.idLayout}`)}
 <iframe
      src={`${host}/dashboard/layout/${data.upsell.idLayout}`}
      width="100%"
      height="400"
      title="Ejemplo iframe"
      style={{ border: 'none' }}
    ></iframe>
<h2 className="font-semibold text-center my-1">Lleva este producto:</h2>

<h2 className="font-bold text-center text-lg">{product?.name}</h2>
<h2 className="font-semibold text-center text-md">Por tan solo ${data.upsell.price}</h2>
{!accepted ?  <Button color="green" className="my-2 justify-self-center" onClick={()=>{setDataSet(prev=> ({...prev, upsaleAccepted: true})); setAccepted(true)}}>Añadir a mi compra</Button> : <p className="text-green-700">Añadido</p>}

<div className="justify-center justify-self-center"><Button   color="yellow" onClick={handleUpdateCart}>Siguiente</Button></div>

</div>
    )
}