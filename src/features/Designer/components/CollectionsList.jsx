import { useState } from "react"
import { Button } from "../../../shared/components/uikit/button"
import { Heading} from "../../../shared/components/uikit/heading"
import { Modal } from "./Modal"
import { Label } from "../../../shared/components/uikit/fieldset"
import { Input } from "../../../shared/components/uikit/input"
import { Field } from "../../../shared/components/uikit/fieldset"
import { postFolder } from "../../../shared/services/API/api"
import { useNavigate } from "react-router-dom"
import { HiHome } from "react-icons/hi";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage"
import { Avatar } from "../../../shared/components/uikit/avatar"
import { Sidebar, SidebarBody, SidebarFooter, SidebarHeader, SidebarLabel, SidebarSection } from "../../../shared/components/uikit/sidebar"


export const CollectionsList = ({collection, setCollection, data})=> {
    const user = useLocalStorage("data")?.[0]
    console.log(user, data)
    const [editor, setEditor] = useState(null)
    const [dataSet, SetDataSet] = useState({files:[], isActive: true, createdBy: user.user.email, modifiedBy:	user.user.email, idCompany: user.company.id,})
    const [error, setError] = useState(false)
    const nav = useNavigate()
    const closeModal = ()=> {
        setEditor(false)
        setError(false)
    }
    const save= async()=>{
        try {
            const res  = await postFolder(dataSet)
            res?.isValid ?  nav(0) : setError(res?.errorMessages[0])
            } catch (error) {setError("algo salió mal. Intenta de nuevo") }     }

    return ( 
        <div  className="w-full m-1 rounded-lg p-1 pt-2 ">
            <Sidebar >
                 <SidebarBody>
                    <SidebarHeader className="fixed top-5 w-60 lg:w-50 z-3 h-[10%] ml-5 lg:ml-0 ">
                        <div className="flex flex-row  items-center w-50" >
                            <Avatar src={user?.company?.urlLogo} className="bg-zinc-50 size-10"/>
                            <SidebarLabel className="text-2xl font-bold ml-2">{user?.company?.name} </SidebarLabel>
                             <div className="cursor-pointer rounded-full hover:border hover:border-zinc-400 ml-auto mr-3"><HiHome  className="size-6" onClick={()=> nav("/dashboard")}/></div>
                        </div>
                    </SidebarHeader>
                    <SidebarSection className="relative mt-[20%]  lg:mt-[25%] overflow-y-scroll h-[70vh] ">
                    {!data ? <SidebarLabel>Aún no hay colecciones</SidebarLabel> :  
                    data?.map(col => <div key={col.id} className={` ${col?.id == collection?.id && "border border-zinc-400 rounded-lg "} mt-2`}><h3 onClick={()=> setCollection(col)} className=" font-medium my-0 py-0 hover:underline mt-1 cursor-pointer" key={col.name}>{col.name}</h3> <p className="text-[10px] my-0 py-0 ">- {col.files.length} archivos</p></div> )}
                    </SidebarSection>
                    <SidebarFooter className="fixed bottom-1 w-60 lg:w-50 z-3 h-[10%] ml-5 lg:ml-0 ">
                        <Button onClick={()=>setEditor(true)}>Añadir Colección</Button>
                    </SidebarFooter >
                </SidebarBody>
            </Sidebar>
    {editor && 
     <Modal className="z-30">
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