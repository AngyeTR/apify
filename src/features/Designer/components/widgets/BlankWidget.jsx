import { useState } from "react"
import { HiOutlinePencil } from "react-icons/hi";
import { Button } from "../../../../shared/components/uikit/button"
import { Input } from "../../../../shared/components/uikit/input"
import { Field, Label } from "../../../../shared/components/uikit/fieldset"
import { Modal } from "../Modal";

export const BlankWidget = ({id, edit, editable, style})=>{
  const [editor, setEditor] = useState(false)
  const [styles, setStyles] = useState(style ? style : {})
  const save = ()=> {
    edit(id, null,  styles)
    setEditor(false)}

  return (
    <>
    <div className="self-center items-center h-full w-full" style={styles? { backgroundColor: styles.backgroundColor, backgroundImage: `url('${styles["backgroundImage"]}')`, backgroundSize: 'cover',
    backgroundPosition: 'center', repeat: "no-repeat",  backgroundBlendMode: 'multiply'}: {}} >
      {(!editor && editable )&& <button onClick={()=>setEditor(true)} className="absolute top-1 right-10 bg-blue-500 text-white px-2 py-1  h-6 text-[6px] rounded z-300 hover:border hover:border-zinc-500 cursor-pointer"><HiOutlinePencil className="size-4"/></button>}
    </div>
    {editor && 
    <Modal >
      <Field className="w-md bg-zinc-50 p-5 m-3 rounded-lg shadow-xl border border-zinc-200">
        <Label >Espacio vacío</Label>
        <Input onChange={e=> setStyles(prev => ({...prev, ["backgroundImage"] : e.target.value  }))}  type="text" placeholder="URL fondo" className="mx-1 my-1  rounded-sm border border-zinc-200" />
        <div className="flex justify-center"><p className="text-zinc-700">Color de fondo: </p><input onChange={e=> (setStyles(prev => ({...prev, ["backgroundColor"] : e.target.value})))}  type="color" className="w-[20px]" /></div>
        <Button type="submit" className="mx-1 my-2" onClick={save} >Guardar</Button>
        <Button className="mx-1 my-2" onClick={()=> setEditor(false)}>Cancelar</Button>
        </Field>
    </Modal> }
    </>
    )}
