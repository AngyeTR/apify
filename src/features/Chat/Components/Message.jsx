export const Message =({message})=>{

    const render = (message) =>{
        const items= {
              text: <p className="">{message.message}</p>,
              image:  <img src="https://cdn-icons-png.flaticon.com/512/3771/3771098.png" className="w-50 h-50 justify-self-center"/>,
              video: <iframe src= {message.message} allow="autoplay; encrypted-media" allowFullScreen title="Video de presentación"className={`w-60 h-80 justify-self-center`} ></iframe>
        }
        return items[message.type]
    }

    return (
        <div className={`border border-zinc-400 rounded-lg p-2 w-[95%] md:w-[60%] lg:w-[55%] my-2 ${message.inbound ? "mr-auto bg-white": "ml-auto bg-green-100"} `}>
            {render(message)}
            <p className="text-align-right justify-self-end text-zinc-600 text-sm"> {message.time}</p>
        </div>
    )
}