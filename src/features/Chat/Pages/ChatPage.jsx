import { useEffect, useState } from "react"
import { ChatLayout } from "../../../shared/components/uikit/chat-layout"
import { Conversation } from "../Components/Conversation"
import { ConversationsList } from "../Components/ConversationsList"
import { getChatList } from "../../../shared/services/API/api"
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage"

export const ChatPage = ()=> {
    const [conversation, setConversation] = useState(null)
    const [conversations, setConversations] = useState(null)
    const [loading, setLoading] = useState(false)
    const [stored] = useLocalStorage("data")

    useEffect(()=>{
        setLoading(true)
        getChatList(stored.company.id).then(res=> setConversations(res.data)).finally(() => setLoading(false))
        const interval = setInterval(() => {getChatList(stored.company.id).then(res=> setConversations(res.data)) }, 60000);
        return () => clearInterval(interval);
    },[])
    
    return (
        <ChatLayout conversation={conversation} sidebar={<ConversationsList conversations= {conversations} conversation={conversation} setConversation={setConversation} loading={loading}/>} >
            {conversation && <Conversation conversation={conversation} key={conversation.to}/>}
        </ChatLayout>
    )
}

//     useEffect(()=>{setConversations([
//     {id:1, owner: "Participante 1", messages:[
//     {id:1,  type:"text", message:"Hola, quiero más información", time:"21:35", inbound:true},
//     {id:2,  type:"text", message:"Está disponible?", time:"21:35", inbound:true},
//     {id:3,  type:"text", message:"Hola, Bienvenido a la tienda. Mi nombre es Angie y será un placer acompañarte en tu proceso de compra. Cuentame qué dudas tienes", time:"21:36", inbound:false},
//     {id:4,  type:"text", message:"Quiero saber que precio tiene", time:"21:45", inbound:true},
//     {id:5,  type:"text", message:"Si hacen envíos a nivel nacional?", time:"21:45", inbound:true},
//     {id:6,  type:"text", message:"Y qué metodos de pago tienen", time:"21:48", inbound:true},
//     {id:7,  type:"text", message:"Hola. Mi nombre es Angie y seré tu asesora", time:"21:35", inbound:false},
//     {id:8,  type:"text", message:"Este producto se encuentra disponible a un precio especial", time:"21:45", inbound:false},
//     {id:9,  type:"text", message:"Hacemos envío a nivel nacional con diferentes transportadoras", time:"21:45", inbound:false},
//     {id:10,  type:"text", message:"Tenemos la opción de pago online y pago contraentrega", time:"21:46", inbound:false}]},

// {id:2, owner: "Participante 2", messages:[
//     {id:11, type:"text", message:"Hola, quiero más información", time:"21:35", inbound:true},
//     {id:12, type:"text", message:"Está disponible?", time:"21:35", inbound:true},
//     {id:13,  type:"text", message:"Hola, Bienvenido a la tienda", time:"21:36", inbound:false},
//     {id:14,  type:"text", message:"Hola, Qué costo tiene?", time:"21:38", inbound:true}]},
// {id:4, owner: "Participante 3", messages:[
//     {id:15,  type:"text", message:"Hola", time:"21:35", inbound:true},
//     {id:16,  type:"text", message:"hola", time:"21:35", inbound:true},
//     {id:17,  type:"text", message:"Hola", time:"21:36", inbound:false}]},
// {id:5, owner: "Participante 4", messages:[{id:30,  type:"text", message:"Hola, quiero más información", time:"21:35", inbound:true},
//     {id:19,  type:"text", message:"Hola, Bienvenido a la tienda", time:"21:36", inbound:false},
//     {id:18,  type:"image", message:"https://cdn-icons-png.flaticon.com/512/3771/3771098.png", time:"21:35", inbound:true},]},
// {id:6, owner: "Participante 5", messages:[{id:31,  type:"text", message:"Hola, quiero más información", time:"21:35", inbound:true},
//     {id:20,  type:"text", message:"Está disponible?", time:"21:35", inbound:true},
//     {id:21,  type:"text", message:"Hola, Bienvenido a la tienda", time:"21:36", inbound:false}]},
// {id:7, owner: "Participante 6", messages:[{id:32,  type:"text", message:"Hola, quiero más información", time:"21:35", inbound:true},
//     {id:22,  type:"text", message:"Está disponible?", time:"21:35", inbound:true},
//     {id:23,  type:"video", message:"https://firebasestorage.googleapis.com/v0/b/apify-a2b24.firebasestorage.app/o/products%2Fdba27418-ae53-4f16-b5e7-7d3405c66775?alt=media&token=f8ae2189-ded3-4cfe-b898-a9d8ed18a22a", time:"21:36", inbound:false}]},
// {id:8, owner: "Participante 7", messages:[{id:33,  type:"text", message:"Hola, quiero más información", time:"21:35", inbound:true},
//     {id:24,  type:"text", message:"Está disponible?", time:"21:35", inbound:true},
//     {id:25,  type:"text", message:"Hola, Bienvenido a la tienda", time:"21:36", inbound:false}]},
// {id:9, owner: "Participante 8", messages:[{id:34,  type:"text", message:"Hola, quiero más información", time:"21:35", inbound:true},
//     {id:26,  type:"text", message:"Está disponible?", time:"21:35", inbound:true},
//     {id:27,  type:"text", message:"Hola, Bienvenido a la tienda", time:"21:36", inbound:false}]},
// {id:10, owner: "Participante 9", messages:[{id:35,  type:"text", message:"Hola, quiero más información", time:"21:35", inbound:true},
//     {id:28,  type:"text", message:"Está disponible?", time:"21:35", inbound:true},
//     {id:29,  type:"text", message:"Hola, Bienvenido a la tienda", time:"21:36", inbound:false}]}])

// const interval = setInterval(() => {
//       console.log("getting chats") // Cargar cada 30 seg
//     }, 60000);

    // return () => clearInterval(interval); // Limpiar intervalo al desmontar
// },[])