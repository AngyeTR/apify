import { Header } from "../components/Header/Header"
import { adjustLoginData} from  "../utils/functions"
import { useEffect, useState } from "react"
import { getByDomain } from "../../../shared/services/API/api"
import { getByID } from "../../../shared/services/API/landingApi"
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage"
import { Loader} from "../../../shared/components/Loader"

export const Layout = ({children})=>{
  const [storeCompany, setStoreCompany] = useLocalStorage("storeCompany", null)
  const [loading, setLoading] = useState(false)
  
  useEffect(()=>{
    console.log(storeCompany)
    !storeCompany && getCompanyData()},[])

  const getCompanyData = async ()=>{
    console.log("getting storeCompany")
    setLoading(true)
    console.log(loading)
    const domain = window.location.host
    console.log(domain)
    const res = domain.startsWith("local") ? {isvalid:true, data:{companyId:1}} : await getByDomain(domain).then(res=>res)
    res?.isvalid && console.log(res)
    res?.isvalid && await getByID("Company", res.data.companyId).then(res=>{console.log(res) ; setStoreCompany(adjustLoginData(res.data))}).finally(()=>setLoading(false))
  }


    return (
<div className="bg-white">
  {loading ? <Loader/> : <>
  <Header />
  <main className="mx-auto max-w-7xl sm:px-6 sm:pt-4 lg:px-8 w-[95vw] h-full">{children}</main>
  <footer className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="border-t border-white/10 py-12 md:flex md:items-center md:justify-between">
          <div className="flex justify-center gap-x-6 md:order-2">
            {/* {footerNavigation.social.map((item) => (
              <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-300">
                <item.icon aria-hidden="true" className="size-6" />
              </a>
            ))} */}
          </div>
          <p className="mt-8 text-center text-sm/6 text-gray-400 md:order-1 md:mt-0">
            &copy; 2024 Your Company, Inc. All rights reserved.
          </p>
        </div>
      </footer></>}
</div>




        
    )
}