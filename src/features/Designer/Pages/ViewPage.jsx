import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { GridContainer } from "../components/GridContainer"
import { Button } from "../../../shared/components/uikit/button"
import { getByCompanyId } from "../../../shared/services/API/api"
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage"
import { HiOutlineX } from "react-icons/hi";

export const ViewPage = ()=>{
    useEffect(() => { getByCompanyId("Layouts", stored?.company.id).then(res => setLayouts(res.data))}, []);
    const params = useParams()
    const nav = useNavigate()
    const [layout, setLayout] = useState(null) 
    const [color, setColor] = useState({backgroundColor: "#ffffff"}) 
    const [ layouts, setLayouts] = useState(null)
    const [stored] = useLocalStorage("data")
    const [grid, setGrid] = useState()

    useEffect(() => {
        const layoutOBJ = layouts?.filter(item => item.id == params.id)
        const savedLayout = layoutOBJ?.[0]?.content?.replaceAll("'", "\"")
        const savedColor = layoutOBJ?.[0]?.styles?.replaceAll("'", "\"")
        savedColor && setColor(JSON.parse(savedColor))
        if (savedLayout) {
            const layout = JSON.parse(savedLayout);
            layout.forEach((item) => {
            setLayout(layout)})
            }
        }, [layouts]);


    return (
        <div className="relative w-[90vw] sm:w-[70vw] m-0 p-0  justify-self-center" style={{backgroundColor: color?.["backgroundColor"],  
      backgroundImage: `url('${color?.["backgroundImage"]}')`,  backgroundSize: 'cover',
      backgroundPosition: 'center', repeat: "no-repeat",  backgroundBlendMode: 'multiply' }}>
            <Button onClick={()=>nav(-1)} color="red" className="absolute top-5 right-10 shadow-xl"><HiOutlineX/></Button>
            <GridContainer canEdit={false} items={layout}  setGrid={setGrid}/>
        </div>
    )
}