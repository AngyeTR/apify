import { useEffect, useState } from "react"
import { Message } from "./Message"
import { NewMessage } from "./NewMessage"
import { getChatByPhone } from "../../../shared/services/API/api"
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage"
import { Loader } from "../../../shared/components/Loader"
import { Check24hRange } from "../utils/utils"
import { Modal } from "../../../shared/components/Modal"
import { Button } from "../../../shared/components/uikit/button"

export const Conversation =({conversation})=>{
   const [messages, setMessages] = useState([])
   const [loading, setLoading] = useState(true)
   const [stored] = useLocalStorage("data")
   const [modal, setModal] = useState(null)

   useEffect(()=>{
    setLoading(true)
    getChatByPhone(stored.company.id, conversation.to).then(res=> setMessages(res.data) ).finally(() => setLoading(false))
    const interval = setInterval(() => { getChatByPhone(stored.company.id, conversation.to).then(res=> setMessages(res.data) ) }, 60000);
    return () => clearInterval(interval)},[conversation])

    if (loading) return <div className="place-self-center mt-50"><Loader /></div>
    const sentMessages = messages.filter(message=> message.to.length > 0)
    const typeMessages = sentMessages.filter(message=> message.typeMessage ==2)
    const inRange = typeMessages.length>0 ? Check24hRange(typeMessages.at(-1)?.createdDate) : true

return (
    <>{modal ? <Modal><div className="bg-zinc-50 rounded-lg w-[90%] md:w-[70%] h-[90%] overflow-scroll py-10 justify-items-center"> 
        <Button onClick={()=>setModal(null)} className="relative top-5 left-5" color="green">Cerrar</Button>
        {modal.typeMessage == 2 ? <img src="https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className="h-[100%]  justify-self-center"/>:
        <iframe src= {modal.url} allow="autoplay; encrypted-media" allowFullScreen title="Video de presentación"className={`w-60 h-80 justify-self-center`} ></iframe>} </div> 
        </Modal>:
        <> {conversation ? <div className="">
        <div className="fixed top-3 ml-6 lg:ml-0 flex items-center p-3 bg-zinc-100 w-[75%]"><div className="mr-5 bg-blue-500 h-10 w-10 rounded-full"/><h1>{conversation.to}</h1></div>
        <div className="fixed w-[90%] lg:w-[65%] xl:w-[70%] top-20 bottom-28 overflow-y-scroll px-3">{messages.length>0 ? messages?.map(message=> <Message  message={message} key={message.id} setModal={setModal}/>): 
        <p className="text-center  mt-15">Aun no hay mensajes disponibles</p>}</div>
        <NewMessage inRange={inRange} owner={conversation.to} setMessages={setMessages}/>
    </div> 
    : <h1>Bienvenido</h1>}</>}
    </>)}