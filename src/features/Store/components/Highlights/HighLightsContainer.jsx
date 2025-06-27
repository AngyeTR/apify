import { NavLink } from "react-router-dom"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import logo from "../../../../assets/gallery-icon.png" 
import { useEffect, useState } from "react"

export const HighlightsContainer = ()=> {
  const [categories] = useLocalStorage("categories")
  // const [categories, setCategories] = useState([])

   useEffect(() => {
    console.log('Categorías cargadas desde localStorage:', categories);
  }, [categories]);

    return (
        <div className="bg-white">
          <div className="py-4 sm:py-6 xl:mx-auto xl:max-w-7xl xl:px-8">
          <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Categorías</h2>
        </div>

    <div className="mt-4 flow-root">
      <div className="-my-2">
      <div className="justify-self-end"><NavLink to={"/store/category/0"} className="font-semibold hover:underline">Ver todos los productos</NavLink></div>
        <div className="relative box-content h-60 overflow-x-auto py-2 ">
          {/* <div className={`grid grid-cols-${categories.length} px-6 w-full overflow-hidden rounded-lg p-2 hover:opacity-75`}>   */}
          <div className=" flex-row absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">  
            {console.log(categories)}
            {categories?.map((cat, index) => {
              const url = cat.avatar ? cat.avatar : logo 
              return (
              <NavLink key={index} to={`/store/category/${cat.id}`} className="mx-1 relative flex h-60 w-40 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto">
              <span aria-hidden="true" className="absolute inset-0">
                <img src={url} alt="" className="size-full object-cover"/>
              </span>
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-zinc-800 opacity-50"></span>
              <span className="relative mt-auto text-center text-xl font-bold text-white">{cat.name}</span>
            </NavLink>)}
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    )
}