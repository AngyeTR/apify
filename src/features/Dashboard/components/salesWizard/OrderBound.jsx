import { useEffect, useState } from "react"
import { getByCompanyId, getByID } from "../../../../shared/services/API/api"
import { HiArrowCircleRight } from "react-icons/hi";


export const OrderBound = ({id, price})=> {
    const [product, setProduct] = useState(null)
    useEffect(()=>{const res = getByID("Products", id).then(res => setProduct(res.data))},[])
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
            </div>
        </div>}
       </>
    )
}