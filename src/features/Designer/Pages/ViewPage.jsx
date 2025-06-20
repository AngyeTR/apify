import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { GridContainer } from "../components/GridContainer"
import { Button } from "../../../shared/components/uikit/button"
import { getByCompanyId } from "../../../shared/services/API/api"
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage"

export const ViewPage = ()=>{
    useEffect(() => { getByCompanyId("Layouts", stored?.company.id).then(res => setLayouts(res.data))}, []);
    const params = useParams()
    const nav = useNavigate()
    const [layout, setLayout] = useState(null) 
    const [color, setColor] = useState({backgroundColor: "#ffffff"}) 
    const [ layouts, setLayouts] = useState(null)
    const [stored] = useLocalStorage("data")
const [grid, setGrid] = useState()
    const navigate= ()=>{
        nav(`/designer/editor/${params.id}`)
        nav(0)}  

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
        <div className="w-[90vw] sm:w-[70vw] m-0 p-0  justify-self-center" style={{backgroundColor: color?.["backgroundColor"],  
      backgroundImage: `url('${color?.["backgroundImage"]}')`,  backgroundSize: 'cover',
      backgroundPosition: 'center', repeat: "no-repeat",  backgroundBlendMode: 'multiply' }}>
         {/* <div className="w-[400px] md:w-[800px] m-0 p-0 justify-self-center bg-amber-300"   > */}
            <GridContainer canEdit={false} items={layout}  setGrid={setGrid}/>
            {/* <GridContainer canEdit={false} items={layout} layoutColor={color} setGrid={setGrid}/> */}
            {/* <Button className="mt-2" onClick={navigate}>Editar</Button> */}
        </div>
    )
}