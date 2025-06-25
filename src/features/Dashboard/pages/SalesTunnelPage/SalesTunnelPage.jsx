import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage";
import { GridContainer } from "../../../Designer/components/GridContainer";
import { getByCompanyId, getByDomain, getByID } from "../../../../shared/services/API/api";
import { SalesWizard } from "../../components/salesWizard/SalesWizard";
import { useScrollCheckpoints } from "../../hooks/useScrollCheckPoints";
import { useReport } from "../../hooks/useReport";
import { useExit } from "../../hooks/useExit";
import { useScript } from "../../hooks/useScript";
import { getFbp } from "../../../../shared/services/cookies";

//Importante: Guardar 
export const SalesTunnelPage = ()=> {
    useExit()
    useScrollCheckpoints(10)
    const { reportView} = useReport()
    const params = useParams()
    const nav = useNavigate()
    const [layout, setLayout] = useState(null) 
    const [data, setData] = useState(null) 
    const [color, setColor] = useState({backgroundColor: "#ffffff"}) 
    const [ layouts, setLayouts] = useState(null)
    const [stored] = useLocalStorage("data")
    const [store, setStore] = useLocalStorage("store", null)
    const [grid, setGrid] = useState()
    const [ fbPixel, setFbPixel] = useState(null)
    const location = window.location
    useScript(fbPixel)
    useEffect(()=>{
        const host = location.hostname
        getByDomain(host == "localhost" || host == "apify-livid.vercel.app" ? "store.apify.com.co": host).then(res=>  {setStore({idStore: res.data.id, idCompany: res.data?.idCompany});
        getByCompanyId("Layouts", store.idCompany).then(res => setLayouts(res.data))})
        getByID("SalesTunnel", params.tunnel).then(res=> {setData(res.data);
            setFbPixel(res.data.facebookPixel)
        })
        reportView("fbp")},[])
 
    // useEffect(()=>{fbPixel && useScript(fbPixel)},[fbPixel])
    useEffect(() => {
        const layoutOBJ = layouts?.filter(item => item.id == params.tunnel)
        const savedLayout = layoutOBJ?.[0]?.content?.replaceAll("'", "\"")
        const savedColor = layoutOBJ?.[0]?.styles?.replaceAll("'", "\"")
        savedColor && setColor(JSON.parse(savedColor))
        if (savedLayout) {
            const layout = JSON.parse(savedLayout);
            layout.forEach((item) => {
            setLayout(layout)})}
        }, [layouts]);
    
    const handleClickInCOmponent = (id)=>{console.log("Click en ", id)}
    
    return (
         <div className="w-screen container mx-auto justify-self-center justify-center pb-5" style={{backgroundColor: color?.["backgroundColor"],  
              backgroundImage: `url('${color?.["backgroundImage"]}')`,  backgroundSize: 'cover',
              backgroundPosition: 'center', repeat: "no-repeat",  backgroundBlendMode: 'multiply' }} >
            <div className="w-[90vw] sm:w-[70vw] m-0 p-0  justify-self-center justify-items-center" >
               <GridContainer canEdit={false} items={layout}  setGrid={setGrid} handleClickInCOmponent={handleClickInCOmponent}/>
                <SalesWizard data={data}/>
            </div>
         </div>)} 