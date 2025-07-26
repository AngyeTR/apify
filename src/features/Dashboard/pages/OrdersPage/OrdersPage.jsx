import { useEffect, useState } from "react"
import { MyLayout } from "../../components/myComponents/MyLayout"
import { MyStoreForms } from "../../components/myComponents/MyStoreForms"
import { getByCompanyId } from "../../../../shared/services/API/api"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { OrdersTable } from "../../components/newTables/OrdersTable"

export const OrdersPage =() => {
    const [stored] = useLocalStorage("data")
    const [data, setData] = useState(null)
    const [ view, setView] = useState(null)
    useEffect(()=>{getByCompanyId("PreOrders", stored.company.id).then(res=> setData(res.data))},[])

    return (
        <MyLayout>
            {
                data && <OrdersTable data={data.reverse()} setView={setView}/>
            }
            
        </MyLayout>
    )
}