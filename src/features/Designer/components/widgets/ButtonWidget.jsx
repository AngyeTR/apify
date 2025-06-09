import { useState } from "react";
import { Button } from "../../../../shared/components/uikit/button"
import { HiOutlinePencil } from "react-icons/hi";
import { Field } from "../../../../shared/components/uikit/fieldset" 
import { TextController } from "../controllers/TextController"
import { Modal } from "../Modal";
import { Heading } from "../../../../shared/components/uikit/heading";
import { Input } from "../../../../shared/components/uikit/input";

export const ButtonWidget = ({content, id, edit, editable, style, toEdit})=>{
    const [editor, setEditor] = useState(false)
    const [variable, setVariable] =  useState(content ? content :{label:"", url:""})
    const [styles, setStyles] = useState(style ? style : {})

    const save = ()=> {
        edit(id, variable, styles)
        setEditor(false)}
    
    const url = content?.url ? content.url : "https://www.google.com/webhp?hl=es-419&sa=X&ved=0ahUKEwiz2ZG6nPyMAxUMRzABHc6_BZkQPAgI"
    return (
        <>
        {console.log(variable)}
        <div className="rounded-lg self-center items-center">
        {toEdit == id && <button onClick={()=>setEditor(true)} className="absolute top-1 right-10 bg-blue-500 text-white px-2 py-1  h-6 text-[6px] rounded z-300 hover:border hover:border-zinc-500 cursor-pointer"><HiOutlinePencil className="size-4"/></button>}
        <a href={url} target="_blank" className="h-fit"><button  style={styles}
        className="w-full p-2 rounded-lg hover:border hover:border-zinc-500 h-fit relative">{content?.label ? content.label : "Boton de prueba"}</button></a>
        </div>
        {editor && 
        <Modal>
            <Field className="w-[90vw] h-[90vh] bg-zinc-50 p-5 pt-15 m-3 rounded-lg shadow-xl border border-zinc-200 justify-items-center">
            <Heading className="my-5" >Botón</Heading>
            <Input value={variable?.label} onChange={e=> (setVariable(prev => ({...prev, ["label"] : e.target.value})))}  placeholder="Ingrese Texto del Botón" className=" max-w-lg my-3"/>
            <Input  value={variable?.url} onChange={e=> setVariable(prev => ({...prev, ["url"] : e.target.value}))} placeholder="Ingrese la URL del botón" className="max-w-lg my-3"/>
            <TextController styles={styles} setStyles={setStyles}/>
            <Button type="submit" className="mx-1 my-5" onClick={save}>Guardar</Button>
            <Button className="mx-1 my-5" onClick={()=> setEditor(false)}>Cancelar</Button>
        </Field>
        </Modal> }
        </>
    )}