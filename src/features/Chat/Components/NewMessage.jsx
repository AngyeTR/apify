import { MdOutlineKeyboardVoice } from "react-icons/md";
import {Input} from "../../../shared/components/uikit/input"
import { LuSend } from "react-icons/lu";
import { MdAttachFile } from "react-icons/md";
import { useState } from "react";
import { TemplatesSelector } from "./TemplatesSelector";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import { getChatByPhone, sendMessage } from "../../../shared/services/API/api";

export const NewMessage=({inRange, owner, setMessages})=>{
    const [content, setContent] = useState(null)
      const [stored] = useLocalStorage("data")
    const sendText =async ()=>{
        await sendMessage({ cellphone: owner, message: content, idCompany: stored.company.id}).then(res=>console.log(res)).finally(()=>{ setContent(null);
        getChatByPhone(stored.company.id, owner).then(res=> setMessages(res.data) )
        })  

    }

    return(
        <div className="fixed bottom-3 flex items-center p-3 pb-1 bg-zinc-100 w-[90%] lg:w-[65%] xl:w-[70%] ">
            <div className="flex-col sm:flex  w-full">
            { inRange && <div  className="flex">
            <div className="bg-white p-2 mx-3 shadow-md rounded-full border border-zinc-200 hover:border-zinc-400"> <MdAttachFile className="size-6"/></div>
            <Input className="w-fit" type="text" placeHolder="Escribe un mensaje" onChange={e=> setContent(e.target.value)}/>
            </div> }
            <TemplatesSelector/>
             </div>
            <div className="border border-zinc-200 bg-white p-2 mx-3 shadow-md rounded-full hover:border-zinc-400">{content || !inRange ? 
                <LuSend className="size-6" onClick={sendText}/>:
                <MdOutlineKeyboardVoice className="size-6"/>}</div>
        </div>
    )
}