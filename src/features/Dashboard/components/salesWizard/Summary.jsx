import { useEffect, useState } from "react"
import { Heading } from "../../../../shared/components/uikit/heading"
import { getByCompanyId, getByID, postNavigation } from "../../../../shared/services/API/landingApi"
import { Input } from "../../../../shared/components/uikit/input";
import { HiOutlineCheck , HiOutlinePencil, HiOutlineTrash  } from "react-icons/hi";
import { Button } from "../../../../shared/components/uikit/button";
import { useTunnelCart } from "../../hooks/useTunnelCart";
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage";
import { adaptNavigationModel } from "../../utils/adaptDataModel";
import { navigationModel } from "../../utils/models";
import { Divider } from "../../../../shared/components/uikit/divider";


export const Summary = ({data, dataSet, setDataSet, handleClick, uuid})=>{
    console.log(data, dataSet)
    const [error, setError] = useState(null)
    const [products, setProducts ] = useState({orderBounds:[]})
    const [ total, setTotal] = useState(0)
    const [ editor, setEditor] = useState(false)
    const [ toDelete, setToDelete] = useState(null)
    const [ newAddress, setNewAddress] = useState(null)
    const [internalData, setInternalData] = useState(dataSet)
    const [store] = useLocalStorage("store")
    const { removeProduct, updateCart, updateQuantity, finishCart }  = useTunnelCart() 
    const sumar = ()=>{
    setTotal(dataSet?.price?.price)
    internalData?.orderBounds?.map(bound=> setTotal(prev=> (prev + data?.orderBounds.filter(orderbound=> orderbound.idProduct == bound.id)?.[0]?.price)))
    internalData?.upsaleAccepted && setTotal(prev=> (prev + data.upsell.price))
    internalData?.downsaleAccepted && setTotal(prev=> (prev + data.downsell.price))}

    useEffect(()=>{
        getByID("Product", data?.idProduct).then(res=> setProducts(prev=> ({...prev, "product": res.data} )))
        const bounds = []
        getByID("Order", dataSet.cart.id).then(res=> setDataSet(prev=>({...prev, cart:res.data})))
        internalData?.orderBounds?.map(bound =>getByID("Product", bound.id).then(res=> bounds.push(res.data)))
        internalData?.upsaleAccepted || internalData?.downsaleAccepted ? getByID("Product", data.upsell.idProduct).then(res=> setProducts(prev=> ({...prev, "upsellProduct": res.data} ))): setProducts(prev=> ({...prev, "upsellProduct": null}))   
        setProducts(prev=> ({...prev, orderBounds: bounds}))
        sumar()},[ ])

    useEffect(()=>{sumar()},[internalData])

    console.log( data, dataSet, internalData)

    const finishSale= async()=>{
        const carts = await  getByCompanyId("Orders", store.idCompany).then(res => res?.data?.filter(order=> order.idCustomer == dataSet.customerData.id))
        carts && setDataSet(prev=> ({...prev, cart: carts[carts.length -1]}))
        carts && finishCart(carts[carts.length -1], dataSet.customerScore.score, `${internalData.customerData.address}, ${internalData.customerData.cityData.name}`) 
        setDataSet(internalData)
        const adaptedModel = adaptNavigationModel(navigationModel,  "purchase", data.layouts[0].idLayout, uuid, 0, 0, 4, true, dataSet.cart.id )
       postNavigation( adaptedModel).then(res=> console.log(res))
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

    const updateAddress = ()=>{
        if(newAddress.length > 8){
            setInternalData(prev =>  ({...prev, customerData: { ...prev.customerData, address: newAddress}}))
            setEditor(false)
            setError(null)
        } else {setError("Dirección incompleta")}
    }
    
     return (
        <div className="justify-center text-center justify-items-center justify-center bg-zinc-50 mt-5 w-[400px] md:w-[600px] rounded-lg p-5">
            <Heading className="text-center"> Este es el resumen de tu Compra</Heading>  
            <div key="product" className="text-start flex w-[350px] h-[120px] justify-self-center place-items-center border border-zinc-400 rounded-lg m-5">
                <div className="w-[120px] justify-items-center">
                    <img src={products.product?.images?.[0] ? products.product?.images?.[0]?.url :   "https://impresorasrenting.com/wp-content/uploads/2021/06/circulocromatico.jpg"} 
                    className=" w-[110px] h-[110px]"/></div>
                <div  className="w-[220px] p-1 m-2 justify-self-center">
                <h1 className="mb-1 font-semibold text-xl">{products.product?.name} </h1>
                <p className="text-sm">{internalData?.price?.name}</p>
                <p>SubTotal: ${Number(internalData?.price?.price).toLocaleString('es-CO')}</p>
                </div> 
            </div>

           {products.orderBounds?.map((bound) => 
            <div key={bound.id} className="text-start  flex relative w-[350px] h-[120px] justify-self-center place-items-center border border-zinc-400 rounded-lg m-5">
                <div className="w-[120px] justify-items-center"><img src={bound?.images?.[0] ? bound?.images?.[0]?.url :   "https://impresorasrenting.com/wp-content/uploads/2021/06/circulocromatico.jpg"} 
                className=" w-[110px] h-[110px]"/></div>
                <div  className="w-[220px]p-1 m-2 justify-self-center">
                <h1 className="mb-1 font-semibold text-xl">{bound?.name} </h1>
                <p>SubTotal: $ {Number(dataSet?.orderBounds?.find(ob=> ob.id== bound.id)?.price).toLocaleString('es-CO')} </p>
                <div className=" absolute top-2 right-2 size-6 text-red-600">{toDelete != bound.id ? 
                    <HiOutlineTrash onClick={()=> setToDelete(bound.id)} className="size-7"/>: <div className="bg-white z-2 border border-zinc-300 w-fit p-1 rounded-md">
                    <p className="text-sm cursor-pointer" onClick={()=>handleDeleteOB(bound.id)}>Confirmar Eliminación</p></div>}</div>
                </div> 
            </div>
           ) }

            {(internalData.upsaleAccepted || internalData.downsaleAccepted) &&    
            <div key="upsell" className="relative text-start  flex w-[350px] h-[120px] justify-self-center place-items-center border border-zinc-400 rounded-lg m-5">
                <div className="w-[120px] justify-items-center"><img src={products?.upsellProduct?.idProduct?.images?.[0] ? products?.upsell?.idProduct?.images?.[0]?.url :   "https://impresorasrenting.com/wp-content/uploads/2021/06/circulocromatico.jpg"} 
                className=" w-[110px] h-[110px]"/></div>
                <div  className="w-[220px] p-1 m-2 justify-self-center">
                <h1 className="mb-1 font-semibold text-xl">{products?.upsellProduct?.name} </h1>
                <p>SubTotal: ${Number(internalData?.upsaleAccepted ? data?.upsell?.price : data?.downsell?.price).toLocaleString('es-CO')}</p>
                {/* <div className="size-6 text-red-600">{toDelete != "upsell" ? <HiOutlineTrash  onClick={()=>setToDelete("upsell")}/>: <p className="text-xs cursor-pointer" onClick={()=>{ setInternalData(prev=>({...prev, "upsaleAccepted": false, "downsaleAccepted":false})); handleDeleteUpsell}}>Confirmar Eliminación</p>}</div> */}
                <div className=" absolute top-2 right-2 size-6 text-red-600">
                    {console.log(toDelete != "upsell")}
                    {toDelete != "upsell" ? 
                    <HiOutlineTrash onClick={()=>setToDelete("upsell")} className="size-7"/> : 
                    <div className="bg-white z-2 border border-zinc-300 w-fit p-1 rounded-md">
                    <p className="text-sm cursor-pointer" onClick={()=>{ setInternalData(prev=>({...prev, "upsaleAccepted": false, "downsaleAccepted":false})); handleDeleteUpsell()}}>Confirmar Eliminación</p>
                    </div>}
                    
                </div>
                </div> 
            </div> }
            
            <h1 className="text-2xl font-semibold">Total: ${Number(total).toLocaleString('es-CO')}</h1>
            <Divider className="m-6 "/>
            <div className=" relative w-[350px] justify-self-center my-2 p-3">
             <Heading className="text-start justify-self-start font-medium my-2">Dirección de Entrega: </Heading>
             {editor ? <HiOutlineCheck className="absolute size-6 top-8 right-5" onClick={updateAddress}/> : <HiOutlinePencil className="absolute size-6 top-8 right-5" onClick={()=>setEditor(true)}/>}
            {editor ? <Input placeholder="Ejemplo: calle 1 # 23-45 apartamento 67" defaultValue={internalData?.customerData?.address} 
            onChange={e=> {setNewAddress(e.target.value); setError(null)}}/>:
            <p>{internalData?.customerData?.address}, {internalData?.customerData?.cityData.name}</p>}
            {error && <p className="text-xs text-red-500 italic">{error}</p>}
           </div>
        <button className="my-3 text-xl font-semibold bg-zinc-900 py-2 px-4 rounded-lg text-white hover:bg-zinc-800" onClick={finishSale}>Finalizar Compra</button>
        </div>
    )
}