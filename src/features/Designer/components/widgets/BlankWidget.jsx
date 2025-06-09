import { useState } from "react"
import { HiOutlinePencil } from "react-icons/hi";
import { Button } from "../../../../shared/components/uikit/button"
import { Input } from "../../../../shared/components/uikit/input"
import { Field, Label } from "../../../../shared/components/uikit/fieldset"
import { Modal } from "../Modal";
import { Heading } from "../../../../shared/components/uikit/heading";

export const BlankWidget = ({id, edit, editable, style, toEdit})=>{
  const [editor, setEditor] = useState(false)
  const [styles, setStyles] = useState(style ? style : {})
  const save = ()=> {
    edit(id, null,  styles)
    setEditor(false)}

  return (
    <>
    <div className="self-center items-center h-full w-full" style={styles? { backgroundColor: styles.backgroundColor, backgroundImage: `url('${styles["backgroundImage"]}')`, backgroundSize: 'cover',
    backgroundPosition: 'center', repeat: "no-repeat",  backgroundBlendMode: 'multiply'}: {}} >
      {toEdit == id && <button onClick={()=>setEditor(true)} className="absolute top-1 right-10 bg-blue-500 text-white px-2 py-1  h-6 text-[6px] rounded z-300 hover:border hover:border-zinc-500 cursor-pointer"><HiOutlinePencil className="size-4"/></button>}
    </div>
    {editor && 
    <Modal >
        <Field className="w-[90vw] h-[90vh] bg-zinc-50 p-5 pt-15 m-3 rounded-lg shadow-xl border border-zinc-200 justify-items-center">
        <Heading >Espacio vacío</Heading>
        <Input onChange={e=> setStyles(prev => ({...prev, ["backgroundImage"] : e.target.value  }))}  type="text" placeholder="URL fondo" className="mx-1 mt-5  rounded-sm border border-zinc-200 max-w-lg" />
        <div className="flex justify-center"><p className="text-zinc-700 my-3">Color de fondo: </p><input onChange={e=> (setStyles(prev => ({...prev, ["backgroundColor"] : e.target.value})))}  type="color" className="w-[20px] my-3" /></div>
        <Button type="submit" className="mx-1 my-5" onClick={save} >Guardar</Button>
        <Button className="mx-1 my-5" onClick={()=> setEditor(false)}>Cancelar</Button>
        </Field>
    </Modal> }
    </>
    )}
