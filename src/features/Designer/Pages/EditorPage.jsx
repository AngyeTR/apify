import { useState, useEffect } from "react"
import { GridContainer } from "../components/GridContainer"
import { WidgetsContainer } from "../components/WidgetsContainer"
import { useParams } from "react-router-dom";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import { getByCompanyId } from "../../../shared/services/API/api";
import { Input } from "../../../shared/components/uikit/input";
import { Button } from "../../../shared/components/uikit/button";

export const EditorPage=()=>{
    useEffect(() => { getByCompanyId("Layouts", stored?.company.id).then(res => setLayouts(res.data))}, []);
    const params = useParams()
    // const nav = useNavigate()
    const [stored] = useLocalStorage("data")
    const [count, setCount] = useState(0)
    const [layout, setLayout] = useState([])
    const [layoutColor, setLayoutColor] =  useState({})
    const [layouts, setLayouts] =  useState([])
    const [item, setItem ] = useState(null)
    const [grid, setGrid ] = useState(null)
    const [selected, setSelected ] = useState(null)
    useEffect(() => {
        const layoutOBJ = layouts?.filter(item => item.id == params.id)
        layoutOBJ && setItem(layoutOBJ)
        const savedLayout = layoutOBJ?.[0]?.content?.replaceAll("'", "\"")
        const savedColor = layoutOBJ?.[0]?.styles?.replaceAll("'", "\"")
        if (savedLayout?.length > 2) {
          const layout = JSON.parse(savedLayout);
          setCount(layout.length)
          layout.forEach((item) => {setLayout(layout)})
        } else setLayout([])
        savedColor && setLayoutColor(JSON.parse(savedColor))
    }, [layouts ]);
    return(
        <div className=" h-screen w-screen md:grid md:grid-cols-7 gap-1 justify-items-center m-1 md:m-5 p-0 mt-5 ">
        {/* <div className=" h-screen w-screen  justify-items-center m-1 sm:m-5 p-0 mt-5 "> */}
            {/* <div className="w-[95vw] mb-4  m-0 p-0 "> */}
            <div className="w-[95vw] mb-4 md:w-[10vw]  m-0 p-0">
            {/* <div className="w-[95vw] mb-4 sm:w-[15vw]  m-0 p-0 "> */}
                <WidgetsContainer  setItems={setLayout} items={layout} count={count} setCount={setCount} layoutColor={layoutColor} item={item} grid={grid} />
            </div>
            {/* <div className="w-[90vw] sm:w-[70vw] m-0 p-0 col-span-6 "> */}
            <div className="w-[400px] md:w-[800px] m-0 p-0 col-span-6 border border-zinc-400 ">
                <GridContainer canEdit={true} setItems={setLayout} items={layout} count={count}  layoutColor={layoutColor} setLayoutColor={setLayoutColor} item={item} grid={grid} setGrid={setGrid} />
            </div>
        </div>  
    )
}