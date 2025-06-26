import { Message } from "./Message"
import { NewMessage } from "./NewMessage"

export const Conversation =({conversation})=>{

return (
    <>
    {conversation ? <div className="">
        <div className="fixed top-3 ml-6 lg:ml-0 flex items-center p-3 bg-zinc-100 w-[75%]"><div className="mr-5 bg-blue-500 h-10 w-10 rounded-full"/><h1>{conversation.owner}</h1></div>
        <div className="fixed w-[90%] lg:w-[65%] xl:w-[70%] top-20 bottom-20 overflow-y-scroll px-3">{conversation.messages.map(message=> <Message  message={message} key={message.id}/>)}</div>
        <NewMessage />
    </div> 
    : <h1>Bienvenido</h1>}
    </>
)
}