import { HiOutlinePencil } from "react-icons/hi";
import { useState } from "react"
import { Button } from "../../../../shared/components/uikit/button"
import { Input } from "../../../../shared/components/uikit/input"
import { Field, Label } from "../../../../shared/components/uikit/fieldset" 
import { TextController } from "../controllers/TextController"
import { Modal } from "../Modal";
import { Heading } from "../../../../shared/components/uikit/heading";

export const TitleWidget = ({content, id, edit, editable, style, toEdit})=>{
  const [editor, setEditor] = useState(false)
  const [variable, setVariable] = useState(content ? content :  "")
  const [styles, setStyles] = useState(style ? style : {})

  const save = ()=> {
    edit(id, variable, styles)
    setEditor(false)}

    return (<>
    {editor ? 
    <Modal>
      <Field className="w-[90vw] h-[90vh] bg-zinc-50 p-5 pt-15 m-3 rounded-lg shadow-xl border border-zinc-200 justify-items-center">
        <Heading >Título</Heading>
        <Input name="url" placeholder="Ingrese el Título" value={variable} onChange={e=> setVariable(e.target.value)} className="my-5 max-w-2xl"/>
        <TextController styles={styles} setStyles={setStyles}/>
        <div className="justify-items-center">
        <Button type="submit" className="mx-1 my-5" onClick={save}>Guardar</Button>
        <Button className="mx-1 my-5" onClick={()=> setEditor(false)}>Cancelar</Button></div>
      </Field>
    </Modal>:
      <div className="rounded-lg m-0 self-center items-center">
      { toEdit == id && <button onClick={()=>setEditor(true)} className="absolute top-1 right-10 bg-blue-500 text-white px-2 py-1  h-6 text-[6px] rounded z-1 hover:border hover:border-zinc-500 cursor-pointer"><HiOutlinePencil className="size-4 z-0"/></button>}
      <h1 className="p-2 leading-none" style={styles ? styles : null}>{content ? content : "Lorem ipsum dolor sit amet"} </h1>
    </div>} 
    </>)
}