import { Suspense, useEffect, useState } from "react"
import { Message } from "./Message"
import { NewMessage } from "./NewMessage"
import { getChatByPhone } from "../../../shared/services/API/api"
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage"
import { Loader } from "../../../shared/components/Loader"

export const Conversation =({conversation})=>{
    console.log(conversation)
   const [messages, setMessages] = useState([])
   const [loading, setLoading] = useState(true)
   const [stored] = useLocalStorage("data")

   useEffect(()=>{
    setLoading(true)
    getChatByPhone(stored.company.id, conversation.to).then(res=> setMessages(res.data) ).finally(() => setLoading(false))
    const interval = setInterval(() => { getChatByPhone(stored.company.id, conversation.to).then(res=> setMessages(res.data) ) }, 60000);
    return () => clearInterval(interval);},[conversation])

if (loading) return <div className="place-self-center mt-50"><Loader /></div>

return (
    <>
    {conversation ? <div className="">
        <div className="fixed top-3 ml-6 lg:ml-0 flex items-center p-3 bg-zinc-100 w-[75%]"><div className="mr-5 bg-blue-500 h-10 w-10 rounded-full"/><h1>{conversation.to}</h1></div>
        <div className="fixed w-[90%] lg:w-[65%] xl:w-[70%] top-20 bottom-20 overflow-y-scroll px-3">{messages.length>0 ? messages?.map(message=> <Message  message={message} key={message.id}/>): 
        <p className="text-center  mt-15">Aun no hay mensajes disponibles</p>}</div>
        <NewMessage />
    </div> 
    : <h1>Bienvenido</h1>}
    </>
)
}