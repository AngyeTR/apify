import { NavLink, useNavigate, useParams } from "react-router-dom"
import { HiOutlineX, HiChevronDown, HiOutlineShoppingCart, HiOutlineSearch, HiOutlineUser, HiOutlineMenu   } from "react-icons/hi";
import { useEffect, useState } from "react"
import { getByCompanyId } from "../../../../shared/services/API/api.js"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { Text } from "../../../../shared/components/uikit/text.jsx";
import { deleteStoreUser, getStoreUser } from "../../../../shared/services/cookies.js";

const CurrencySelector = ({type})=> {
  const options = ["CAD", "USD", "AUD", "EUR", "GBP"]

  return (
    <form>
    <div className="-ml-2 inline-grid grid-cols-1">
      <select id="mobile-currency" name="currency" aria-label="Currency" className={`col-start-1 row-start-1 w-full appearance-none rounded-md py-0.5 pr-7 pl-2 text-base font-medium group-hover:text-zinc-800 focus:outline-2 sm:text-sm/6 ${type=="dark" ? "bg-zinc-900 text-white focus:-outline-offset-1 focus:outline-white" : "bg-white text-zinc-700"}`}>
        {options.map(option => <option key={option}>{option}</option>)}
      </select>
      <HiChevronDown className="pointer-events-none col-start-1 row-start-1 mr-1 size-5 self-center justify-self-end fill-zinc-300" />
    </div>
  </form>)}

const MobileMenu = ({ open, close, data, storeUser, logOut, stored})=>{
  return open && (
    <div className="relative z-40 lg:hidden" role="dialog" aria-modal="true">
    <div className="fixed inset-0 bg-black/25" aria-hidden="true"></div>
    <div className="fixed inset-0 z-40 flex transition ease-in-out duration-300 transform ">
      <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
        <div className="flex px-4 pt-5 pb-2">
          <button onClick={close} type="button" className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-zinc-400">
            <HiOutlineX  className="pointer-events-none col-start-1 row-start-1 mr-1 size-5 self-center justify-self-end fill-zinc-300" />
          </button>
        </div>
        {/* <!-- Links --> */}
    <div className="space-y-6 border-t border-zinc-200 px-4 py-6">
      <NavLink to="/store" className="flex lg:hidden items-center ">
          <img className="h-16 w-auto " src={stored?.company.urlLogo ?  stored?.company.urlLogo : "https://static.wixstatic.com/media/87407a_eff577b9b02c43a3aa41bc18c09b9da4~mv2.png/v1/fill/w_393,h_203,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/87407a_eff577b9b02c43a3aa41bc18c09b9da4~mv2.png"} alt=""/>
          <Text className="justify-self-center" >{stored?.company.name}</Text>
        </NavLink>
      <h3 className="underline">Categorías</h3>
      <div className="flow-root"><NavLink className="-m-2 p-2 font-medium text-zinc-900"  to="/store/category/0">Todos</NavLink></div>
      { data?.map((cat) =>   <div className="flow-root">    <NavLink  to={`/store/category/${cat.id}`}>{cat.name}</NavLink></div>)}
    </div>
        <div className="space-y-6 border-t border-zinc-200 px-4 py-6">
           { storeUser  ? <div className="-m-2 block p-2 font-medium  text-zinc-900" onClick={logOut}>Cerrar sesión</div>
           : <><NavLink to="/store/signup" className="-m-2 block p-2 font-medium text-zinc-900">Crear cuenta</NavLink>
            <NavLink to="/store/login" className="-m-2 block p-2 font-medium text-zinc-900">Ingresar</NavLink></>
            }
            </div>
      </div>
    </div>
  </div>
  )}

