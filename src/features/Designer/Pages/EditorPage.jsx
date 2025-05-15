import { useState, useEffect } from "react"
import { GridContainer } from "../components/GridContainer"
import { WidgetsContainer } from "../components/WidgetsContainer"

export const EditorPage=()=>{
    const [layout, setLayout] = useState([])
    const [count, setCount] = useState(0)
    const [layoutColor, setLayoutColor] =  useState({})

    useEffect(() => {
        const savedLayout = localStorage.getItem("grid-layout");
        const savedColor = localStorage.getItem("grid-color");
        if (savedLayout) {
          const layout = JSON.parse(savedLayout);
          setCount(layout.length)
          layout.forEach((item) => {setLayout(layout)})
        }
        savedColor && setLayoutColor(JSON.parse(savedColor))
    }, [ ]);

    return(
        <div className=" h-screen w-screen sm:grid sm:grid-cols-7 gap-1 justify-items-center m-0 p-0 mt-5 ">
            <div className="w-[95vw] mb-4 sm:w-[15vw]  m-0 p-0 ">
                <WidgetsContainer  setItems={setLayout} items={layout} count={count} setCount={setCount} layoutColor={layoutColor}/>
            </div>
            <div className="w-[90vw] sm:w-[70vw] m-0 p-0 col-span-6 ">
                <GridContainer canEdit={true} setItems={setLayout} items={layout} count={count}  layoutColor={layoutColor} setLayoutColor={setLayoutColor} />
            </div>
        </div>
    )
}