import { useEffect, useState } from "react";
import { Heading } from "../../../../shared/components/uikit/heading";
import { getByID } from "../../../../shared/services/API/landingApi";
import { Button } from "../../../../shared/components/uikit/button";
import { useTunnelCart } from "../../hooks/useTunnelCart"

export const Downsale = ({data, dataSet, setDataSet, handleClick})=> {
    const [product, setProduct] = useState(null)
    const [accepted, setAccepted] = useState(false)
    const { updateCart }  = useTunnelCart()
     
    useEffect(()=>{const res = getByID("Product", data.upsell.idProduct).then(res => setProduct(res.data))},[])
    
    const handleUpdateCart =async()=>{
        await updateCart(dataSet.cart, {id: product.id, name: product.name, price: data.downsell.price }, dataSet.customerData.id).then(res=>console.log(res))
        handleClick(1)
    }

    return (
    <div className="justify-center  justify-items-center bg-zinc-50 mt-5 w-[px] md:w-[600px] rounded-lg p-5">
<Heading className="text-center">Tenemos una gran oportunidad para ti</Heading>
 <iframe
      src={`http://localhost:5173/designer/view/${data.downsell.idLayout}`}
      width="100%"
      height="400"
      title="Ejemplo iframe"
      style={{ border: 'none' }}
    ></iframe>
<h2 className="font-semibold text-center my-1">¡Última Oportunidad!</h2>
<h2 className="font-bold text-center text-lg">{product?.name}</h2>
<h2 className="font-semibold text-center text-md">Por tan solo ${data.downsell.price}</h2>
{!accepted ?  <Button color="green" className="my-2 justify-self-center" onClick={()=>{setDataSet(prev=> ({...prev, downsaleAccepted: true})); setAccepted(true)}}>Añadir a mi compra</Button> : <p className="text-green-700">Añadido</p>}
<div className="justify-center"><Button  color="yellow" onClick={handleUpdateCart}>Siguiente</Button></div>

</div>
                

    )
}