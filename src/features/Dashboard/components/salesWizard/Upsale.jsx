import { useEffect, useState } from "react";
import { Heading } from "../../../../shared/components/uikit/heading";
import { getByCompanyId, getByID } from "../../../../shared/services/API/api";
import { Button } from "../../../../shared/components/uikit/button";

export const Upsale = ({data, dataSet, setDataSet, handleUpsell})=> {
    const [product, setProduct] = useState(null)
    const [accepted, setAccepted] = useState(false)
    useEffect(()=>{const res = getByID("Products", data.upsell.idProduct).then(res => setProduct(res.data))},[])
    
    return (
    <div className="justify-center justify-items-center bg-zinc-50 mt-5 w-[px] md:w-[600px] rounded-lg p-5">
<Heading className="text-center">Tenemos una gran oportunidad para ti</Heading>
 <iframe
      src={`http://localhost:5173/designer/view/${data.upsell.idLayout}`}
      width="100%"
      height="400"
      title="Ejemplo iframe"
      style={{ border: 'none' }}
    ></iframe>
<h2 className="font-semibold text-center my-1">Lleva este producto:</h2>

<h2 className="font-bold text-center text-lg">{product?.name}</h2>
<h2 className="font-semibold text-center text-md">Por tan solo ${data.upsell.price}</h2>
{!accepted ?  <Button color="green" className="my-2 justify-self-center" onClick={()=>{setDataSet(prev=> ({...prev, upsaleAccepted: true})); setAccepted(true)}}>Añadir a mi compra</Button> : <p className="text-green-700">Añadido</p>}

<div className="justify-center"><Button   color="yellow" onClick={handleUpsell}>Siguiente</Button></div>

</div>
    )
}