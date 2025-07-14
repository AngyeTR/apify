import { useEffect, useState } from "react"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { CardProduct } from "./CardProduct"
import { Text} from "../../../../shared/components/uikit/text"
import { getByCompanyId} from "../../../../shared/services/API/landingApi"
import { useParams } from "react-router-dom"
import { Button } from "../../../../shared/components/uikit/button"

const filter = (data, value) => {
    let newData = value == 0 ? data: data.filter((item)=> item.id == value) 
    return newData
}

const filterByName = (data, search ) => {
    let newData = data.filter((item)=> item.name.toLowerCase().includes(search.toLowerCase())) 
    return newData
}

export const ProductList =()=>{
    const [products, setProducts] = useLocalStorage("products")
    const [productsToShow, setProductsToShow] = useState(null)
    const [filteredProducts, setFilteredProducts] = useState(null)
    const [search, setSearch] = useState("")
    const [stored] = useLocalStorage("storeCompany")
    const params = useParams()

    useEffect(()=>{
        getByCompanyId("Products", stored?.company.id).then(res=> setProducts(res.data))
        let newData = filter(products, params.cat)
        setProductsToShow(newData)
    },[ , params])

    useEffect(()=>{
        productsToShow ? setFilteredProducts(filterByName(productsToShow, search)) : console.log(search)
    },[search])

    return (
        <div className="bg-white">
  <div className="mx-auto max-w-2xl px-1 py-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
    <h2 className="sr-only">Products</h2>
    <div className="justify-end justify-items-end"><input onChange={(e)=>setSearch(e.target.value)} className="w-xs justify-end  m-2 mb-5 p-1 border border-zinc-400 rounded-lg" placeholder="Buscar..."/></div>
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
{     search.length >0 ? filteredProducts?.map((product) => <CardProduct data={product} key={product.id}/>)
:productsToShow?.map((product) => <CardProduct data={product} key={product.id}/>)}        
{     productsToShow?.length == 0 && <div className="h-[60vh] w-[80vw] justify-items-center pt-10"><Text> No se encontraron Productos</Text></div>}        
    </div>
  </div>
</div>
    )
}