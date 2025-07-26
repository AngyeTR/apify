import { useEffect, useState } from "react";
import { Button } from "../../../../shared/components/uikit/button"
import { HiOutlinePencil } from "react-icons/hi";
import { Field, Label } from "../../../../shared/components/uikit/fieldset" 
import { TextController } from "../controllers/TextController"
import { Modal } from "../Modal"
import { scrollToBottom } from "../../../../shared/utils/utils";
import { Heading } from "../../../../shared/components/uikit/heading";
import { Input } from "../../../../shared/components/uikit/input";

export const PaymentButtonWidget = ({ id, edit, editable, style, content, toEdit})=>{
    const [editor, setEditor] = useState(false)
    // const [variable, setVariable] =  useState(content ? content :  "")
     const [mainText, setMainText] =  useState("")
     const [text, setText] =  useState("")
    const [styles, setStyles] = useState(style ? style : {})

    useEffect(()=>{if(content?.length > 0 ){
        const variables = content.split("||") 
        setMainText(variables[0])
        setText(variables[1])}
    },[ , content])

    const save = ()=> {
        const variable = mainText + "||" + text
        edit(id, variable, styles)
        setEditor(false)}

    return (<>
          {editor ? (
            <Modal> 
            <Field className="w-[90vw] h-[90vh] bg-zinc-50 p-5 pt-15 m-3 rounded-lg shadow-xl border border-zinc-200 justify-items-center">
                <Heading >Botón de pago</Heading>
                {/* <Input value={variable} onChange={e=> (setVariable(e.target.value))}  placeholder="Ingrese Texto del Botón" className="my-3 max-w-lg"/>
                <Input value={variable} onChange={e=> (setVariable(e.target.value))}  placeholder="Ingrese Texto del Botón" className="my-3 max-w-lg"/> */}
                <Input value={mainText} onChange={e=> (setMainText(e.target.value))}  placeholder="Ingrese Texto Principal del Botón" className="my-3 max-w-lg"/>
                <Input value={text} onChange={e=> (setText(e.target.value))}  placeholder="Ingrese Texto Secundario del Botón (opcional)" className="my-3 max-w-lg"/>
               
                <TextController styles={styles} setStyles={setStyles}/>
                <div className="justify-items-center">
                <Button type="submit" className="mx-1 my-5" onClick={save}>Guardar</Button>
                <Button className="mx-1 my-5" onClick={()=> setEditor(false)}>Cancelar</Button></div>
            </Field>
            </Modal>): 
            <div className="rounded-lg self-center items-center">
                {toEdit == id && <button onClick={()=>setEditor(true)} className="absolute top-1 right-10 bg-blue-500 text-white px-2 py-1  h-6 text-[6px] rounded z-300 hover:border hover:border-zinc-500 cursor-pointer"><HiOutlinePencil className="size-4"/></button>}
                {/* <button  style={styles} className="w-full p-2 rounded-lg hover:border hover:border-zinc-500 h-fit relative" onClick={scrollToBottom}>{content ? content : "Ir a pagar"}</button> */}
                <button  style={styles} className="w-full p-2 rounded-lg hover:border hover:border-zinc-500 h-fit relative" onClick={scrollToBottom}>
                    <div><p>{mainText ? mainText : "Ir a pagar"}</p>
                    <p className="text-[70%]">{text?.length > 0 && text}</p></div>
                </button>
            </div>}  
        </>)}