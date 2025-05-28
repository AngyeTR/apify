import { useState } from "react";
import { Button } from "../../../../shared/components/uikit/button"
import { HiOutlinePencil } from "react-icons/hi";
import { Field, Label } from "../../../../shared/components/uikit/fieldset" 
import { TextController } from "../controllers/TextController"
import { Modal } from "../Modal";

export const ButtonWidget = ({content, id, edit, editable, style})=>{
    const [editor, setEditor] = useState(false)
    const [variable, setVariable] =  useState(content ? content :{label:"", url:""})
    const [styles, setStyles] = useState(style ? style : {})

    const save = ()=> {
        edit(id, variable, styles)
        setEditor(false)}
    
    const url = content?.url ? content.url : "https://www.google.com/webhp?hl=es-419&sa=X&ved=0ahUKEwiz2ZG6nPyMAxUMRzABHc6_BZkQPAgI"
    return (
        <>
        <div className="rounded-lg self-center items-center">
        {(!editor && editable )&& <button onClick={()=>setEditor(true)} className="absolute top-1 right-10 bg-blue-500 text-white px-2 py-1  h-6 text-[6px] rounded z-300 hover:border hover:border-zinc-500 cursor-pointer"><HiOutlinePencil className="size-4"/></button>}
        <a href={url} target="_blank" className="h-fit"><button  style={styles}
        className="w-full p-2 rounded-lg hover:border hover:border-zinc-500 h-fit relative">{content?.label ? content.label : "Boton de prueba"}</button></a>
        </div>
        {editor && 
        <Modal>
            <Field className="w-md bg-zinc-50 p-5 m-3 rounded-lg shadow-xl border border-zinc-200 justify-items-center">
            <Label >Botón</Label>
            <input  onChange={e=> (setVariable(prev => ({...prev, ["label"] : e.target.value})))}  placeholder="Ingrese Texto del Botón" className="block bg-white border border-zinc-600 rounded-lg my-2 px-1 w-sm text-sm py-1"/>
            <input  onChange={e=> setVariable(prev => ({...prev, ["url"] : e.target.value}))} placeholder="Ingrese la URL del botón" className="block my-2 bg-white border border-zinc-600 rounded-lg px-1 w-sm text-sm py-1"/>
            <TextController styles={styles} setStyles={setStyles}/>
            <Button type="submit" className="mx-1 my-2" onClick={save}>Guardar</Button>
            <Button className="mx-1 my-2" onClick={()=> setEditor(false)}>Cancelar</Button>
        </Field>
        </Modal> }
        </>
    )}