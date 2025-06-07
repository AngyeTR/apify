import { useEffect, useState } from "react"
import { Heading } from "../../../../shared/components/uikit/heading"
import { getByID, getCities } from "../../../../shared/services/API/api"
import { OrderBound } from "./OrderBound"
import { HiOutlineTrash } from "react-icons/hi";
import { Input } from "../../../../shared/components/uikit/input";
import { HiOutlinePencil } from "react-icons/hi";
import { Button } from "../../../../shared/components/uikit/button";


export const Summary = ({data, dataSet, setDataSet, handleClick})=>{
    const [products, setProducts ] = useState({})
    const [ total, setTotal] = useState(0)
    const [ editor, setEditor] = useState(false)
    const [ toDelete, setToDelete] = useState(null)
    const [internalData, setInternalData] = useState(dataSet)
    const sumar = ()=>{
    setTotal(dataSet.price.finalPrice)
    internalData.orderBoundAccepted && setTotal(prev=> (prev + data.orderBoundPrice))
    internalData.upsaleAccepted && setTotal(prev=> (prev + data.upsellPrice))
    internalData.downsaleAccepted && setTotal(prev=> (prev + data.downsellPrice))
    }
    useEffect(()=>{
        getByID("Products", data.productId).then(res=> setProducts(prev=> ({...prev, "product": res.data} )))
        internalData?.orderBoundAccepted ?  getByID("Products", data.orderBoundId).then(res=> setProducts(prev=> ({...prev, "orderBoundProduct": res.data}))): setProducts(prev=> ({...prev, "orderBoundProduct": null}))
        internalData?.upsaleAccepted || internalData?.downsaleAccepted ? getByID("Products", data.upsellId).then(res=> setProducts(prev=> ({...prev, "upsellProduct": res.data} ))): setProducts(prev=> ({...prev, "Upsellproduct": null}))   
        sumar()
    },[ , internalData])

    const finishSale=()=>{
        console.log("finish")
        setDataSet(internalData)
        handleClick(1)
    }
    return (
        <div className="justify-center  justify-items-center bg-zinc-50 mt-5 w-[px] md:w-[600px] rounded-lg p-5">
            <Heading className="text-center"> Este es el resumen de tu Compra</Heading>
       
            <div key="product" className="grid grid-cols-3 w-[350px] justify-self-center place-items-center border border-zinc-400 rounded-lg m-5">
                <div ><img src={products.product?.images?.[0] ? products.product?.images?.[0]?.url :   "https://impresorasrenting.com/wp-content/uploads/2021/06/circulocromatico.jpg"} 
                className="border - border-zinc-400 w-[110px] h-[110px]"/></div>
                <div  className="col-span-2 p-1 m-2 justify-self-center">
                <h1 className="mb-1 font-medium">{products.product?.name} </h1>
                <p className="text-sm">{internalData.price.name}</p>
                <p>SubTotal: {internalData.price.finalPrice}</p>
                {/* <div className="size-6 text-red-600">{toDelete != "product" ? <HiOutlineTrash onClick={()=> setToDelete("product")}/>: <p className="text-xs" >Confirmar Eliminación</p>}</div> */}
                </div> 
            </div>

           {internalData.orderBoundAccepted &&    <div key="orderBound" className="grid grid-cols-3 w-[350px] justify-self-center place-items-center border border-zinc-400 rounded-lg m-5">
                <div ><img src={products.orderBoundProduct?.images?.[0] ? products.orderBoundProduct?.images?.[0]?.url :   "https://impresorasrenting.com/wp-content/uploads/2021/06/circulocromatico.jpg"} 
                className="border - border-zinc-400 w-[110px] h-[110px]"/></div>
                <div  className="col-span-2 p-1 m-2 justify-self-center">
                <h1 className="mb-1 font-medium">{products.orderBoundProduct?.name} </h1>
                <p>SubTotal: {data.orderBoundPrice}</p>
                <div className="size-6 text-red-600">{toDelete != "orderBound" ? <HiOutlineTrash onClick={()=> setToDelete("orderBound")}/>: <p className="text-xs cursor-pointer" onClick={()=>setInternalData(prev=>({...prev, "orderBoundAccepted": false}))}>Confirmar Eliminación</p>}</div>
                </div> 
            </div> }

             {(internalData.upsaleAccepted || internalData.downsaleAccepted) &&    <div key="upsell" className="grid grid-cols-3 w-[350px] justify-self-center place-items-center border border-zinc-400 rounded-lg m-5">
                <div ><img src={products.upsellProduct?.images?.[0] ? products.upsellProduct?.images?.[0]?.url :   "https://impresorasrenting.com/wp-content/uploads/2021/06/circulocromatico.jpg"} 
                className="border - border-zinc-400 w-[110px] h-[110px]"/></div>
                <div  className="col-span-2 p-1 m-2 justify-self-center">
                <h1 className="mb-1 font-medium">{products.upsellProduct?.name} </h1>
                <p>SubTotal: {`${internalData?.upsaleAccepted ? data.upsellPrice : data.downsellPrice}`}</p>
                <div className="size-6 text-red-600">{toDelete != "upsell" ? <HiOutlineTrash  onClick={()=>setToDelete("upsell")}/>: <p className="text-xs cursor-pointer" onClick={()=>setInternalData(prev=>({...prev, "upsaleAccepted": false, "downsaleAccepted":false}))}>Confirmar Eliminación</p>}</div>
                </div> 
            </div> }
            <Heading>Total: {total }</Heading>
           <div className="w-[350px] justify-self-center my-2 border border-zinc-300 rounded-lg p-3">
             <h1 className="text-start justify-self-start font-medium my-2">Dirección de Entrega: </h1>
             {!editor && <HiOutlinePencil onClick={()=>setEditor(true)}/>}
            {editor ? <Input placeholder="Ejemplo: calle 1 # 23-45 apartamento 67" onChange={e=> setInternalData(prev => ({...prev, customerData: { ...prev.customerData, address: e.target.value}}))}/>:
             <p>{internalData.customerData.address}, {internalData.customerData.city.name}</p>}
           </div>
           {console.log(internalData, products)}
           <Button className="my-3" onClick={finishSale}>Finalizar Compra</Button>
        </div>
    )
}