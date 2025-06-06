import { useEffect, useState } from "react"
import { Heading } from "../../../../shared/components/uikit/heading"
import { getByID } from "../../../../shared/services/API/api"
import { OrderBound } from "./OrderBound"
import { HiOutlineTrash } from "react-icons/hi";

export const Summary = ({data, dataSet, setDataSet, handleClick})=>{
    const [products, setProducts ] = useState({})
    const [ total, setTotal] = useState(0)
    const sumar = ()=>{
    setTotal(dataSet.price.finalPrice)
    dataSet.orderBoundAccepted && setTotal(prev=> (prev + data.orderBoundPrice))
    dataSet.upsaleAccepted && setTotal(prev=> (prev + data.upsellPrice))
    dataSet.downsaleAccepted && setTotal(prev=> (prev + data.downsellPrice))
    }
    useEffect(()=>{
        getByID("Products", data.productId).then(res=> setProducts(prev=> ({...prev, "product": res.data} )))
        dataSet?.orderBoundAccepted ?  getByID("Products", data.orderBoundId).then(res=> setProducts(prev=> ({...prev, "orderBoundProduct": res.data}))): setProducts(prev=> ({...prev, "orderBoundProduct": null}))
        dataSet?.upsaleAccepted || dataSet?.downsaleAccepted ? getByID("Products", data.upsellId).then(res=> setProducts(prev=> ({...prev, "upsellProduct": res.data} ))): setProducts(prev=> ({...prev, "Upsellproduct": null}))   
        sumar()
    },[])
    return (
        <div className="justify-center  justify-items-center bg-zinc-50 mt-5 w-[px] md:w-[600px] rounded-lg p-5">
            <Heading className="text-center"> Este es el resumen de tu Compra</Heading>
       
            <div className="grid grid-cols-3 w-[350px] justify-self-center place-items-center border border-zinc-400 rounded-lg m-5">
                <div ><img src={products.product?.images?.[0] ? products.product?.images?.[0]?.url :   "https://impresorasrenting.com/wp-content/uploads/2021/06/circulocromatico.jpg"} 
                className="border - border-zinc-400 w-[110px] h-[110px]"/></div>
                <div  className="col-span-2 p-1 m-2 justify-self-center">
                <h1 className="mb-1 font-medium">{products.product?.name} </h1>
                <p className="text-sm">{dataSet.price.name}</p>
                <p>SubTotal: {dataSet.price.finalPrice}</p>
                <div className="size-6 text-red-600"><HiOutlineTrash /></div>
                </div> 
            </div>

           {products.orderBoundProduct &&    <div className="grid grid-cols-3 w-[350px] justify-self-center place-items-center border border-zinc-400 rounded-lg m-5">
                <div ><img src={products.orderBoundProduct?.images?.[0] ? products.orderBoundProduct?.images?.[0]?.url :   "https://impresorasrenting.com/wp-content/uploads/2021/06/circulocromatico.jpg"} 
                className="border - border-zinc-400 w-[110px] h-[110px]"/></div>
                <div  className="col-span-2 p-1 m-2 justify-self-center">
                <h1 className="mb-1 font-medium">{products.orderBoundProduct?.name} </h1>
                <p>SubTotal: {data.orderBoundPrice}</p>
                <div className="size-6 text-red-600"><HiOutlineTrash /></div>
                </div> 
            </div> }

             {(products.upsellProduct) &&    <div className="grid grid-cols-3 w-[350px] justify-self-center place-items-center border border-zinc-400 rounded-lg m-5">
                <div ><img src={products.upsellProduct?.images?.[0] ? products.upsellProduct?.images?.[0]?.url :   "https://impresorasrenting.com/wp-content/uploads/2021/06/circulocromatico.jpg"} 
                className="border - border-zinc-400 w-[110px] h-[110px]"/></div>
                <div  className="col-span-2 p-1 m-2 justify-self-center">
                <h1 className="mb-1 font-medium">{products.upsellProduct?.name} </h1>
                <p>SubTotal: {`${dataSet?.upsaleAccepted ? data.upsellPrice : data.downsellPrice}`}</p>
                <div className="size-6 text-red-600"><HiOutlineTrash /></div>
                </div> 
            </div> }
            
            <Heading>Total: {total }</Heading>
        </div>
    )
}