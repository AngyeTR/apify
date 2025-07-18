import { useState } from "react"
import { Button } from "../../../../shared/components/uikit/button"
import { GrDomain } from "react-icons/gr";
import { Input } from "../../../../shared/components/uikit/input"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { post, validateDomain } from "../../../../shared/services/API/api"
import { Loader } from "../../../../shared/components/Loader"
import { MyLoader } from "./MyLoader";
import { CopyButton } from "./MyCopyButton";

export const MyDomainValidator = ()=>{
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [stored] = useLocalStorage("data")
    const nav = useNavigate()
    const [domain, setDomain] = useState(null)
    const saveDomain = async ()=>{
        setLoading(true)
        const res = await post("Domains", { createdBy: stored.user.email, modifiedBy: stored.user.email, idCompany: stored.company.id, domain: domain}).then(res=>res)
        res && setLoading(false)
        res.isValid ? nav(0) : setError(res?.errorMessages?.[0])}

    return ( <div>
        <h2 className="font-semibold mt-2">Paso 1: </h2>
        <p>Si tu dominio ya se encuentra en la lista inferior continúa al paso 2. Si tu dominio no se encuentra en esa lista, ingrésalo a continuación y haz click en Registrar</p>
        <div className="grid grid-cols-3 max-w-lg gap-1"><Input onChange={(e)=> setDomain(e.target.value)} className="max-w-lg my-1 col-span-2" placeholder="Ingresa el dominio" />
        {loading ? <Loader />: <Button className="my-1" disabled={!domain} onClick={saveDomain}>Registrar</Button>}</div>
        {error && <p className="text-red-600 text-sm italic">Ups! hubo un error: {error}</p>}
        <h2 className="font-semibold mt-2">Paso 2: </h2>
        <p>Selecciona el dominio que quieres validar. Al hacer click en él se desplegarán los datos que debes añadir en tu gestor de dominio </p>
        <h2 className="font-semibold mt-2">Paso 3: </h2>
        <p> Una vez que registraste los datos de CName y SSL en tu gestor de dominio, selecciona el dominio en la lista inferior y haz click en Validar Dominio</p>
    </div>)}

export const MyDomainList = ({domains})=>{
    const [show, setShow] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [stored] = useLocalStorage("data")
    const nav = useNavigate()
    const validate = async(data)=>{
        setLoading(true)
        const res = await validateDomain(data).then(res=>res)
        res && setLoading(false)
        res.isValid ? nav(0) : setError(res.message)
    }
    return (
         <ul className="mt-10">
        {domains?.map(domain=><li className="border border-zinc-400 rounded-lg m-2" key={domain.id} onClick={()=>setShow(domain.id)}>
            <div className="flex flex-row content-center items-center"><GrDomain className="mx-3"/><h2 className="font-semibold my-3 row hover:underline cursor-pointer"> {domain.domain}</h2></div>
            {domain.id == show && <div className="bg-zinc-100 border-t-zinc-600 p-5 pl-8"> 
            <div className="w-full flex items-center flex-row"><p className="overflow-hidden  font-medium">CName Nombre: </p> <p className="overflow-scroll italic text-sm font-normal ml-3">{domain.cnamePt1} </p><CopyButton textToCopy={domain.cnamePt1}/></div>
            <div className="w-full flex items-center flex-row"><p className=" overflow-hidden font-medium min-w-[130px] w-[180px] mx-0 px-0 ">CName Valor: </p><p className="italic text-sm font-normal ml-2 overflow-hidden">{domain.cnamePt2} </p><CopyButton textToCopy={domain.cnamePt2}/></div>
            <div className="w-full flex items-center flex-row"><p className="font-medium overflow-hidden ">SSL: </p><p className="italic text-sm font-normal ml-3 overflow-scroll">{domain.idZeroSSL}</p> <CopyButton textToCopy={domain.idZeroSSL}/></div>
            <p className="font-medium overflow-auto ">Estado: <span className="italic text-sm font-normal ml-3 overflow-scroll">{domain.status}</span></p>
            {domain.status == "draft" && <>
            {loading ? <MyLoader/> :<Button className="my-1" onClick={()=>validate(domain)}>Validar Dominio</Button>}
            {error && <p className="text-red-600 text-sm italic">Ups! hubo un error: {error}</p>}</>
            }
            </div>}</li>)}
    </ul>)}