import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { useEffect, useState, useRef } from "react"
import { Message } from "./Message"
import { NewMessage } from "./NewMessage"
import { getChatByPhone, markRead } from "../../../shared/services/API/api"
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage"
import { Loader } from "../../../shared/components/Loader"
import { Check24hRange } from "../utils/utils"
import { Modal } from "../../../shared/components/Modal"
import { Button } from "../../../shared/components/uikit/button"
import { Input } from "../../../shared/components/uikit/input"

export const Conversation =({conversation})=>{
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [stored] = useLocalStorage("data")
  const [modal, setModal] = useState(null)
  const [searchText, setSearchText] = useState("");
  const [matchIndexes, setMatchIndexes] = useState([]); // índices donde hay coincidencia
  const [currentMatch, setCurrentMatch] = useState(0);
  const contenedorRef = useRef(null);
  const messageRefs = useRef([]);

  const goToMatch = (direction)=>{
    const match = direction == "next" ? 
    currentMatch < matchIndexes.length - 1 &&  currentMatch + 1 :
    currentMatch > 0 && currentMatch - 1
    setCurrentMatch(match);
    scrollToMessage(matchIndexes[match]);
  }
 
  const scrollToMessage = (index) => {
    const ref = messageRefs.current[index];
    if (ref) {ref.scrollIntoView({ behavior: "smooth", block: "start" })}
  }

  const handleSearch = () => {
    const matches = messages.map((msg, index) => ({ msg, index })).filter(({ msg }) => msg.text.toLowerCase().includes(searchText.toLowerCase())).map(({ index }) => index);
    setMatchIndexes(matches);
    setCurrentMatch(0);
    matches.length > 0 &&  scrollToMessage(matches[0])
  }

  useEffect(() => {messageRefs.current = []
    if (contenedorRef.current) { contenedorRef.current.scrollTop = contenedorRef.current.scrollHeight}
  }, [messages]);

  useEffect(() => {if(searchText.length == 0){setCurrentMatch(0); setMatchIndexes([])} else  handleSearch()}, [searchText]);

  useEffect(() => {conversation?.quantity != "0" && markRead(stored.company.id, conversation?.to, ).then(res=>console.log(res.data))}, []); 

  useEffect(()=>{
    setLoading(true)
    getChatByPhone(stored.company.id, conversation.to).then(res=> setMessages(res.data) ).finally(() => setLoading(false))
    const interval = setInterval(() => { getChatByPhone(stored.company.id, conversation.to).then(res=> setMessages(res.data) ) }, 60000);
    return () => clearInterval(interval)},[conversation])

  if (loading) return <div className="place-self-center mt-50"><Loader /></div>
  
  const checkInRange = ()=>{
    if(messages.at(-1).to.length==0){return Check24hRange(messages.at(-1)?.createdDate)
    } else { 
      const sentMessages = messages.filter(message=> message.to.length > 0)
      const typeMessages = sentMessages.filter(message=> message.typeMessage ==2)
      return typeMessages.length>0 ? Check24hRange(typeMessages.at(-1)?.createdDate) : true}
  }

  const inRange =  checkInRange()

return (
    <>{modal ? <Modal>
      <div className="relative bg-zinc-50 rounded-lg w-[90%] md:w-[70%] h-[90%] overflow-scroll py-10 justify-items-center"> 
        {console.log(modal)}
        <Button onClick={()=>setModal(null)} className="absolute top-5 left-5" color="green">Cerrar</Button>
        {modal.typeMessage == 5 ? 
          <img src={modal?.url} className="max-w-[500px] justify-self-center"/>:
        <iframe src= {modal.url} allow="autoplay; encrypted-media" allowFullScreen title="Video de presentación"className={`w-60 h-80 justify-self-center`} ></iframe>
        } 
        
        </div> 
    </Modal>:

    <> {conversation ? <div className="" >
      <div className="fixed top-3 ml-6 lg:ml-0 flex items-center p-3 bg-zinc-100 w-[85%] sm:w-[65%]">
        <div className=" mr-5 bg-blue-500 h-10 w-10 rounded-full"/><h1>{conversation.to}</h1>
          <div className="flex absolute right-0 mb-2 items-center  w-[135px]">
            <Input type="text" placeholder="Buscar ..." 
            onChange={(e) => setSearchText(e.target.value)}/>
           {matchIndexes.length> 0 && 
           <div className="flex flex-col justify-between h-full ml-2">
            <Button onClick={()=>goToMatch("prev")} disabled={matchIndexes.length === 0} color="zinc"><HiChevronUp className="size-2"/></Button>
            <Button onClick={()=>goToMatch("next")} disabled={matchIndexes.length === 0} color="zinc"><HiChevronDown className="size-2"/></Button></div>}
          </div>
      </div>

      <div ref={contenedorRef} className="fixed w-[90%] lg:w-[65%] xl:w-[70%] top-20 bottom-31 overflow-y-scroll px-3">
        {messages.length > 0 ? (messages.map((message, index) => {
        const isMatch = matchIndexes.includes(index);
        return (
          <div key={message.id} ref={el => messageRefs.current[index] = el} >
            <Message message={message} setModal={setModal} isMatch={isMatch}/>
          </div>)})) : 
          ( <p className="text-center mt-15">Aún no hay mensajes disponibles</p>)}
      </div>
      <NewMessage inRange={inRange} owner={conversation.to} setMessages={setMessages}/>
    </div> 
    : <h1>Bienvenido</h1>}</>}
    </>)}