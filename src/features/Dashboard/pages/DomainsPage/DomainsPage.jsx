import { useEffect, useState } from "react"
import { MyLayout } from "../../components/myComponents/MyLayout"
import { getByCompanyId } from "../../../../shared/services/API/api"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { Heading } from "../../../../shared/components/uikit/heading"
import { MyDomainList, MyDomainValidator } from "../../components/myComponents/MyDomainValidator"


export const DomainsPage = ()=>{
    const [stored] = useLocalStorage("data")
    const [domains, setDomains] = useState(null)
    useEffect(()=>{getByCompanyId("Domains", stored.company.id).then(res=> setDomains(res.data.reverse()))},[])
    return (
        <MyLayout>
            {console.log(domains)}
        <Heading>Dominios</Heading>
        <MyDomainValidator />
        {/* <ul className="mt-10">
            {domains?.map(domain=><li className="border border-zinc-400 rounded-lg m-2" key={domain.id} onClick={()=>setShow(domain.id)}>
                 <div className="flex flex-row content-center items-center"><GrDomain className="mx-3"/><h2 className="font-semibold my-3 row hover:underline cursor-pointer"> {domain.domain}</h2></div>
                {domain.id == show && <div className="bg-zinc-100 border-t-zinc-600 p-5 pl-8"> <p className="overflow-auto  font-medium">CName Parte 1: <span className="overflow-scroll italic text-sm font-normal ml-3">{domain.cnamePt1}</span></p>
                <p className=" overflow-auto font-medium w-full">CName Parte 2: <span className="italic text-sm font-normal ml-3 ">{domain.cnamePt2}</span></p>
                <p className="font-medium overflow-auto ">SSL: <span className="italic text-sm font-normal ml-3 overflow-scroll">{domain.idZeroSSL}</span></p>
                <p className="font-medium overflow-auto ">Estado: <span className="italic text-sm font-normal ml-3 overflow-scroll">{domain.status}</span></p>
                {domain.status == "draft" && <Button className="my-1" onClick={()=>console.log("Validar", domain.domain)}>Validar Dominio</Button>}
                </div>}</li>)}
        </ul> */}
        <MyDomainList domains={domains}/>
        </MyLayout>
    )
}