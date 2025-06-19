import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage";
import { GridContainer } from "../../../Designer/components/GridContainer";
import { getByCompanyId, getByDomain, getByID } from "../../../../shared/services/API/api";
import { SalesWizard } from "../../components/salesWizard/SalesWizard";
import { useScrollCheckpoints } from "../../hooks/useScrollCheckPoints";
import useNavigatorData from "../../hooks/useNavigatorData";
import { useReport } from "../../hooks/useReport";

//Importante: Guardar 
export const SalesTunnelPage = ()=> {
    useScrollCheckpoints(10)
    const params = useParams()
    const nav = useNavigate()
    const [layout, setLayout] = useState(null) 
    const [data, setData] = useState(null) 
    const [color, setColor] = useState({backgroundColor: "#ffffff"}) 
    const [ layouts, setLayouts] = useState(null)
    const [stored] = useLocalStorage("data")
    const [store, setStore] = useLocalStorage("store", null)
    const [grid, setGrid] = useState()
    // const navigator = useNavigatorData() 
    const { reportView} = useReport()

    useEffect(()=>{
        const host = window.location.hostname
        getByDomain(host == "localhost" ? "store.apify.com.co": host).then(res=>  setStore({idStore: res.data.id, idCompany: res.data?.idCompany}))
        getByID("SalesTunnel", params.tunnel).then(res=> setData(res.data))
    reportView()},[])

    useEffect(() => { getByCompanyId("Layouts", store.idCompany).then(res => setLayouts(res.data))}, [store]);


    
    const navigate= ()=>{
        nav(`/designer/editor/${params.id}`)
        nav(0)}  

    useEffect(() => {
        const layoutOBJ = layouts?.filter(item => item.id == params.tunnel)
        const savedLayout = layoutOBJ?.[0]?.content?.replaceAll("'", "\"")
        const savedColor = layoutOBJ?.[0]?.styles?.replaceAll("'", "\"")
        savedColor && setColor(JSON.parse(savedColor))
        if (savedLayout) {
            const layout = JSON.parse(savedLayout);
            layout.forEach((item) => {
            setLayout(layout)})
            }
        }, [layouts]);
    
        const handleClickInCOmponent = (id)=>{console.log("Click en ", id)}
    
    return (
         <div className="w-screen justify-self-center pb-5" style={{backgroundColor: color?.["backgroundColor"],  
              backgroundImage: `url('${color?.["backgroundImage"]}')`,  backgroundSize: 'cover',
              backgroundPosition: 'center', repeat: "no-repeat",  backgroundBlendMode: 'multiply' }} >
            <div className="w-[90vw] sm:w-[70vw] m-0 p-0  justify-self-center justify-items-center" >
    const navigator = useNavigatorData() 
               <GridContainer canEdit={false} items={layout}  setGrid={setGrid} handleClickInCOmponent={handleClickInCOmponent}/>
                <SalesWizard data={data}/>
            </div>
         </div>
    )
} 