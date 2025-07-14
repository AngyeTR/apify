import { useEffect, useState, useRef } from "react"
import { markFavorite, unMarkFavorite } from "../../services/storeApi"
import { getByID} from "../../../../shared/services/API/landingApi"
import { useNavigate, useParams } from "react-router-dom"
import { Carousel } from "../Carousel/Carousel"
import { Stars } from "../Stars/Stars"
import { Button } from "../../../../shared/components/uikit/button"
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { Fieldset } from "../../../../shared/components/uikit/fieldset"
import { Reviews } from "./Reviews"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { getStoreUser } from "../../../../shared/services/cookies"
import { useCart } from "../../hooks/UseCart"
import { adaptFavoriteModel } from "../../utils/adaptModels"
import { favoriteModel } from "../../utils/models"

export const ProductView = ()=>{
    const [product, setProduct] = useState(null)
    const [customer, setCustomer] = useState(null)
    const sizes = ["XS", "S", "M"]
    const params = useParams()
    const reviewsRef = useRef(null);
    const [favorites, setFavorites] = useLocalStorage("favorites", null)
    const [isFavorite, setIsFavorite] = useState(false)
    const storeUser = getStoreUser()
    const nav = useNavigate()
    const [cart, setCart, removeCart] = useLocalStorage("cart")
    const { createCart,updateCart,updateQuantity,removeProduct,}  = useCart()
    
    const handleAdd = async ()=> {
      if(storeUser){
        const exist = cart.lines.filter(item=>item.idProduct == product.id)
        cart.lines.length > 0 ? (exist[0] ? updateQuantity(cart, product.id, exist[0].quantity+1) 
        : await updateCart(cart, product, storeUser)  )
        : await createCart(product, storeUser) 
        await new Promise(resolve => setTimeout(resolve, 1000));
        // nav(0)
      } 
      else {nav("/store/temporary")}}


    const handleFav = async (e)=>{
      e.preventDefault()
      const cleanData = adaptFavoriteModel(favoriteModel, storeUser, params.prod)
      console.log(cleanData)
      if(isFavorite == true){
        const res = await unMarkFavorite(cleanData).then(res=> res)
        const newFavs = favorites.filter(item=> item != params.prod)
        res.isValid && setFavorites(newFavs)
        res.isValid && setIsFavorite(false)
      }else {
        const res = await markFavorite(cleanData).then(res=> res)
        const newFavs = [...favorites]
        newFavs.push(parseInt(params.prod))
        res.isValid && setFavorites(newFavs)
        res.isValid && setIsFavorite(true)
      }
    }

    const scrollToReviews = () => {reviewsRef.current?.scrollIntoView({ behavior: "smooth" })}

    useEffect(()=>{getByID("Product", params.prod).then(res=> setProduct(res.data))
      storeUser && setIsFavorite(favorites?.includes(parseInt(params.prod)))
    },[ , params])

    return (
    <div className="mx-auto max-w-2xl lg:max-w-none">
      <div className="md:grid md:grid-cols-2 md:items-start md:gap-x-8">
          <Carousel type="image" data={product?.images}/>
        {/* <!-- Product info --> */}
        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 text-left">{product?.name}</h1>
          <p className="text-3xl tracking-tight text-zinc-900 text-left">${product?.price ? product.price : "0.00"}</p>

          {/* <!-- Reviews --> */}
            <div className="flex" onClick={scrollToReviews}>
                <Stars maxScore={5} score={0} />
                <p  className="ml-2 cursor-pointer hover:underline"> 0 reviews</p>
          </div>
          <p className="text-left space-y-6 text-base mt-4 text-zinc-700">{product?.description}</p>
          <form className="mt-4">
            {/* <!-- Colors --> */}
             {product?.isColors && 
             <Fieldset aria-label="Choose a color" className="mt-2">
             <h3 className="text-sm text-zinc-600 text-left mb-1">Color</h3>
             <div className="flex items-center gap-x-3">
                { product?.colors?.map((color)=>{
                    return (
                        <label key={color.id} aria-label={color.nombre} className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-zinc-700 focus:outline-hidden">
                         <input onClick={()=>console.log(color.nombre)} type="radio" name="color-choice" value="Washed Black" className="sr-only"/>
                         <span aria-hidden="true" className="size-8 rounded-full border border-black/10 bg-zinc-700" style={{backgroundColor: color.colorCode}}></span>
                        </label>
                    )})}
             </div>
           </Fieldset>} 
           {product?.isSizes && 
             <Fieldset aria-label="Choose a size" className="mt-2">
             <h3 className="text-sm text-zinc-600 text-left mb-1">Talla</h3>
             <div className="flex items-center gap-x-3">
                {sizes?.map((size)=><button key={size} onClick={(e)=> {e.preventDefault(); console.log(size)}} className="items-center justify-center rounded-md px-3 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-500 hover:border">{size}</button>)}
             </div>
           </Fieldset>} 
            <div className="mt-10 flex">
              <Button onClick={handleAdd} className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-50 focus:outline-hidden sm:w-full">Añadir al carrito</Button>
              {storeUser && <button onClick={e=> handleFav(e)} type="button" className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-500">
                {isFavorite ? <HiHeart className="size-6" />  : <HiOutlineHeart  className="size-6"/> } 
              </button>}
            </div>
          </form>
        </div>
      </div>
      <div ref={reviewsRef}><Reviews  /> </div>
    </div>
    )}