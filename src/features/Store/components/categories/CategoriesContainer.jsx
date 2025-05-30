import { useEffect, useState } from "react"
import { hexToRgba } from "../../../../shared/utils/utils"
import { getByCompanyId } from "../../../../shared/services/API/api"
import { NavLink } from "react-router-dom"
import logo from "../../../../assets/gallery-icon.png"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"

const color = hexToRgba("#ff0000", 0.2)

export const CategoriesContainer = ()=> {
    const [categories, setCategories] = useState(null)
    const [stored]  = useLocalStorage("data")

    useEffect(()=>{getByCompanyId("Categories", stored.company.id).then(res=>setCategories(res.data))},[ ])
    let category = categories?.filter(cat=> cat.id == 1)[0]
    const recommended = [
        {id: 1, name: "Producto recomendado", url:null,  category: 1},
        {id: 2, name: "Producto recomendado 2", url:"https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-01.jpg",  category: 2},
        {id: 3, name: "Producto recomendado 3", url:"https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-01.jpg",  category: 3},

    ]
    return (
    <div className="bg-zinc-100" >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-12">
                <h2 className="text-2xl font-bold text-zinc-900">Recomendados</h2>
                <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:space-y-0 lg:gap-x-6">
                {recommended.map(item=>{return(
                        <div className="group relative">
                            <img src={item.url ? item.url : logo} alt={item.name} className="w-full rounded-lg bg-zinc-100 object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-2/1 lg:aspect-square"/>
                            <h3 className="mt-6 text-sm text-zinc-500">
                        <NavLink to={`/store/product/${item.id}`}>
                        <span className="absolute inset-0"></span>
                        {categories?.filter(cat=> cat.id == item.id)[0]?.name}
                        </NavLink>
                    </h3>
                    <p className="text-base font-semibold text-zinc-900">{item.name}</p>
                </div>)
                    })}
            </div>
        </div>
    </div>
</div>
    )
}
