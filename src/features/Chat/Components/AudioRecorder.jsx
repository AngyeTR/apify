import { useRef, useState } from "react";
import { MdOutlineKeyboardVoice, MdOutlineStop  } from "react-icons/md";
import { HiOutlineTrash, HiOutlineX} from "react-icons/hi";
import { LuSend } from "react-icons/lu";

export const AudioRecorder = ({ onAudioReady, setShow, show }) =>{
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [base64Audio, setBase64Audio] = useState(null);
  const audioChunksRef = useRef([]);
  const mediaRecorderRef = useRef(null);

  const startRecording = async () => {
    try {
      setShow(false)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/mp4; codecs=opus' });
      audioChunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) { audioChunksRef.current.push(e.data)}
      };

      recorder.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: ".ogg" });
        const maxSize = 16 * 1024 * 1024;
        if (blob.size > maxSize) {
          alert("El archivo de audio excede los 16MB. Intenta grabar menos tiempo.");
          return;
        }

     const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setAudioBlob(blob);
      const reader = new FileReader();
      
      reader.onloadend = () => {
      const base64 = reader.result.split(",")[1];
      setBase64Audio(base64);
      };
        
      reader.readAsDataURL(blob);
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch (err) {
      console.error("Error al acceder al micrófono:", err);
      alert("No se pudo acceder al micrófono.")}
  };

   const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const resetRecording = () => {
    setShow(true)
    setAudioUrl(null);
    setAudioBlob(null);
    setBase64Audio(null);
    setIsRecording(false)
  };

  const handleSend = () => {
    setShow(true)
    if (audioBlob && base64Audio) {
      onAudioReady({blob: audioBlob, base64: base64Audio, mimeType: "audio/ogg",})
      resetRecording();
    }
  };

 return (
    <div className="flex flex-col gap-2 items-center">
      {!isRecording && !audioUrl && (
        <>{show || show == undefined ? 
          <MdOutlineKeyboardVoice  className="size-6 m-1" onClick={()=> {console.log("grabando");startRecording()}}/>: 
          <div className="flex flex-cols">
          <div className="flex items-center " onClick={startRecording}>
            <MdOutlineKeyboardVoice  className="size-6 m-1" />
            <p className="text-zinc-800">Toca para iniciar grabación</p>
          </div>
          <HiOutlineX  onClick={resetRecording} className="size-6 ml-3 text-red-500"/>
          </div>}
        </> 
      )}

      {isRecording && (<div className="flex items-center " onClick={stopRecording}>
        <MdOutlineStop  className="size-6 m-1"/>
        <p className="text-zinc-800">Toca para finalizar grabación</p></div>)}

      {!isRecording && audioUrl && (
        <div className="flex flex-cols items-center gap-2">
          <audio src={audioUrl} controls className=" w-[200px]" />
          <div className="flex col-span-1">
            <HiOutlineTrash  onClick={resetRecording} className="size-6 mx-2"/>
            <LuSend onClick={handleSend} className="size-6 mx-2"/>
          </div>
        </div>)}
    </div>
  )}


