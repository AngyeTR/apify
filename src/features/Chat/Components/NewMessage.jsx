import { LuSend } from "react-icons/lu";
import { MdAttachFile } from "react-icons/md";
import { useRef, useState } from "react";
import { TemplatesSelector } from "./TemplatesSelector";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import { getChatByPhone } from "../../../shared/services/API/api";
import { AudioRecorder } from "./AudioRecorder";
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "../../../shared/components/uikit/dropdown";
import { Textarea } from "../../../shared/components/uikit/textarea"
import { Modal } from "../../../shared/components/Modal";
import { Button } from "../../../shared/components/uikit/button";
import { HiOutlineTrash } from "react-icons/hi";
import { useMessages } from "../hooks/useMessages";

export const NewMessage=({inRange, owner, setMessages})=>{
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileType, setFileType] = useState(null);
    const [content, setContent] = useState(null)
    const [show, setShow] = useState(true)
    const [modal, setModal] = useState(null)
    const [stored] = useLocalStorage("data")
    const fileInputRef = useRef();
    const { sendText, sendArchive} = useMessages()

    const handleOpenFilePicker = (type) => {
        setFileType(type); 
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const isImage = file.type.startsWith("image/");
        const isVideo = file.type.startsWith("video/");
        if ((fileType === "image" && isImage) || (fileType === "video" && isVideo)) {
            setSelectedFile(file);
            setModal("preview");
        } else {alert("Tipo de archivo no válido") }
    };

    const sendAttached = async () => {
        const reader = new FileReader();
        reader.onloadend = async () => {
        const base64 = reader.result.split(",")[1];
        const reference =  fileType == "image" ? 5 * 1024 * 1024 : 16 * 1024 * 1024
        if ((base64.length * 3) / 4 > reference) {
            alert(`El archivo excede el límite de ${fileType== "image"? 5: 16}MB`);
            return;}
        sendArchive(base64, fileType, owner)
        setModal(null);
        setSelectedFile(null);
        setFileType(null);
        await getChatByPhone(stored.company.id, owner).then((res) =>setMessages(res.data))};
        reader.readAsDataURL(selectedFile);
        }

    const handleAudioReady = ({ blob, base64, mimeType }) => {
    console.log("Audio listo para enviar:", { blob, base64, mimeType });
            sendArchive(base64, "audio", owner)}

    return(
    <>{modal === "preview" && selectedFile ? (
  <Modal onClose={() => setModal(null)}>
    <div className="p-4 bg-white rounded-lg w-[90%] max-w-md mx-auto shadow-lg">
      <h2 className="text-lg font-semibold mb-2">Vista previa del archivo</h2>
      <div className="mb-4">
        {fileType === "image" ? (<img src={URL.createObjectURL(selectedFile)} alt="preview"className="w-full rounded max-w-[400px] max-h-[500px]"/>) : 
        (<video controls src={URL.createObjectURL(selectedFile)} className="w-full rounded max-w-[400px] max-h-[500px]" />)}
      </div>
      <div className="flex justify-between">
        <Button  color="red" onClick={() => {setModal(null); setSelectedFile(null);setFileType(null)}}><HiOutlineTrash className="size-6"/></Button>
        <Button color="green" onClick={sendAttached}><LuSend  className="size-6"/></Button>
      </div>
    </div>
  </Modal>
) :
    <>{show ? <div className="fixed bottom-3 flex items-center p-3 pb-1 bg-zinc-100 w-[90%] lg:w-[65%] xl:w-[70%] ">
        <div className="flex-col sm:flex  w-full">
        { inRange && <div  className="flex">
            <div className="bg-white p-2 mx-1 shadow-md rounded-full border border-zinc-200 hover:border-zinc-400">
                <input  type="file" ref={fileInputRef} style={{ display: "none" }} accept={fileType=="image" ? ".jpg,.jpeg,.png": fileType == "video"&& ".mp4,.3gpp"} onChange={handleFileChange}/>
                <Dropdown>
                    <DropdownButton plain> <MdAttachFile className="size-6"/></DropdownButton>
                    <DropdownMenu>
                        <DropdownItem onClick={() => handleOpenFilePicker("image")}>Imagen</DropdownItem>
                        <DropdownItem onClick={() => handleOpenFilePicker("video")}>Video</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                 </div>
            <Textarea className="w-fit" type="text" placeHolder="Escribe un mensaje" onChange={e=> setContent(e.target.value)}/>
            </div> }
            <TemplatesSelector/>
             </div>
            <div className="border border-zinc-200 bg-white py-2 px-4  shadow-md rounded-full hover:border-zinc-400">{content || !inRange ? 
                show && <LuSend className="size-6 m-1" onClick={()=>{sendText(content, owner);setContent(null)}}/> :
                <AudioRecorder onAudioReady={handleAudioReady} setShow={setShow}/>}</div>
        </div>:
        <div className="fixed bottom-3 flex items-center p-3 pb-1 bg-yellow-100 w-[90%] lg:w-[65%] xl:w-[70%] ">
            
        <div className="border w-full border-blue-200 bg-white py-2 px-4  shadow-md rounded-full hover:border-zinc-400">{content || !inRange ? 
                show && <LuSend className="size-6 m-1" onClick={sendText}/> :
                <AudioRecorder onAudioReady={handleAudioReady} setShow={setShow} show={show}/>}</div></div>}</>
        }</>
     )
}