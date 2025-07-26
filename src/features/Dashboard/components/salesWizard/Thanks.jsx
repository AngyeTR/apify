import { IoLogoWhatsapp } from "react-icons/io";
import { useEffect, useState } from "react"
import { Heading } from "../../../../shared/components/uikit/heading"
import { getByCompanyId, getByID } from "../../../../shared/services/API/landingApi"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { useReport } from "../../hooks/useReport"

export const Thanks = ({data, dataSet})=> {
    const {reportPurchase} = useReport()
    const [url, setUrl] = useState(null)
    const [ phone, setPhone] = useState(null)
    const [store] = useLocalStorage("store")
    useEffect(()=>{
        getByID("Product", data.idProduct).then(res=> setUrl(res.data?.images?.[0]?.url))
        getByCompanyId("CompanyPhone", store.idCompany).then(res=> setPhone(res.data)) 
        reportPurchase(dataSet.customerData.email, dataSet.customerData.cellphone, dataSet.cart.docTotal, dataSet.cart.id, dataSet.cart.lines.length, data.id, dataSet.customerData.firstName, dataSet.customerData.lastName, dataSet.customerData.cityData.name )    
    },[])
    
    return (
        <div className="justify-center  justify-items-center bg-zinc-50 mt-5 w-[px] md:w-[600px] rounded-lg p-5">
            <Heading>Gracias por tu compra</Heading>
            <img src={url} className="my-6 h-[350px] w-[350px]"/>
            <p className="my-10  text-lg mx-3 ">Recuerda que si tienes alguna duda o requieres mayor información sobre el estado de tu compra, puedes comunicarte a la línea: </p>
            <div className="flex items-center"><IoLogoWhatsapp className="text-green-500 size-8 mx-2"/>  
            <p className="text-xl font-semibold">{phone?.[0].phone}</p>
            </div>
        </div>
    )
}