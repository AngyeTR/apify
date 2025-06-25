import { useEffect } from "react"
import { Heading } from "../../../../shared/components/uikit/heading"
import { getByCompanyId } from "../../../../shared/services/API/api"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { useReport } from "../../hooks/useReport"

export const Thanks = ({dataSet, setDataSet})=> {
    const {reportPurchase} = useReport()
    const [store] = useLocalStorage("store")
    useEffect(()=>{  getByCompanyId("PreOrders", store.idCompany).then(res=> setDataSet(prev=> ({...prev, cart : res.data.filter(cart=> dataSet.customerData.id == cart.idCustomer)?.reverse()?.[0]}))) 
    reportPurchase(dataSet.customerData.email, dataSet.customerData.cellphone, "fbp", dataSet.cart.docTotal, dataSet.cart.id, dataSet.cart.lines.length  )    
    console.log(dataSet)
},[])
    
    return (
        <div className="justify-center  justify-items-center bg-zinc-50 mt-5 w-[px] md:w-[600px] rounded-lg p-5">
            <Heading>Gracias por tu compra</Heading>
            {console.log(dataSet)}
            <p className="my-10 mx-3">Recuerda que si tienes alguna duda o requieres mayor información sobre el estado de tu compra, puedes comunicarte a la línea: </p>
        </div>
    )
}