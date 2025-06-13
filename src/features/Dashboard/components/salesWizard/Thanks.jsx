import { useEffect } from "react"
import { Heading } from "../../../../shared/components/uikit/heading"
import { getByCompanyId } from "../../../../shared/services/API/api"

export const Thanks = ({dataSet, setDataSet})=> {
    useEffect(()=>{  getByCompanyId("PreOrders", 1).then(res=> setDataSet(prev=> ({...prev, cart : res.data.filter(cart=> dataSet.customerData.id == cart.idCustomer)?.reverse()?.[0]})))
    // useEffect(()=>{  getByCompanyId("PreOrders", 1).then(res=> console.log( res.data.filter(cart=> dataSet.customerData.id == cart.idCustomer).reverse()?.[0]))
    },[])
    return (
        <div className="justify-center  justify-items-center bg-zinc-50 mt-5 w-[px] md:w-[600px] rounded-lg p-5">
            <Heading>Gracias por tu compra</Heading>
            {console.log(dataSet)}
            <p className="my-10 mx-3">Recuerda que si tienes alguna duda o requieres mayor información sobre el estado de tu compra, puedes comunicarte a la línea: </p>
        </div>
    )
}