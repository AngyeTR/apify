import { useState } from "react"
import { Button } from "../../../shared/components/uikit/button"
import { Heading} from "../../../shared/components/uikit/heading"
import { Modal } from "./Modal"
import { Label } from "../../../shared/components/uikit/fieldset"
import { Input } from "../../../shared/components/uikit/input"
import { Field } from "../../../shared/components/uikit/fieldset"
import { postFolder } from "../../../shared/services/API/api"
import { useNavigate } from "react-router-dom"
import { HiOutlineHome } from "react-icons/hi";


export const CollectionsList = ({collection, setCollection, data})=> {
    const user = {email: "angie.rodriguez@tambora.co", companyId: 1}
    const [editor, setEditor] = useState(null)
    const [dataSet, SetDataSet] = useState({files:[], isActive: true, createdBy: user.email, modifiedBy:	user.email, idCompany: user.companyId,})
    const [error, setError] = useState(false)
    const nav = useNavigate()
    const closeModal = ()=> {
        setEditor(false)
        setError(false)
    }

    const save= async()=>{
        try {
            console.log(dataSet)
            const res  = await postFolder(dataSet)
            console.log(res)
            res?.isValid ?  nav(0) : setError(res?.errorMessages[0])
            } catch (error) {setError("algo salió mal. Intenta de nuevo") }     }

    return ( 
        <div  className="border border-zinc-400 w-full m-1 rounded-lg p-1 pt-2 bg-zinc-100">
            <Button className="mb-3 m-1" onClick={()=>nav("/designer")}> volver <HiOutlineHome className="size-4 self-center"/></Button>
        <Heading >Colecciones</Heading>
        {/* <Button onClick={()=>nav("/designer/")} className="mt-5" color="light"><HiOutlineHome className="size-6 justify-self-start" /></Button> */}
    <div className="mt-5  m-1">
    {data && data.map(col => <div key={col.id} className={` ${col?.id == collection?.id && "border border-zinc-500 rounded-lg"} mt-2`}><h3 onClick={()=> setCollection(col)} className=" font-medium my-0 py-0 hover:underline mt-1" key={col.name}>{col.name}</h3> <span className="text-[10px] my-0 py-0 ">- {col.files.length} archivos</span></div> 
)}</div>
    <Button onClick={()=>setEditor(true)}>Añadir Colección</Button>
    {editor && 
     <Modal >
        <Field   className="w-md bg-zinc-50 p-5 m-3 rounded-lg shadow-xl border border-zinc-200">
            <Label >Nueva Colección</Label>
            <Input name="name" placeholder="Ingrese Nombre de la colección" onChange={e=> SetDataSet(prev => ({...prev, ["name"] : e.target.value}))}/>
            <Button type="submit" className="mx-1 my-2" disabled={!dataSet.name} onClick={save}>Guardar</Button>
            <Button className="mx-1 my-2" onClick={closeModal}>Cancelar</Button>
            {error  && <p className="text-red-600 pt-5 ">Ups! Algo salió mal  {error}</p> }
        </Field>
    </Modal>}
        </div>
    )
}