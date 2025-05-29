import { Text} from "../../../../shared/components/uikit/text"
import { Textarea}  from "../../../../shared/components/uikit/textarea"
import { useState } from "react"
import { HiOutlinePencil } from "react-icons/hi";
import { Button } from "../../../../shared/components/uikit/button"
import { Field, Label } from "../../../../shared/components/uikit/fieldset"
import { TextController } from "../controllers/TextController"
import { Modal } from "../Modal";

export const TextWidget = ({content,  id, edit, editable, style})=>{
  const [editor, setEditor] = useState(false)
  const [variable, setVariable] = useState(content ? content : "")
  const [styles, setStyles] = useState(style ? style : {textAlign: "left"})

  const save = ()=> {
    edit(id, variable, styles)
    setEditor(false)}

  return (
    <>
    <div className="w-full rounded-lg self-center items-center"  >
      {(!editor && editable )&& <button onClick={()=>setEditor(true)} className="absolute top-1 right-10 bg-blue-500 text-white px-2 py-1  h-6 text-[6px] rounded z-300 hover:border hover:border-zinc-500 cursor-pointer"><HiOutlinePencil className="size-4"/></button>}
      <Text className="p-2" style={styles ? styles : null}>{content ? content : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis aspernatur repudiandae aut eos fugiat, harum similique qui ratione fugit possimus maxime sit quia ullam id maiores! Asperiores iste provident ratione."}</Text>
    </div>
    {editor && 
    <Modal>
      <Field className="w-md bg-zinc-50 p-5 m-3 rounded-lg shadow-xl border border-zinc-200 justify-items-center">
          <Label >Texto</Label>
          <Textarea placeholder="Ingrese el Texto" onChange={e=> setVariable(e.target.value)} />
          <TextController styles={styles} setStyles={setStyles}/>
          <Button type="submit" className="mx-1 my-2" onClick={save} >Guardar</Button>
          <Button className="mx-1 my-2" onClick={()=> setEditor(false)}>Cancelar</Button>
        </Field>
    </Modal>
    }
    </>)
}