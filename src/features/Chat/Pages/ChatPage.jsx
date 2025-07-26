import { useEffect, useState } from "react"
import { ChatLayout } from "../../../shared/components/uikit/chat-layout"
import { Conversation } from "../Components/Conversation"
import { ConversationsList } from "../Components/ConversationsList"
import { getChatList } from "../../../shared/services/API/api"
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage"

export const ChatPage = ()=> {
    const [conversation, setConversation] = useState(null)
    const [conversations, setConversations] = useState(null)
    const [orderedConversations, setOrderedConversations] = useState(null)
    const [loading, setLoading] = useState(false)
    const [stored] = useLocalStorage("data")

    useEffect(()=>{
        setLoading(true)
        getChatList(stored.company.id).then(res=> setConversations(res.data)).finally(() => setLoading(false))
        const interval = setInterval(() => {getChatList(stored.company.id).then(res=> setConversations(res.data)) }, 60000);
        return () => clearInterval(interval);
    },[])
    
    useEffect(()=>{
        let firstPart = conversations?.filter(chat => chat.quantity != "0")
        let secondPart = conversations?.filter(chat => chat.quantity == "0")
        firstPart = firstPart == undefined ? [] : firstPart
        secondPart = secondPart == undefined ? []  : secondPart
        setOrderedConversations(firstPart.concat(secondPart))
    },[conversations])
    return (
        <ChatLayout conversation={conversation} sidebar={<ConversationsList conversations= {orderedConversations} conversation={conversation} setConversation={setConversation} loading={loading}/>} >
            {conversation && <Conversation conversation={conversation} key={conversation.to} />}
        </ChatLayout>
    )
}
