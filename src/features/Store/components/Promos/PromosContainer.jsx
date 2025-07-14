import { useEffect, useState } from "react"
import { Carousel } from "../Carousel/Carousel"
import { getByCompanyId } from "../../../../shared/services/API/landingApi"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"

export const PromosContainer= ()=> {
    const [promoProducts, setPromoProducts] = useState([])
    const [stored] = useLocalStorage("storeCompany")

    useEffect(()=>{
            getByCompanyId("Products", stored?.company.id).then(res=>setPromoProducts([res.data?.at(-1), res.data?.at(-2), res.data?.at(-3)]))
        },[ ])

    return (
        <div className="bg-white">
            <div className="py-16 sm:py-24 xl:mx-auto xl:max-w-7xl xl:px-8">
                <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Promos</h2>
                </div>
                <Carousel type="card" data={promoProducts}/>
            </div>
        </div>)
}



