import { useState } from "react";
import { Button } from "../../../shared/components/uikit/button"
import { Heading} from "../../../shared/components/uikit/heading"
import { HiOutlineFilm } from "react-icons/hi";
import { Modal } from "./Modal";
import { NewResourceForm } from "./NewResourceForm";

export const ResourcesView = ({collection, data})=> {
    const [file, setFile]  = useState(null)
    const [editor, setEditor] = useState(false)

    return ( 
        <>
        {collection ? 
            <div>
                <Heading >{collection.name}</Heading>
                {collection.files.length == 0 ? <h3 className="my-10">Esta colección aún no tiene recursos</h3>:
                <div className="flex  flex-wrap gap-2 p-6">
                    {collection.files.map(item=> 
                    <div onClick={()=>setFile(item)} className="border border-zinc-300 place-items-center overflow-hidden m-1 w-[160px] rounded-lg h-[120px] p-1 hover:border-2 hover:border-zinc-500">
                        <p className="overflow-x-hidden w-[150px] h-[30px]">{item.name}</p>
                        {(item.fileType == 0 || item.fileType == 1) ?<img className="rounded-md size-[90px] p-1" src={item.url}/> :
                        <div className="rounded-md content-center size-[90px] p-1"><HiOutlineFilm className="justify-self-center size-16"/></div>}
                    </div>)}
                </div>}
                <Button className="block" onClick={()=>setEditor(true) }>Añadir archivo a la colección</Button>
            </div> 
            : <div className="h-[200px] content-center "><h3>Seleccione una colección para ver sus recursos</h3></div>}     
        {editor && 
                <Modal>
                    <NewResourceForm data={data} setEditor={setEditor}/>
                </Modal> }
                {file && 
                <Modal>
                    <div className="h-fit w-fit bg-white rounded-lg justify-items-center">
                        <p className="m-5">{file.name}</p>
                    {(file.fileType == 0 || file.fileType == 1) ? <img className="h-lg w-lg block border border-zinc-300 m-2" src={file.url}/> :
                    <iframe src= {file.url} allow="autoplay; encrypted-media" allowFullScreen title="Video de presentación"className="justify-self-center h-[400px] rounded-lg"></iframe>}
                    <Button className="mx-1 my-2" onClick={()=> setFile(null)}>Eliminar</Button>
                    <select className="border border-zinc-300 p-2 mx-1 rounded-lg" onChange={(e)=>console.log(e.target.value)}>
                        <option value={null}>Mover a Colección</option>
                        {data.map(col=><option value={parseInt(col.id)}>{col.name}</option>)}
                    </select>
                    <Button className="mx-1 my-2" onClick={()=> setFile(null)}>Mover</Button>
                    <Button className="mx-1 my-2" color="red" onClick={()=> setFile(null)}>Cerrar</Button>
                    </div>
                </Modal> }
        </>
    )
}