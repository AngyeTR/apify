import { useEffect, useRef, useState } from "react";
import { Button } from "../../../shared/components/uikit/button"
import { Input} from "../../../shared/components/uikit/input"
import { useNavigate } from "react-router-dom";
import { Controller } from "./Controller";
import { edit } from "../../../shared/services/API/api";

export const WidgetsContainer =({setItems, items, count, setCount, layoutColor, item, grid})=>{
    const [newItem, setNewItem] = useState(null)
    const nav = useNavigate() 
    const itemsRef = useRef(new Map())
    const getMap = ()=>{return itemsRef.current}
    useEffect(()=>{ setNewItem({...item?.[0]})}, [item])

    const addWidget = async (type)=>{
        setItems([...items,{id: `${type}-${count}`, h:"3" , w:"1", content:type == "container" ? [] : null, style:null}]);
        await new Promise(resolve => setTimeout(resolve, 500));
        setCount(prev => prev+1)}  

    const saveLayout = async () => {
        const layout = grid.save(false);
        layout.forEach(item => {
        const match = items.find(it => it.id === item.id);
        item.content = match?.content;
        item.style = match?.style;
    });

    const layoutStr = JSON.stringify(layout).replaceAll('"', "'");
    const styleStr = JSON.stringify(layoutColor).replaceAll('"', "'");

    const updatedItem = {
        ...newItem,
        content: layoutStr,
        styles: styleStr,};
        
  const res = await edit("Layouts", updatedItem).then(res => res);
  res.isValid ? nav("/designer/") : console.log(res)
};

    return (
        <div className="border border-zinc-400 w-full m-1 rounded-lg p-1 pt-2">
             <div className="grid grid-cols-2 auto-rows-auto gap-1">
            <Input placeholder={item?.[0]?.name} className="col-span-2 w-[90%]" onChange={(e)=> setNewItem(prev => ({...prev, "name": e.target.value}))}/>
            <Button onClick={()=>saveLayout()}  className="justify-self-center w-[90%] "><p className="text-[80%] self-center">Guardar</p></Button>
            <Button onClick={()=>nav("/designer")}  className="justify-self-center w-[90%] "><p className="text-[80%] self-center">Salir</p></Button>
            </div>
            <div className="flex justify-center sm:flex-col mt-2 justify-self-center">
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