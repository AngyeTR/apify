import { useEffect, useRef, useState } from "react";
import { Button } from "../../../shared/components/uikit/button"
import { Input} from "../../../shared/components/uikit/input"
import { useNavigate } from "react-router-dom";
import { Controller } from "./Controller";
import { edit } from "../../../shared/services/API/api";
import { HiOutlineEye, HiOutlineX } from "react-icons/hi";
import { FaRegSave } from "react-icons/fa";
import { Loader } from "../../../shared/components/Loader";

export const WidgetsContainer =({setItems, items, count, setCount, layoutColor, item, grid})=>{
    const [newItem, setNewItem] = useState(null)
    const [loading, setLoading] = useState(false)
    const [saved, setSaved] = useState(false)
    const nav = useNavigate() 
    const itemsRef = useRef(new Map())
    const getMap = ()=>{return itemsRef.current}
    useEffect(()=>{ setNewItem({...item?.[0]})}, [item])

    const addWidget = async (type)=>{
        setItems([...items,{id: `${type}-${count}`, h:"3" , w:"2", y:count, x:"1", content:type == "container" ? [] : null, style:null}]);
        await new Promise(resolve => setTimeout(resolve, 500));
        setCount(prev => prev+1)}  

    const saveLayout = async () => {
        setLoading(true)
        const layout = grid.save(false);
        layout.forEach(item => {
        const match = items.find(it => it.id === item.id);
        item.content = match?.content;
        item.style = match?.style})

        const layoutStr = JSON.stringify(layout).replaceAll('"', "'");
        const styleStr = JSON.stringify(layoutColor).replaceAll('"', "'");
        const updatedItem = { ...newItem, content: layoutStr, styles: styleStr,};
        const res = await edit("Layouts", updatedItem).then(res => res)
        res && setSaved(true)
        res &&setTimeout(() => setSaved(false), 3000);
        res &&setLoading(false)
    };
    return (
        <div className="border border-zinc-400 w-full m-1 rounded-lg p-1 pt-2">
             <div className="grid grid-cols-2 auto-rows-auto gap-1">
            <Input placeholder={item?.[0]?.name} className="col-span-2 w-[90%]" onChange={(e)=> setNewItem(prev => ({...prev, "name": e.target.value}))}/>
           { loading ? (saved ? <p className="text-green-600">Guardado </p>:<Loader/>):
           <div className="flex flex-wrap w-full justify-center col-span-2 gap-1">
            <Button onClick={()=>saveLayout()}  className="justify-self-center w-fit "><FaRegSave className="size-4"/></Button>
            <Button onClick={()=>nav(-1)}  className="justify-self-center w-fit "><HiOutlineX className="size-4"/></Button>
            <Button onClick={()=> nav(`/designer/view/${item[0].id}`)}  className="justify-self-center w-fit"><HiOutlineEye className="size-4"/></Button></div>}
            </div>
            <div className="flex justify-center md:flex-col mt-2 justify-self-center">
                <Controller type="text" handleClick={addWidget}/>
                <Controller type="title" handleClick={addWidget}/>
                <Controller type="button" handleClick={addWidget}/>
                <Controller type="payment" handleClick={addWidget}/>
                <Controller type="comparer" handleClick={addWidget}/>
                <Controller type="video" handleClick={addWidget}/>
                <Controller type="image" handleClick={addWidget}/>
                <Controller type="carousel" handleClick={addWidget}/>
                <Controller type="blank" handleClick={addWidget}/>
            </div>
        </div>)
}