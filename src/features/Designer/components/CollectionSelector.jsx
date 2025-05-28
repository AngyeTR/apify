import { useState, useEffect } from "react"
import { HiOutlineFilm } from "react-icons/hi";
import { Select } from "../../../shared/components/uikit/select"
import { getByCompanyId } from "../../../shared/services/API/api";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";

export const CollectionSelector = ({variable, setVariable, type})=> {
    const [collection, setCollection] = useState(null) 
    const [data, setData] = useState(null)
    const [stored] = useLocalStorage("data")
    console.log(collection)
    useEffect(() => {getByCompanyId("Libraries", stored.company.id).then((res) => setData(res.data));}, []);

    const renderList =()=>{ 
        const items = data.filter(item=> item?.name == collection)
        const newItems = (type == "video") ? items[0].files.filter(item=> item.fileType == 2 ) : items[0].files.filter(item=> item.fileType != 2 )
            console.log(newItems)
        return (<div className="my-2">
        {
        newItems.map(item => 
           <div className={`flex justify-center items-center ${variable == item.url && "border border-zinc-400 rounded-lg p-0"} hover:underline`} onClick={()=>setVariable(item.url)}>
            <p>{item.name}</p> 
           {type == "image" ? <img className="w-[40px] h-[40px] mx-2" src={item.url}/> : <HiOutlineFilm className="justify-self-center size-16"/>}</div>)}
        </div>)}
    
    return (<>
        <Select className="my-2" onChange={(e)=>setCollection(e.target.value)}>
        <option value={null} key={null}>Seleccione una colección</option>
        {data?.map(item => <option  value={item.name} key={item.name}>{item.name}</option>)}
        </Select>
        {collection && renderList()}    
    </>)
}