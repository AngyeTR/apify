import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage";
import { GridContainer } from "../../../Designer/components/GridContainer";
import { getByCompanyId, getByID } from "../../../../shared/services/API/api";
import { SalesWizard } from "../../components/salesWizard/SalesWizard";

export const SalesTunnelPage = ()=> {
    // useEffect(()=>{getByID("SalesTunnel", params.tunnel).then(res=> setData(res.data))},[])
    useEffect(() => { getByCompanyId("Layouts", stored?.company.id).then(res => setLayouts(res.data))
        getByID("SalesTunnel", params.tunnel).then(res=> setData(res.data))
    }, []);
    const params = useParams()
    const nav = useNavigate()
    const [layout, setLayout] = useState(null) 
    const [data, setData] = useState(null) 
    const [color, setColor] = useState({backgroundColor: "#ffffff"}) 
    const [ layouts, setLayouts] = useState(null)
    const [stored] = useLocalStorage("data")
    const [grid, setGrid] = useState()

    const navigate= ()=>{
        nav(`/designer/editor/${params.id}`)
        nav(0)}  

    useEffect(() => {
        const layoutOBJ = layouts?.filter(item => item.id == params.tunnel)
        console.log(params.tunnel, layouts)
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
         <div className="w-screen justify-self-center pb-5" style={{backgroundColor: color?.["backgroundColor"],  
              backgroundImage: `url('${color?.["backgroundImage"]}')`,  backgroundSize: 'cover',
              backgroundPosition: 'center', repeat: "no-repeat",  backgroundBlendMode: 'multiply' }} >
            <div className="w-[90vw] sm:w-[70vw] m-0 p-0  justify-self-center justify-items-center" >
                <GridContainer canEdit={false} items={layout}  setGrid={setGrid}/>
                <SalesWizard data={data}/>
            </div>
         </div>
    )
} 