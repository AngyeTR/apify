import { stringToTime } from "../utils/utils"

export const Message =({message, setModal, isMatch})=>{
    const render = (message) =>{
        const items= {
              2: <p className="text-sm">{message.text}</p>,
              5:  <img onClick={()=>setModal(message)} src={message.url} className="w-50 h-50 justify-self-center"/>,
              6: <iframe onClick={()=>setModal(message)} src= {message.url} allow=" encrypted-media" allowFullScreen title="Video de presentación"className={`w-60 h-80 justify-self-center cursor-pointer hover:border hover:border-black`} ></iframe>,
              7: <audio controls className="w-[260px] sm:w-xs"> <source  src={message.url} type="audio/mpeg" />Tu navegador no soporta el elemento de audio.</audio>,
              10: <button disabled={true} className="border border-gray-300 px-2 py-1 rounded-lg shadow-md bg-zinc-200">{message.text}</button>,
              11: <p className="text-sm italic">Contenido no disponible: <span className="font-semibold">Sticker</span></p>,
        }
        return items[message.typeMessage]
    }

    return (
        
        <div className={` ${isMatch ? "border-2 border-yellow-400 rounded-xl" : "border border-zinc-400 rounded-xl"} p-4 pt-3  w-[95%] md:w-[60%] lg:w-[55%] my-2 ${message?.from?.length >0 ? "mr-auto bg-white": "ml-auto bg-green-100"} `}>
            {render(message)}
            <p className="text-align-right justify-self-end text-zinc-600 text-xs"> {stringToTime(message.createdDate)}</p>
        </div>
    )
}