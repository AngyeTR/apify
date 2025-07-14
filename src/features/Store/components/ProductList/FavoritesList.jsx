import { useEffect, useState } from "react"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { CardProduct } from "./CardProduct"
import { Text} from "../../../../shared/components/uikit/text"
import {  getByID} from "../../../../shared/services/API/landingApi"
import { Heading } from "../../../../shared/components/uikit/heading"

export const FavoritesList =()=>{
    const [productsToShow, setProductsToShow] = useState([])
    const favorites = useLocalStorage("favorites")

    useEffect(()=>{favorites[0]  && favorites[0].map(fav => getByID("Product", fav).then(res => setProductsToShow(prev =>([...prev, res.data]) )))},[ ])
    return (
    <div className="bg-white">
        <div className="mx-auto max-w-2xl px-1 py-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
            <Heading className="text-center my-3">Favoritos</Heading>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {productsToShow?.map((product) => <CardProduct data={product} key={product.id}/>)}        
                {productsToShow?.length == 0 && <div className="h-[60vh] w-[80vw] justify-items-center pt-10"><Text> No se encontraron Productos</Text></div>}        
            </div>
        </div>
    </div>)
}