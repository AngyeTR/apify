import { Button } from "../../../../shared/components/uikit/button"
import { Input } from "../../../../shared/components/uikit/input"
import { HiOutlineTrash } from "react-icons/hi";
import logo from "../../../../assets/gallery-icon.png" 
import { useEffect, useState } from "react";
import { getByCompanyId, getByCustomerId, getByID } from "../../../../shared/services/API/api"
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { getStoreUser } from "../../../../shared/services/cookies";
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage";
import { filtercarts } from "../../utils/functions";
import { useCart } from "../../hooks/UseCart";

export const ShoppingCart = ()=> {
  const [cart, setCart] = useLocalStorage("cart", null)
  const [products, setProducts] = useState([])
  const [stored] = useLocalStorage("data")
  const { createCart,updateCart,updateQuantity,removeProduct,}  = useCart()

  const nav = useNavigate()
  const storeUserId = getStoreUser()

  useEffect(()=>{getByCompanyId("PreOrders", stored.user.company.id).then(res=> saveCart(res.data))},[])

const saveCart = async (data)=>{
  setCart(filtercarts(data, storeUserId))
  const getProduct = async(id)=> {await getByID("Products", id).then(res=> setProducts(prev=> ([...prev, res.data])))}
  cart.lines.length >= 0  && cart.lines.map(item =>  getProduct(item.idProduct))
}
    
  const  subtotal = (!cart || cart.lines == []) ? 0 : cart.lines.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 0
  const total = subtotal + shipping

  const manageChanges = async (type, productId, quantity) =>{
    if(type == "quantity"){
      updateQuantity(cart, productId, quantity).then(res=>console.log(res))
    }else if (type == "delete"){
      await removeProduct(cart, productId).then(res=> console.log(res))
      nav(0)
    }
  }

  return (
  <div className="bg-white">
  <div className="mx-auto max-w-2xl px-4 pt-1 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
    <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Orden</h1>
    {cart.lines.length == 0 ? <div className="justify-items-center my-10">
            <HiOutlineShoppingCart className="size-16  my-5"/>
            <h1 className="text-xl"> Aún no hay artículos en el carrito</h1>
            <Button className="my-3" onClick={()=> nav("/")}>Ir de compras</Button>
          </div> 
          : 
    <form className="mt-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
      <section aria-labelledby="cart-heading" className="lg:col-span-7">
        <ul role="list" className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
          
          {cart.lines.map((item, index)=>{
            return (
                <li className="flex py-2 sm:py-3" key={item.id}>
            <div className="shrink-0">
              <img src={products[index]?.images?.[0] ? products[index]?.images?.[0].url : logo} alt={item.productName} className="size-20 rounded-md object-cover"/>
            </div>
            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
              <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                <div>
                  <div className="flex justify-between">
                    <h3 className="text-sm">
                      <a href="#" className="font-medium text-zinc-700 hover:text-zinc-800">{item.productName}</a>
                    </h3>
                  </div>
                  <div className="mt-1 flex text-sm">
                    <p className="text-zinc-500">{item.color ? item.color : "Color único" }</p>
                    <p className="ml-4 border-l border-zinc-200 pl-4 text-zinc-500">{item.size ? item.size : "Talla única"}</p>
                  </div>
                  <p className="mt-1 justify-self-start text-sm font-medium text-zinc-900">${item.price}.00</p>
                </div>

                <div className="mt-4 sm:mt-0 sm:pr-9">
                  <div className="grid w-full max-w-30 grid-cols-2">
                    <Input placeholder={1} defaultValue={item.quantity} type="number" onChange={(e)=>manageChanges("quantity", item.idProduct, e.target.value)}/>
                    <HiOutlineTrash className="size-6 mx-1 self-center" onClick={()=>manageChanges("delete", item.idProduct)}/>
                  </div>
                </div>
              </div>
            </div>
          </li>
            )
          }) }

        </ul>
      </section>

      {/* <!-- Order summary --> */}
      <section aria-labelledby="summary-heading" className="mt-8 rounded-lg bg-zinc-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
        <h2 id="summary-heading" className="text-lg font-medium text-zinc-900">Resumen de la orden</h2>

        <dl className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <dt className="text-sm text-zinc-600">Subtotal</dt>
            <dd className="text-sm font-medium text-zinc-900">${subtotal}</dd>
          </div>
          <div className="flex items-center justify-between border-t border-zinc-200 pt-4">
            <dt className="flex items-center text-sm text-zinc-600">
              <span>Costo de envío</span>
              <a href="#" className="ml-2 shrink-0 text-zinc-400 hover:text-zinc-500">
                <span className="sr-only">Conoce como se calcula el costo de envío</span>
                <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061 3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
                </svg>
              </a>
            </dt>
            <dd className="text-sm font-medium text-zinc-900">${shipping}.00</dd>
          </div>
         
          <div className="flex items-center justify-between border-t border-zinc-200 pt-4">
            <dt className="text-base font-medium text-zinc-900">Total</dt>
            <dd className="text-base font-medium text-zinc-900">${total}</dd>
          </div>
        </dl>

        <div className="mt-6">
          <Button type="submit" className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-50 focus:outline-hidden">Proceder a Pagar</Button>
        </div>
      </section>
    </form>}
  </div>
</div>
    )
}