import { MyLayout } from "../../components/myComponents/MyLayout"
import { Heading } from "../../../../shared/components/uikit/heading"
import { Loader } from "../../../../shared/components/Loader"
import { useEffect, useState } from "react"
import { edit, getByCompanyId, post } from "../../../../shared/services/API/api"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { Button } from "../../../../shared/components/uikit/button"
import { Divider } from "../../../../shared/components/uikit/divider"
import { Field, Label } from "../../../../shared/components/uikit/fieldset"
import { adaptPolicyModel } from "../../utils/adaptDataModel"
import { policyModel } from "../../utils/models"
import { useNavigate } from "react-router-dom"

export const PoliciesPage = ()=> {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [form, setForm] = useState(null)
    const [policy, setPolicy] = useState({})
    const [stored] = useLocalStorage("data")
    const [policies, setPolicies] = useState(null)
    const nav = useNavigate()

    const savePolicies=async()=>{
        if(policy.min < 0 || policy.min > 100 || policy.mid < 0 || policy.mid > 100){ setError("Los valores Establecidos deben estar entre 0 y 100")}
        else if (policy.min > policy.mid) { setError("El Valor medio debe ser mayor que el valor mínimo")}
        else {
            setLoading(true)
            const data = form == "edit" ? adaptPolicyModel(policies, policy) : adaptPolicyModel(policyModel, policy)
            form == "edit" ? await edit("CompaniesPolicy", data).then(res=> console.log(res)).finally(()=>nav(0)) :
            await post("CompaniesPolicy", data).then(res=> console.log(res)).finally(()=>nav(0))}
    }

    const PoliciesForm = ()=>{
        return (
            <Field className="mx-10 my-3" >
            <Heading>{form== "edit" ? "Editar": "Crear"} Políticas de Compra</Heading>
            <div className="flex my-1 gap-2 items-center"><Label>Valor Mínimo: </Label>
                <input type="number" defaultValue={policies?.minimalValue && policies?.minimalValue} placeholder="Mínimo" onChange={(e)=>setPolicy(prev=>({...prev, min:e.target.value}))} className="bg-white border border-zinc-300 rounded-lg px-2 py-1 text-md  w-[100px]"/>
            </div>
            <div className="flex my-1 gap-2 items-center"><Label>Valor Medio: </Label>
                <input type="number" defaultValue={policies?.mediumValue && policies?.mediumValue} placeholder="Medio"  onChange={(e)=>setPolicy(prev=>({...prev, mid:e.target.value}))} className="bg-white border border-zinc-300 rounded-lg px-2 py-1 text-md ml-2 w-[100px]"/>
            </div>
            <div className="flex my-1 gap-2 items-center"><Label>Monto a pagar por adelantado: </Label>
                <input type="number" defaultValue={policies?.ammount && policies?.ammount} placeholder="Monto"  onChange={(e)=>setPolicy(prev=>({...prev, amount:e.target.value}))} className="bg-white border border-zinc-300 rounded-lg px-2 py-1 text-md ml-2 w-[100px]"/>
            </div>
            <div className="flex my-1 gap-2 items-center"><Label>Descripción del medio de pago </Label>
                <input  placeholder="Descripción" defaultValue={policies?.description && policies?.description} onChange={(e)=>setPolicy(prev=>({...prev, description:e.target.value}))} className="bg-white border border-zinc-300 rounded-lg px-2 py-1 text-md ml-2 w-xs"/>
            </div>
            <Button className="my-2 mx-1" onClick={savePolicies} disabled={!policy.mid || !policy.min || !policy.amount || !policy.description}>Guardar</Button>
            <Button onClick={()=>{setForm(null); setMid(null); setMin(null)}} className="my-2 mx-1">Cancelar</Button>
            {error && <p className="text-red-500 text-sm italic">Ups! Algo salió mal: {error} </p>}
            </Field>)
    }

    useEffect(()=>{getByCompanyId("CompaniesPolicy", stored.company.id).then(res=> setPolicies(res.data))},[])
    return (
    <MyLayout>
        <Heading>Políticas de Compra</Heading>
        {loading ? <div className="place-self-center mt-50"><Loader /></div> : 
        <div className="m-5">
            <p className="text-zinc-700">Las políticas de compra permiten establecer normas de venta que aplican segun el puntaje de cada comprador. Este puntaje se obtiene del historial de compras y eventos registrados por el comprador</p>
            {form ? PoliciesForm() :<>{policies ? 
            <div className="m-2">
                <h2 className="text-zinc-800 text-lg font-semibold">Políticas establecidas: </h2>
                <p className="ml-3 text-zinc-700">Valor de puntuación mínima: <span className="font-semibold mx-3">{policies.minimalValue}</span></p>
                <p className="ml-3 text-zinc-700">Valor de puntuación media: <span className="font-semibold mx-5">{policies.mediumValue}</span></p>
                <p className="ml-3 text-zinc-700">Monto: <span className="font-semibold mx-5">{policies.ammount}</span></p>
                <p className="ml-3 text-zinc-700">Descripción del medio de pago: <span className="font-semibold mx-5">{policies.description}</span></p>
                <Button className="mx-5 my-2" onClick={()=>{setForm("edit"); setPolicy({min:policies.minimalValue, mid:policies.mediumValue, amount: policies.ammount, description: policies.description})}}>Editar</Button>
            </div> : <div className="m-2">
                <h2 className="text-zinc-800 text-lg font-semibold">Aún no se han establecido Políticas </h2>
                <Button className="mx-5 my-2" onClick={()=>setForm("create")}>Establecer políticas</Button>
                </div>}</>}
            <Divider/>
            <ul className="m-5 text-zinc-700 list-disc">
                <li className="my-1 italic"><p>Para compradores con una puntuación menor al mínimo establecido, el pago por adelantado del total de la compra será obligatorio</p></li>
                <li className="my-1 italic"><p>Para compradores con puntuación igual o mayor al mínimo establecido y menor o igual al valor medio establecido, el pago por adelantado del monto establecido será obligatorio</p></li>
                <li className="my-1 italic"><p> Para compradores con puntuación superior al valor medio establecido, se podrá ofrecer la opción de pago Contraentrega hasta por el total de la compra</p></li>
            </ul>
        </div>       
}
    </MyLayout>)
}