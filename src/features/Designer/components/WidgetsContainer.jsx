import { useRef } from "react";
import { Button } from "../../../shared/components/uikit/button"
import { useNavigate } from "react-router-dom";
import { Controller } from "./Controller";

export const WidgetsContainer =({setItems, items, count, setCount, layoutColor})=>{
    const nav = useNavigate()
    const itemsRef = useRef(new Map())
    const getMap = ()=>{return itemsRef.current}

    const addWidget = async (type)=>{
        setItems([...items,{id: `${type}-${count}`, h:"3" , w:"1", content:type == "container" ? [] : null, style:null}]);
        // setTimeout(()=>{grid.makeWidget(getMap().get(count))}, 5)
    await new Promise(resolve => setTimeout(resolve, 500));

        setCount(prev => prev+1)}  

    const saveLayout = () => {
        const layout = grid.save(false)
        console.log(layout, items)
        layout.forEach((item) => {item.content = items.filter(it => it.id == item.id)[0].content})
        layout.forEach((item) => {item.style = items.filter(it => it.id == item.id)[0].style})
        localStorage.setItem("grid-layout", JSON.stringify(layout))
        localStorage.setItem("grid-color", JSON.stringify(layoutColor))
        console.log(layout, items)
        nav("/designer/view")
        nav(0)
    };
    
    return (
        <div className="border border-zinc-400 w-full m-1 rounded-lg p-1 pt-2">
            <div className="grid grid-cols-2">
            <Button onClick={()=>saveLayout()}  className="justify-self-center w-[90% ">Guardar</Button>
            <Button onClick={()=>nav("/designer/resources")}  className="justify-self-center w-[90% ">Ver galería</Button>
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