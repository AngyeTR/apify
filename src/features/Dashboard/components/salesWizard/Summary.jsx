import { useEffect, useState } from "react"
import { Heading } from "../../../../shared/components/uikit/heading"
import { getByCompanyId, getByID, getCities } from "../../../../shared/services/API/api"
import { HiOutlineTrash } from "react-icons/hi";
import { Input } from "../../../../shared/components/uikit/input";
import { HiOutlinePencil } from "react-icons/hi";
import { Button } from "../../../../shared/components/uikit/button";
import { useTunnelCart } from "../../hooks/useTunnelCart";
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage";

export const Summary = ({data, dataSet, setDataSet, handleClick})=>{
    const [products, setProducts ] = useState({orderBounds:[]})
    const [ total, setTotal] = useState(0)
    const [ editor, setEditor] = useState(false)
    const [ toDelete, setToDelete] = useState(null)
    const [internalData, setInternalData] = useState(dataSet)
    const [store] = useLocalStorage("store")
    const { removeProduct, updateCart, updateQuantity }  = useTunnelCart() 
    const sumar = ()=>{
    setTotal(dataSet?.price?.price)
    internalData?.orderBounds?.map(bound=> setTotal(prev=> (prev + data?.orderBounds.filter(orderbound=> orderbound.idProduct == bound.id)?.[0]?.price)))
    internalData?.upsaleAccepted && setTotal(prev=> (prev + data.upsell.price))
    internalData?.downsaleAccepted && setTotal(prev=> (prev + data.downsell.price))}

    useEffect(()=>{
        getByID("Products", data?.idProduct).then(res=> setProducts(prev=> ({...prev, "product": res.data} )))
        const bounds = []
        getByID("PreOrders", dataSet.cart.id).then(res=> setDataSet(prev=>({...prev, cart:res.data})))
        internalData?.orderBounds?.map(bound =>getByID("Products", bound.id).then(res=> bounds.push(res.data)))
        internalData?.upsaleAccepted || internalData?.downsaleAccepted ? getByID("Products", data.upsell.idProduct).then(res=> setProducts(prev=> ({...prev, "upsellProduct": res.data} ))): setProducts(prev=> ({...prev, "upsellProduct": null}))   
        setProducts(prev=> ({...prev, orderBounds: bounds}))
        sumar()},[ ])

    useEffect(()=>{sumar()},[internalData])

    const finishSale= async()=>{
        const carts = await  getByCompanyId("PreOrders", store.idCompany).then(res => res?.data?.filter(order=> order.idCustomer == dataSet.customerData.id))
        carts && setDataSet(prev=> ({...prev, cart: carts[carts.length -1]})) 
        setDataSet(internalData)
        handleClick(1)}

    const handleDeleteUpsell = async()=>{
       await  removeProduct(dataSet.cart, data.upsell.idProduct).then(res=>setDataSet(prev=>({...prev, cart: res})))
        setInternalData(prev=>({...prev, "upsaleAccepted": false, "downsaleAccepted":false}))
        const { upsellProduct, ...rest } = products
        setProducts(rest)}
    
    const handleDeleteOB = async(id)=>{
        await  removeProduct(dataSet.cart,  id).then(res=>setDataSet(prev=>({...prev, cart: res})))
        setInternalData(prev=>({...prev, "orderBounds": prev.orderBounds.filter(ob=> ob.id != id)}))
        setProducts(prev=>({...prev, "orderBounds": prev.orderBounds.filter(ob=> ob.id != id)}))}
    
     return (
        <div className="justify-center  justify-items-center bg-zinc-50 mt-5 w-[px] md:w-[600px] rounded-lg p-5">
            <Heading className="text-center"> Este es el resumen de tu Compra</Heading>
           {console.log(products)}
            <div key="product" className="grid grid-cols-3 w-[350px] justify-self-center place-items-center border border-zinc-400 rounded-lg m-5">
                <div ><img src={products.product?.images?.[0] ? products.product?.images?.[0]?.url :   "https://impresorasrenting.com/wp-content/uploads/2021/06/circulocromatico.jpg"} 
                className="border - border-zinc-400 w-[110px] h-[110px]"/></div>
                <div  className="col-span-2 p-1 m-2 justify-self-center">
                <h1 className="mb-1 font-medium">{products.product?.name} </h1>
                <p className="text-sm">{internalData?.price?.name}</p>
                <p>SubTotal: {internalData?.price?.price}</p>
                </div> 
            </div>
           {products.orderBounds?.map((bound) => 
            <div key={bound.id} className="grid grid-cols-3 w-[350px] justify-self-center place-items-center border border-zinc-400 rounded-lg m-5">
                <div ><img src={bound?.images?.[0] ? bound?.images?.[0]?.url :   "https://impresorasrenting.com/wp-content/uploads/2021/06/circulocromatico.jpg"} 
                className="border - border-zinc-400 w-[110px] h-[110px]"/></div>
                <div  className="col-span-2 p-1 m-2 justify-self-center">
                <h1 className="mb-1 font-medium">{bound?.name} </h1>
                <p>SubTotal: {dataSet?.orderBounds?.filter(ob=> ob.id== bound.id)?.[0]?.price}</p>
                <div className="size-6 text-red-600">{toDelete != bound.id ? <HiOutlineTrash onClick={()=> setToDelete(bound.id)}/>: <p className="text-xs cursor-pointer" onClick={()=>handleDeleteOB(bound.id)}>Confirmar Eliminación</p>}</div>
                </div> 
            </div>
           ) }

             {(internalData.upsaleAccepted || internalData.downsaleAccepted) &&    <div key="upsell" className="grid grid-cols-3 w-[350px] justify-self-center place-items-center border border-zinc-400 rounded-lg m-5">
                <div ><img src={products?.upsellProduct?.idProduct?.images?.[0] ? products?.upsell?.idProduct?.images?.[0]?.url :   "https://impresorasrenting.com/wp-content/uploads/2021/06/circulocromatico.jpg"} 
                className="border - border-zinc-400 w-[110px] h-[110px]"/></div>
                <div  className="col-span-2 p-1 m-2 justify-self-center">
                <h1 className="mb-1 font-medium">{products?.upsellProduct?.name} </h1>
                <p>SubTotal: {`${internalData?.upsaleAccepted ? data?.upsell?.price : data?.downsell?.price}`}</p>
                <div className="size-6 text-red-600">{toDelete != "upsell" ? <HiOutlineTrash  onClick={()=>setToDelete("upsell")}/>: <p className="text-xs cursor-pointer" onClick={()=>{ setInternalData(prev=>({...prev, "upsaleAccepted": false, "downsaleAccepted":false})); handleDeleteUpsell}}>Confirmar Eliminación</p>}</div>
                </div> 
            </div> }
            <Heading>Total: {total }</Heading>
           <div className="w-[350px] justify-self-center my-2 border border-zinc-300 rounded-lg p-3">
             <h1 className="text-start justify-self-start font-medium my-2">Dirección de Entrega: </h1>
             {!editor && <HiOutlinePencil onClick={()=>setEditor(true)}/>}
            {editor ? <Input placeholder="Ejemplo: calle 1 # 23-45 apartamento 67" onChange={e=> setInternalData(prev => ({...prev, customerData: { ...prev.customerData, address: e.target.value}}))}/>:
             <p>{internalData?.customerData?.address}, {internalData?.customerData?.city}</p>}
           </div>
           {        console.log(dataSet)
}
           <Button className="my-3" onClick={finishSale}>Finalizar Compra</Button>
        </div>
    )
}