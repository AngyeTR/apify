import { useState } from "react"
import { HiOutlinePencil } from "react-icons/hi";
import { Button } from "../../../../shared/components/uikit/button"
import { Switch } from "../../../../shared/components/uikit/switch";
import { Input } from "../../../../shared/components/uikit/input"
import { Field, Label } from "../../../../shared/components/uikit/fieldset" 
import { Modal } from "../Modal";
import { CollectionSelector } from "../CollectionSelector";
import { Heading } from "../../../../shared/components/uikit/heading";
 
export const VideoWidget = ({content,  id, edit, editable, toEdit})=>{
  const [editor, setEditor] = useState(false)
  const [variable, setVariable] = useState("")
  const [showEdit, setShowEdit] = useState(false)
  const [internalOrigin, setInternalOrigin] = useState(true)
  const url = content ? String(content) : "https://www.youtube.com/embed/-VGQxQHLXEI?si=trey54RoReblOwn4"
  const save = ()=> {
    edit(id, variable)
    setEditor(false)}

  return (<>
        {/* { showEdit && <button onClick={()=>setEditor(true)} className="absolute top-1 right-10 bg-blue-500 text-white px-2 py-1  h-6 text-[6px] rounded z-300 hover:border hover:border-zinc-500 cursor-pointer"><HiOutlinePencil className="size-4"/></button>} */}
    {editor ?
      <Modal>
        <Field   className="w-[90vw] h-[90vh] bg-zinc-50 p-5 m-3 rounded-lg shadow-xl border border-zinc-200 justify-items-center">
          <Heading >Video</Heading>
          <p className="my-5">Seleccionar desde las Colecciones guardadas  <Switch checked={internalOrigin} onChange={setInternalOrigin}/> </p>
          {!internalOrigin ?  <Input name="url" placeholder="Ingrese URL del video" onChange={e=> setVariable(e.target.value)} className="my-5"/>
          :<CollectionSelector variable={variable} setVariable={setVariable} type="video"/>} 
          <div className="justify-items-center">
          <Button type="submit" className="mx-1 my-5" onClick={save}>Guardar</Button>
          <Button className="mx-1 my-5" onClick={()=> setEditor(false)}>Cancelar</Button></div>
        </Field>
        </Modal>:
        <>
        {toEdit == id && <button onClick={()=>setEditor(true)} className="absolute top-1 right-10 bg-blue-500 text-white px-2 py-1  h-6 text-[6px] rounded z-300 hover:border hover:border-zinc-500 cursor-pointer"><HiOutlinePencil className="size-4"/></button>}
        <iframe src= {url} allow="autoplay; encrypted-media" allowFullScreen title="Video de presentación"className={`w-[400px] md:w-[600px] h-[95%] ${editable && "hover:border hover:border-red-600"}`} onClick={()=>setShowEdit(prev => (!prev) )}></iframe>
      </>}
      </>  
    )}