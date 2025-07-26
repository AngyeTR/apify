import { useEffect, useState } from "react"
import { MyLayout } from "../../components/myComponents/MyLayout"
import { getByCompanyId, } from "../../../../shared/services/API/landingApi"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { Heading } from "../../../../shared/components/uikit/heading"
import { HiOutlinePhone } from "react-icons/hi";
import { Loader } from "../../../../shared/components/Loader"
import { Field, Label } from "../../../../shared/components/uikit/fieldset"
import { Input } from "../../../../shared/components/uikit/input"
import { Button } from "../../../../shared/components/uikit/button"
import { adaptPhoneModel } from "../../utils/adaptDataModel"
import { phoneModel } from "../../utils/models"
import { post, edit as update } from "../../../../shared/services/API/api"
import { useNavigate } from "react-router-dom"

export const PhonesPage = ()=>{
    const [stored] = useLocalStorage("data")
    const [phones, setPhones] = useState(null)
    const [phone, setPhone] = useState(null)
    const [waId, setWaId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [edit, setEdit] = useState(null)
    const nav= useNavigate()

    const PhoneForm = (value = "")=>{
        return (
            <Field className="mx-10">
                <Label>Teléfono: </Label>
                <Input invalid={error?.includes("teléfono")} type="number" placeholder="Ingrese la línea de whatsapp" defaultValue={value && value} onChange={(e)=>setPhone(e.target.value)} className="max-w-md"/>
                {error && <p className="text-sm text-red-600">Algo salió mal: {error}</p>}
                <Label>ID de Whatsapp</Label>
                <Input placeholder="Ingrese el ID de whatsapp"  onChange={(e)=>setWaId(e.target.value)} className="max-w-md"/>
            </Field>)
    } 

    useEffect(()=>{setLoading(true)
        getByCompanyId("CompanyPhone", stored.company.id).then(res=> setPhones(res.data)).finally(()=>setLoading(false))},[])

        const handleLine = async (action)=>{
        if (phone?.length < 10 || phone[0] != 3) {setError("Formato de teléfono inválido")}
        else{
            setLoading(true)
            const initialData = action == "create" ? phoneModel: edit
            const data = adaptPhoneModel(initialData, phone, waId)
            action == "create" ? await post("CompaniesPhones", data).then(res=>console.log(res.data)).finally(()=>nav(0)):
            await update("CompaniesPhones", data).then(res=>console.log(res.data)).finally(()=>nav(0))}
        }

    return (
        <MyLayout>
        <Heading>Teléfonos</Heading>
        {loading ? <div className="place-self-center mt-50"><Loader /></div> : 
        <ul className="mt-10">
            <li className="border border-zinc-400 rounded-lg m-2" key="nuevo" >
                <div className="flex flex-row content-center items-center" onClick={()=>{setEdit(null); setPhone(null); setWaId(null)}}>
                    <HiOutlinePhone className="mx-3"/><h2 className="font-semibold my-3 row hover:underline cursor-pointer"> Añadir nueva Línea de Whatsapp</h2>
                </div>
                {edit == null && PhoneForm()}
                {edit == null&&<Button className="my-3 mx-10" disabled={!phone || !waId} onClick={()=>handleLine("create")}> Guardar Nueva Línea</Button>}
            </li>
            {phones?.map(phone=><li className="border border-zinc-400 rounded-lg m-2" key={phone.id} >
                <div className="flex flex-row content-center items-center" onClick={()=>{setEdit(phone); setPhone(null); setWaId(null)}}>
                    <HiOutlinePhone className="mx-3"/><h2 className="font-semibold my-3 row hover:underline cursor-pointer"> {phone.phone}</h2>
                    {edit?.phone == phone?.phone && <p className="mx-3 text-red-500" onClick={()=>handleLine("create")}>Editar</p>}
                </div>
                {edit?.phone == phone?.phone && PhoneForm(phone.phone)}
                {edit?.phone == phone?.phone &&<Button disabled={!phone || !waId} className="my-3 mx-10" onClick={()=>handleLine("edit")}>Guardar Cambios</Button>}
            </li>)}
        </ul>}
        </MyLayout>
    )
}