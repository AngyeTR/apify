import { useState } from "react";
import { Button } from "../../../../shared/components/uikit/button"
import { HiOutlinePencil } from "react-icons/hi";
import { Field, Label } from "../../../../shared/components/uikit/fieldset" 
import { TextController } from "../controllers/TextController"
import { Modal } from "../Modal"

export const PaymentButtonWidget = ({ id, edit, editable, style})=>{
    const [editor, setEditor] = useState(false)
    const [styles, setStyles] = useState(style ? style : {})

    const save = ()=> {
        edit(id, null, styles)
        setEditor(false)}
    
    const url =  "https://www.google.com/webhp?hl=es-419&sa=X&ved=0ahUKEwiz2ZG6nPyMAxUMRzABHc6_BZkQPAgI"
    return (<>
        <div className="rounded-lg self-center items-center">
        {(!editor && editable )&& <button onClick={()=>setEditor(true)} className="absolute top-1 right-10 bg-blue-500 text-white px-2 py-1  h-6 text-[6px] rounded z-300 hover:border hover:border-zinc-500 cursor-pointer"><HiOutlinePencil className="size-4"/></button>}
        <a href={url} target="_blank" className="h-fit"><button  style={styles}
        className="w-full p-2 rounded-lg hover:border hover:border-zinc-500 h-fit relative">Ir a pagar</button></a>
        </div>
          {editor  && (
            <Modal> 
            <Field className="w-md bg-zinc-50 p-5 m-3 rounded-lg shadow-xl border border-zinc-200">
                <Label >Botón de pago</Label>
                <TextController styles={styles} setStyles={setStyles}/>
                <Button type="submit" className="mx-1 my-2" onClick={save}>Guardar</Button>
                <Button className="mx-1 my-2" onClick={()=> setEditor(false)}>Cancelar</Button>
            </Field>
            </Modal>)}  
        </>)}