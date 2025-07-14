import { useEffect, useState } from "react"
import {  getByID } from "../../../../shared/services/API/landingApi"
import { HiArrowCircleRight } from "react-icons/hi";
import { Button } from "../../../../shared/components/uikit/button";


export const OrderBound = ({id, price, orderBounds, setOrderBounds})=> {
    const [product, setProduct] = useState(null)
    useEffect(()=>{const res = getByID("Product", id).then(res => setProduct(res.data))},[])
    return (
       <>
       {product && 
        <div className="grid grid-cols-3 w-[350px] justify-self-center place-items-center border border-zinc-400 rounded-lg m-5">
            <div ><img src={product?.images?.[0] ? product?.images?.[0]?.url :   "https://impresorasrenting.com/wp-content/uploads/2021/06/circulocromatico.jpg"} 
            className="border - border-zinc-400 w-[110px] h-[110px]"/></div>
             <div  className="col-span-2 border border-dotted border-zinc-400 rounded-lg p-3 m-2 justify-self-center">
                <h1 className="mb-2">{product?.name} </h1>
                 <div className="grid grid-cols-3 items-center"><p className="text-xs italic"> Precio regular: <span className="line-through">{product?.price}</span></p>
                <HiArrowCircleRight className="size-5 justify-self-center" />
                <p className="text-sm text-start justify-self-start font-medium"> Solo por hoy : <span >{price}</span></p></div>
                {orderBounds.filter(bound=> id == bound.id)?.[0] ? <p className="text-green-800">Añadido</p> : <Button color="green" onClick={()=>setOrderBounds(prev=>[...prev, {id:id, price:price, name:product?.name}])} className="my-1">Añadir</Button>}
            </div>
        </div>}
       </> 
    )
}