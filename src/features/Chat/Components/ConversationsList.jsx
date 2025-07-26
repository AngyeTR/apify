import {Sidebar, SidebarBody, SidebarHeader, SidebarLabel, SidebarSection } from "../../../shared/components/uikit/sidebar"
import {Avatar} from "../../../shared/components/uikit/avatar"
import { HiHome,   } from "react-icons/hi";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage"
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../shared/components/Loader";
import { useEffect, useState } from "react";
import { Input } from "../../../shared/components/uikit/input";

export const ConversationsList = ({conversations, setConversation, conversation, loading})=>{
  const selected = conversation
  const [user, setUser] = useLocalStorage("data", null)
  const [filtered, setFiltered] = useState(conversations)
  const [filter, setFilter] = useState("")
  const nav = useNavigate()

  useEffect(()=>{setFiltered(conversations)},[ , conversations])
  useEffect(()=>{
    const filteredChats = conversations?.filter(chat=> chat.to.includes(filter))
    setFiltered(filteredChats)
  },[ filter])

  if (loading) return <div className="place-self-center mt-50"><Loader /></div>

  return ( 
    <Sidebar >
    <SidebarBody>
      <SidebarHeader className="fixed top-5 w-80 lg:w-70 z-3 h-[10%] ml-5 lg:ml-0 bg-white">
        <div className="flex flex-row  items-center" >
          <Avatar src={user?.company?.urlLogo} className="bg-zinc-50 size-10"/>
          <SidebarLabel className="text-2xl font-bold ml-2">{user?.company?.name} </SidebarLabel>
          <div className="cursor-pointer rounded-full hover:border hover:border-zinc-400 ml-auto mr-3"><HiHome  className="size-6" onClick={()=> nav("/dashboard")}/></div>
          </div>
      </SidebarHeader>
      <SidebarSection className="relative mt-[12%] lg:mt-[25%] h-[90%]">
        {!filtered ? <SidebarLabel>Aún no hay conversaciones</SidebarLabel>:
        <><SidebarLabel className="mt-2" onChange={e=> setFilter(e.target.value)}><Input placeHolder="Buscar chat..."/></SidebarLabel>
        {filtered.map(conversation =>  
        <div onClick={()=>setConversation(conversation)} key={conversation.to}
        className={`${conversation.to == selected?.to && "border border-zinc-300"} relative my-1 min-w-0 items-center gap-3 rounded-lg  p-2 text-left text-base/6 font-medium text-zinc-950 hover:text-zinc-950 sm:text-sm/5 hover:bg-zinc-950/5 `}>
            <div className="flex flex-row"><div><p className="text-md my-1 font-semibold">{conversation.to}</p></div>  
               {conversation.quantity != "0" && <div className='absolute right-3 top-3 text-white h-5 w-5 justify-items-center bg-green-500 rounded-full'><p className="text-xs my-1">{conversation.quantity}</p></div>}
            </div>
            <div className="block flex flex-row">
                {conversation.subject.length > 0 ? <p className="text-sm text-zinc-700 pl-5 overflow-hidden w-80 h-4">{conversation.subject}</p>: 
                <div className="flex "><p className="italic ml-2"> Contenido Multimedia</p></div>}</div>
        </div>)}
        </>}
        </SidebarSection>
      </SidebarBody>    
    </Sidebar>)
}