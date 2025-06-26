import { MdOutlineKeyboardVoice } from "react-icons/md";
import {Input} from "../../../shared/components/uikit/input"
import { LuSend } from "react-icons/lu";
import { MdAttachFile } from "react-icons/md";
import { useState } from "react";

export const NewMessage=()=>{
    const [content, setContent] = useState(null)
    return(
        <div className="fixed bottom-3 flex items-center p-3 bg-zinc-100 w-[90%] lg:w-[65%] xl:w-[70%] ">
            <div className="bg-white p-2 mx-3 shadow-md rounded-full border border-zinc-200 hover:border-zinc-400"> <MdAttachFile className="size-6"/></div>
            <Input type="text" placeHolder="Escribe un mensaje" onChange={e=> setContent(e.target.value)}/> 
            <div className="border border-zinc-200 bg-white p-2 mx-3 shadow-md rounded-full hover:border-zinc-400">{content ? <LuSend className="size-6"/>:<MdOutlineKeyboardVoice className="size-6"/>}</div>
        </div>
    )
}