import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import {  sendMessage, postImage } from "../../../shared/services/API/api";

export function useMessages() {
    const [stored] = useLocalStorage("data")

    const getUrl =  async (file, type)=> 
        {try {
        const data ={name: `whatsAppFile${Date.now()}`, "base64": file, "imageType": type}
        const url  = await postImage(data)
        return url.data
        } catch (error) {console.log(error)}}

    const sendText =async (text, owner)=>{
      const cellphone = owner[0] == "5" ?  owner.slice(2, 12) : owner
        await sendMessage("Text", { cellphone: cellphone, message: text, idCompany: stored.company.id}).then(res=>console.log(res))
        // setContent(null)
    }

    const sendArchive = async (file, type, owner) => {
      const cellphone = owner[0] == "5" ?  owner.slice(2, 12) : owner
        const queryType = type == "image" ? "Image": type == "video" ? "Video": type = "audio" && "Audio"
        const typeNumber = type == "image" ? 3 : type=="video" ? 4 : type == "audio" && 5
        const url = await getUrl(file, typeNumber);
        await sendMessage( queryType, {cellphone: cellphone, url: url, idCompany: stored.company.id,}).then(res=> console.log(res));
    }

  return {
    sendText, 
    sendArchive
  };
}
