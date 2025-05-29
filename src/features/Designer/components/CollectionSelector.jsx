import { useState, useEffect } from "react"
import { HiOutlineFilm } from "react-icons/hi";
import { getByCompanyId } from "../../../shared/services/API/api";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import { Heading } from "../../../shared/components/uikit/heading";

export const CollectionSelector = ({variable, setVariable, type})=> {
    const [collection, setCollection] = useState(null) 
    const [data, setData] = useState(null)
    const [stored] = useLocalStorage("data")

    useEffect(() => {getByCompanyId("Libraries", stored.company.id).then((res) => setData(res.data));}, []);

    const renderList =()=>{ 
        const items = data.filter(item=> item?.name == collection)
        const newItems = (type == "video") ? items[0].files.filter(item=> item.fileType == 2 ) : items[0].files.filter(item=> item.fileType != 2 )
            console.log(newItems)
        return (<div className="my-2 flex flex-wrap ">
        {
        newItems.map(item => 
           <div className={`w-[120px] h-[150px] overflow-hidden justify-center border border-zinc-200 rounded-lg m-1 items-center ${variable == item.url && "border border-zinc-400 rounded-lg p-0"} hover:underline`} onClick={()=>setVariable(item.url)}>
           {type == "image" ? <img className="w-[100px] h-[100px] mx-2" src={item.url}/> : <HiOutlineFilm className="justify-self-center size-16"/>}
            <p>{item.name}</p> 
           </div>)
           }
        </div>)}
    
    return (<>
         <div className="grid grid-cols-4 w-full gap-1 border border-zinc-200 rounded-lg">
            <div className="bg-zinc-200 rounded-md p-2 border border-zinc-300">
                <Heading className="mb-5">Recursos</Heading>
                {data?.map(col => <p onClick={()=>setCollection(col.name)} className={`my-1 hover:bg-zinc-300 hover:rounded-lg ${col.name == collection && "underline"}`}>{col.name}</p>)}
            </div>
            <div className="col-span-3">
                <Heading className="justify-self-center">Colecciones</Heading>
                <div className="w-full ">
                    {collection && renderList()}
                </div>
            </div>
            </div>
    </>)}