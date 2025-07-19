import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage";
import { GridContainer } from "../../../Designer/components/GridContainer";
import { getByCompanyId, getByDomain, getByID, postNavigation } from "../../../../shared/services/API/landingApi";

//Importante: Guardar 
export const LayoutPage = ()=> {
    const params = useParams()
    const [layout, setLayout] = useState(null) 
    const [data, setData] = useState(null) 
    const [color, setColor] = useState({backgroundColor: "#ffffff"}) 
    const [ layouts, setLayouts] = useState(null)
    const [store, setStore] = useLocalStorage("store", null)
    const [grid, setGrid] = useState()
    const location = window.location

    useEffect(()=>{
        const host = location.hostname
        getByDomain(host == "localhost" ||  host == "apify-livid.vercel.app" ? "store.apify.com.co": host).then(res=>  {setStore({idStore: res.data.id, idCompany: res.data?.idCompany});
        getByCompanyId("Layout", res.data?.idCompany).then(res => setLayouts(res.data))})
        },[])
    
    useEffect(() => {
        const layoutOBJ = layouts?.filter(item => item.id == params.layout)
        const savedLayout = layoutOBJ?.[0]?.content?.replaceAll("'", "\"")
        const savedColor = layoutOBJ?.[0]?.styles?.replaceAll("'", "\"")
        savedColor && setColor(JSON.parse(savedColor))
        if (savedLayout) {
            const layout = JSON.parse(savedLayout);
            layout.forEach((item) => {
            setLayout(layout)})}
        }, [layouts]);
    

    return (
         <div className="w-screen container mx-auto justify-self-center justify-center pb-5" style={{backgroundColor: color?.["backgroundColor"],  
              backgroundImage: `url('${color?.["backgroundImage"]}')`,  backgroundSize: 'cover',
              backgroundPosition: 'center', repeat: "no-repeat",  backgroundBlendMode: 'multiply' }} >
            <div className="w-[90vw] sm:w-[70vw] m-0 p-0  justify-self-center justify-center justify-items-center" >
               <GridContainer canEdit={false} items={layout}  setGrid={setGrid} />
            </div>
         </div>)} 