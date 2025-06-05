import { use, useEffect, useState } from "react"
import { HiOutlinePencil } from "react-icons/hi";
import { Button } from "../../../../shared/components/uikit/button"
import { Input } from "../../../../shared/components/uikit/input"
import { Field, Label } from "../../../../shared/components/uikit/fieldset"
import { Modal } from "../Modal";
import { Switch} from "../../../../shared/components/uikit/switch"
import { CollectionSelector } from "../CollectionSelector";
import { Heading } from "../../../../shared/components/uikit/heading";
import { getByCompanyId } from "../../../../shared/services/API/api";
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage";

export const ImageWidget = ({content, id, edit, editable})=>{
    const [editor, setEditor] = useState(false)
    const [data, setData] = useState(null)
    const [variable, setVariable] = useState("")
    const [internalOrigin, setInternalOrigin] = useState(true)
    const [stored] = useLocalStorage("data")
    const url = content ? String(content) : "https://i.pinimg.com/736x/a5/11/32/a511323ec9460a20e7b78bd5e64bc20b.jpg"
    const save = ()=> {
        edit(id, variable)
        setEditor(false)}
    
        useEffect(() => {getByCompanyId("Libraries", stored?.company.id).then((res) => setData(res.data));}, []);

    return (
        <>
        {/* <div className={` w-[100%] p-3  h-[98%] bg-[url(${url})] z-0 rounded-lg bg-center bg-no-repeat bg-cover`} */}
        <div className="overflow-hidden h-[99%] bg-red-400  w-full md:bg-amber-300 place-content-center place-items-center"
//         style={{ backgroundImage: `url('${url}')`,  backgroundRepeat: 'no-repeat',
//   backgroundPosition: 'center center',
//   backgroundSize: 'cover'}}
        >
            <img src={url} className=" h-auto object-contain w-[358px] md:w-[718px] overflow-hidden hidden"/>
        {(!editor && editable )&& <button onClick={()=>setEditor(true)} className="absolute top-1 right-10 bg-blue-500 text-white px-2 py-1  h-6 text-[6px] rounded z-50 hover:border hover:border-zinc-500 cursor-pointer"><HiOutlinePencil className="size-4"/></button>}
        </div>    
        {editor  && (
       <Modal> 
        <Field className="w-[90vw] h-[90vh] bg-zinc-50 p-5 m-3 rounded-lg shadow-xl border border-zinc-200 justify-items-center">
            <Heading>Selector de Imagen</Heading>
            <p className="my-3">Seleccionar desde las Colecciones guardadas  <Switch checked={internalOrigin} onChange={setInternalOrigin}/> </p>
            {!internalOrigin ? <Input name="url" placeholder="Ingrese URL de la imagen" onChange={e=> setVariable(e.target.value)}/>
            :<CollectionSelector variable={variable} setVariable={setVariable} type="image"/>}
            <Button  className="mx-1 my-2" onClick={save}>Guardar</Button>
            <Button className="mx-1 my-2" onClick={()=> setEditor(false)}>Cancelar</Button>
        </Field>
       </Modal>)}   
        </>    
    )}