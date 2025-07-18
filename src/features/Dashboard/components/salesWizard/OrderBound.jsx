import { useEffect, useState } from "react"
import {  getByID } from "../../../../shared/services/API/landingApi"
import { HiArrowCircleRight } from "react-icons/hi";
import { Button } from "../../../../shared/components/uikit/button";
import { RadioField, Radio } from "../../../../shared/components/uikit/radio";


export const OrderBound = ({id, price, orderBounds, setOrderBounds})=> {
    const [product, setProduct] = useState(null)
    useEffect(()=>{const res = getByID("Product", id).then(res => setProduct(res.data))},[])
    return (
       <>
       {product && 
        <RadioField><Radio value="paymentGateway" /><div className="flex w-[350px] justify-self-center place-items-center border border-zinc-400 rounded-lg m-5">
            <div className="w-[120px] justify-items-center"><img src={product?.images?.[0] ? product?.images?.[0]?.url :   "https://impresorasrenting.com/wp-content/uploads/2021/06/circulocromatico.jpg"} 
            className=" w-[110px] h-[110px]"/></div>
            <div  className="w-[220px]  rounded-lg p-3 m-2 justify-self-center">
                <h1 className="mb-2 font-semibold text-lg">{product?.name} </h1>
                <div className="items-center ">
                {/* <p className="text-xs italic"> Antes: <span className="line-through"> ${Number(product?.price).toLocaleString('es-CO')}</span></p>
                <HiArrowCircleRight className="size-5 justify-self-center" />
                <p className="text-sm text-start justify-self-start font-medium"> Ahora : <span >${Number(price).toLocaleString('es-CO')}</span></p></div> */}
                <p className="text-sm text-start justify-self-start font-medium"> Solo por hoy  <span className="line-through"> ${Number(product?.price).toLocaleString('es-CO')}</span></p>
                <p className="text-lg font-semibold text-lg">${Number(price).toLocaleString('es-CO')}</p></div>
                {/* {orderBounds.filter(bound=> id == bound.id)?.[0] ? <p className="text-green-800">Añadido</p> : <Button color="green" onClick={()=>setOrderBounds(prev=>[...prev, {id:id, price:price, name:product?.name}])} className="my-1">Añadir</Button>} */}
            </div>
        </div></RadioField>}
       </> 
    )
}