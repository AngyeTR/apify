import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage";
import { GridContainer } from "../../../Designer/components/GridContainer";
import { getByCompanyId, getByDomain, getByID, postNavigation } from "../../../../shared/services/API/landingApi";
import { SalesWizard } from "../../components/salesWizard/SalesWizard";
import { useScrollCheckpoints } from "../../hooks/useScrollCheckPoints";
import { useReport } from "../../hooks/useReport";
import { useExit } from "../../hooks/useExit";
import { useScript } from "../../hooks/useScript";
 import { v4 as uuidv4 } from 'uuid';
import { adaptNavigationModel } from "../../utils/adaptDataModel";
import { navigationModel } from "../../utils/models";

export const SalesTunnelPage = ()=> {
    const [uuid] = useState(uuidv4())
    const { reportView} = useReport()
    const params = useParams()
    const nav = useNavigate()
    const [layout, setLayout] = useState(null) 
    const [data, setData] = useState(null) 
    const [color, setColor] = useState({backgroundColor: "#ffffff"}) 
    const [ layouts, setLayouts] = useState(null)
    const [store, setStore] = useLocalStorage("store", null)
    const [policies, setpolicies] = useLocalStorage("policies", null)
    const [grid, setGrid] = useState()
    const [ fbPixel, setFbPixel] = useState(null)
    const location = window.location
    useExit("", uuid, data?.layouts?.[0]?.id)
    useScript(fbPixel)

    useEffect(()=>{
        const host = location.hostname
        getByDomain(host == "localhost" ||  host == "apify-livid.vercel.app" ? "store.apify.com.co": host).then(res=>  {
        setStore({idStore: res.data.id, idCompany: res.data?.idCompany});
        // getByDomain(host == "localhost" || host == "apify-livid.vercel.app" ? "store.apify.com.co": host).then(res=>  {setStore({idStore: 3, idCompany: 3});
        // getByCompanyId("Layout", 3).then(res => setLayouts(res.data))})
        getByID("Company", res.data?.idCompany).then(rta=> rta?.data?.policies?.[0] && setpolicies({min: rta?.data?.policies?.[0]?.minimalValue, mid: rta?.data?.policies?.[0]?.mediumValue}))
        getByCompanyId("Layout", res.data?.idCompany).then(res => setLayouts(res.data))})
        getByID("SalesTunnel", params.tunnel).then(res=> {setData(res.data);
        setFbPixel(res.data.facebookPixel)
        })
        reportView(params.tunnel)},[])
        useScrollCheckpoints(10, uuid, data?.layouts?.[0]?.idLayout)

    useEffect(() => {
        // const layoutOBJ = layouts?.filter(item => item.id == params.tunnel)
        const layoutOBJ = layouts?.filter(item => item.id == data?.layouts?.[0]?.idLayout)
        const savedLayout = layoutOBJ?.[0]?.content?.replaceAll("'", "\"")
        const savedColor = layoutOBJ?.[0]?.styles?.replaceAll("'", "\"")
        savedColor && setColor(JSON.parse(savedColor))
        if (savedLayout) {
            const layout = JSON.parse(savedLayout);
            layout.forEach((item) => {
            setLayout(layout)})}
        }, [layouts]);
    
    const handleClickInCOmponent = async (id, uuid)=>{
        const adaptedModel = adaptNavigationModel(navigationModel,  id, data?.layouts?.[0]?.id, uuid, 0, 0, 2)
        await postNavigation(adaptedModel).then(res=> console.log(res))
    }
    
    return (
         <div className="w-screen container mx-auto justify-self-center justify-center pb-5" style={{backgroundColor: color?.["backgroundColor"],  
              backgroundImage: `url('${color?.["backgroundImage"]}')`,  backgroundSize: 'cover',
              backgroundPosition: 'center', repeat: "no-repeat",  backgroundBlendMode: 'multiply' }} >
            <div className="w-[90vw] sm:w-[70vw] m-0 p-0  justify-self-center justify-center justify-items-center" >
               <GridContainer canEdit={false} items={layout}  setGrid={setGrid} handleClickInCOmponent={handleClickInCOmponent} uuid={uuid}/>
                {console.log(data)}
                <SalesWizard data={data} uuid={uuid}/>
            </div>
         </div>)} 