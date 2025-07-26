import { useState, useEffect } from "react"
import { HiOutlineFilm } from "react-icons/hi";
import { getByCompanyId } from "../../../shared/services/API/api";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import { Heading } from "../../../shared/components/uikit/heading";
import { Input } from "../../../shared/components/uikit/input";
import { Button } from "../../../shared/components/uikit/button";
import { NewResourceForm } from "./NewResourceForm";
import { Modal } from "./Modal";

export const CollectionSelector = ({variable, setVariable, type})=> {
    const [collection, setCollection] = useState(null) 
    const [data, setData] = useState(null)
    const [filter, setFilter] = useState("")
    const [filtered, setFiltered] = useState([])
    const [add, setAdd] = useState(false)
    const [stored] = useLocalStorage("data")

    useEffect(() => {getByCompanyId("Libraries", stored?.company.id).then((res) => setData(res.data));}, []);

    useEffect(()=>{setFiltered(data?.filter(d=> d.name.toLowerCase().includes(filter.toLowerCase())))},[data, filter])

    const renderList =()=>{ 
        const items = data.filter(item=> item?.name == collection)
        const newItems = (type == "video") ? items[0].files.filter(item=> item.fileType == 2 ) : items[0].files.filter(item=> item.fileType != 2 )
        return (<div className="my-2 flex flex-wrap ">
        {
        newItems.map(item => 
           <div className={`w-[70px] h-[70px] sm:w-[120px] sm:h-[150px] overflow-hidden justify-center border border-zinc-200 rounded-lg m-1 items-center ${variable == item.url && "border border-zinc-400 rounded-lg p-0"} hover:underline`} onClick={()=>setVariable(item.url)}>
           {type == "image" ? <img className="w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] mx-2" src={item.url}/> : <HiOutlineFilm className="justify-self-center size-16"/>}
            <p className="text-xs sm:text-md text-center">{item.name}</p> 
           </div>)
           }
        </div>)}
    
    return (<>
            {!add ? 
            <div className="grid grid-cols-3 sm:grid-cols-4 w-full gap-1 border border-zinc-200 rounded-lg">
            <div className="bg-zinc-200 rounded-md p-2 border border-zinc-300 h-[65vh]">
                <Heading className="mb-5 text-sm sm:text-lg">Colecciones</Heading>
                <Input placeHolder="Buscar Colección ..." onChange={e=> setFilter(e.target.value)}/>
                <div className="h-[50vh] overflow-y-scroll my-1">
                {filtered?.map(col => <p onClick={()=>setCollection(col.name)} className={`my-1 hover:bg-zinc-300 hover:rounded-lg xs sm:text-md ${col.name == collection && "underline"}`}>{col.name}</p>)}
                </div>
            </div>
            <div className="col-span-2 sm:col-span-3">
                <div className="flex items-center justify-center my-2 gap-6 w-full "><Heading className="justify-self-center text-sm sm:text-lg">Recursos</Heading>
                <Button onClick={()=>setAdd(true)} >Añadir archivo</Button> </div>
                <div className="w-full ">
                    {collection && renderList()}
                </div> 
            </div>
            </div>
: 
 
                            <Modal>
                                <NewResourceForm data={data} setEditor={setAdd}/>
                            </Modal> }
                           
                   
    </>)}