import { useParams } from "react-router-dom"
import { Layout } from "./Layout"
import { PromoCard } from "../components/Promos/PromoCard"
import { useEffect, useState } from "react"
import { getByID } from "../../../shared/services/API/api"
import { ProductView } from "../components/ProductView/ProductView"

export const ProductPage = ()=> {
    const [data, setData] = useState(null)
    const params = useParams()
    useEffect(()=>{
         getByID("Products", params.prod).then(res=> setData(res))
    },[ ])
    return (
        <Layout>
        {data && <ProductView  />   }
        </Layout>

    )
}