export const  Header= ()=> {
  let [showSidebar, setShowSidebar] = useState(false)
 const [cart, setCart, removeCart] = useLocalStorage("cart")
  // const [data, setData] = useState(null)
  const [stored] = useLocalStorage("data")
  const [data, setData] = useLocalStorage("categories", null)
  const nav = useNavigate()
  const storeUser = getStoreUser()
  useEffect(()=>{getByCompanyId("Categories", stored?.company.id).then(res => setData(res.data))},[ , showSidebar ])
  const params = useParams()

   const logOut = ()=>{
    deleteStoreUser()
    removeCart()
    nav("/store")
  }
  return (
<>
  <MobileMenu open={showSidebar} close={() => setShowSidebar(false)} data= {data} storeUser={storeUser} logOut={logOut} stored={stored}/>
  <header className="relative">
    <nav aria-label="Top">
      {/* <!-- Top navigation --> */}
      <div className="bg-zinc-900 w-[99vw] justify-self-center">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <CurrencySelector type="dark" />
          <p className="flex-1 text-center text-sm font-medium text-white lg:flex-none">Get free delivery on orders over $100</p>
          {storeUser ?<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6"> <div onClick={logOut} className="text-sm font-medium text-white hover:text-zinc-100">Cerrar Sesión</div> </div>
           :<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
            <NavLink to ="/store/signup" className="text-sm font-medium text-white hover:text-zinc-100">Crear cuenta</NavLink>
            <span className="h-6 w-px bg-zinc-600" aria-hidden="true"></span>
            <NavLink to="/store/login" className="text-sm font-medium text-white hover:text-zinc-100">Ingresar</NavLink>
          </div>
         }
        </div>
      </div>

      {/* <!-- Secondary navigation --> */}
      <div className="bg-white w-[95vw]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-zinc-200">
            <div className="flex h-16 items-center justify-between">
                <NavLink to="/store" className="hidden lg:flex  items-center w-xs items-baseline">
                  <img className="h-16 w-auto " src={stored?.company.urlLogo ?  stored?.company.urlLogo : "https://static.wixstatic.com/media/87407a_eff577b9b02c43a3aa41bc18c09b9da4~mv2.png/v1/fill/w_393,h_203,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/87407a_eff577b9b02c43a3aa41bc18c09b9da4~mv2.png"} alt=""/>
                  <Text className="text-xl font-semibold" >{stored?.company.name}</Text>
                </NavLink>
              <div className="hidden h-full lg:flex flex-col w-full">
                <div className="ml-8 ">
                <div className="space-y-6 border-t border-zinc-200 px-4  py-6 ">
    <NavLink to="/store" aria-label="Home"></NavLink>
    { (params.cat || params.prod) &&   <NavLink className=" items-center mx-2 w-fit text-sm font-medium text-zinc-700 hover:text-zinc-800"  to="/store/category/0">Todos</NavLink>}
    { (params.cat || params.prod) &&  data?.map((cat) =>     <NavLink key={cat.id} className="mx-2 w-fit  items-center text-sm font-medium text-zinc-700 hover:text-zinc-800" to={`/store/category/${cat.id}`}>{cat.name}</NavLink>)}
    </div>
                </div>
              </div>
              <div className="flex flex-1 items-center lg:hidden">
                <button type="button" className="-ml-2 rounded-md bg-white p-2 text-zinc-400">
                  <HiOutlineMenu className="size-6" onClick={()=>setShowSidebar(true)}/>
                </button>
                <div onClick={()=>nav("/store/")} className="flex lg:hidden items-center mx-1">
                <img src={stored?.company.urlLogo ?  stored?.company.urlLogo : "https://static.wixstatic.com/media/87407a_eff577b9b02c43a3aa41bc18c09b9da4~mv2.png/v1/fill/w_393,h_203,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/87407a_eff577b9b02c43a3aa41bc18c09b9da4~mv2.png"} alt="" className="h-16 w-auto"/>
              </div>
              </div>
              <div className="flex flex-1 items-center justify-end">
                  {storeUser && <div className="flex items-center lg:ml-8">
                  {/* {params.cat && <input onChange={(e)=>setSearch(e.target.value)} className="w-30 md:w-40  group relative  m-2 p-1 border border-zinc-400 rounded-lg" placeholder="Buscar..."/>} */}
                  <HiOutlineUser  className="size-6 hover:text-zinc-700 cursor-pointer mx-2" onClick={()=>nav("/store/profile")}/>
                  <span className="mx-4 h-6 w-px bg-zinc-200 lg:mx-6" aria-hidden="true"></span>
                  <div onClick={()=>nav("/store/cart")} className="group -m-2 flex items-center p-2">
                    <HiOutlineShoppingCart className="size-6" />
                    <span className="ml-2 font-medium text-md text-zinc-700 group-hover:text-zinc-800">{cart ? cart.lines.length : 0}</span>
                  </div>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
  </>
)}