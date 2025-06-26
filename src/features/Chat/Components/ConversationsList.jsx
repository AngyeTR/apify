import {Sidebar, SidebarBody, SidebarFooter, SidebarHeader, SidebarItem, SidebarLabel, SidebarSection, SidebarSpacer } from "../../../shared/components/uikit/sidebar"
import {Avatar} from "../../../shared/components/uikit/avatar"
import { HiHome, HiOutlineDocumentText, HiOutlinePhotograph , HiOutlineFilm,  } from "react-icons/hi";
import { BiCheckDouble } from "react-icons/bi";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage"
import { useNavigate } from "react-router-dom";

export const ConversationsList = ({conversations, setConversation, conversation})=>{
    const selected = conversation
    const [user, setUser] = useLocalStorage("data", null)
    const nav = useNavigate()

    const renderIcon = (type)=> {
        const icons = {
            document: <HiOutlineDocumentText/>,
            image: <HiOutlinePhotograph className=" size-5"/>,
            video: <HiOutlineFilm className=" size-5"/>,}
            return icons[type]}
    
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
              {!conversations ? <SidebarLabel>Aún no hay conversaciones</SidebarLabel>:
        conversations.map(conversation=>  
        <div onClick={()=>setConversation(conversation)} key={conversation.id}
        className={`${conversation.id == selected?.id && "border border-zinc-300"} relative my-1 min-w-0 items-center gap-3 rounded-lg  p-2 text-left text-base/6 font-medium text-zinc-950 hover:text-zinc-950 sm:text-sm/5 hover:bg-zinc-950/5 `}>
            <div className="flex flex-row"><div><p className="text-md my-1 font-semibold">{conversation.owner}</p></div>  <div><p  className="absolute right-1 text-zinc-500">{conversation.messages.at(-1)?.time}</p></div></div>
            <div className="block flex flex-row">
                {!conversation.messages.at(-1)?.inbound && <BiCheckDouble className="mx-1 size-5"/>}
                {conversation.messages.at(-1)?.type == "text" ? <p className="text-sm text-zinc-800 overflow-hidden w-80 h-4">{conversation.messages.at(-1)?.message }</p>: 
                <div className="flex ">{renderIcon(conversation.messages.at(-1)?.type)}<p className="italic ml-2">{conversation.messages.at(-1)?.type}</p></div>}</div>
        </div>)}

        </SidebarSection>
      
      </SidebarBody>
     
    </Sidebar>)
}