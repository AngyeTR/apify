import { MyLayout } from "../../components/myComponents/MyLayout"
import { useParams,  useNavigate,  } from "react-router-dom"
import { MyTable } from "../../components/myComponents/MyTable"
import { getIsTable, getModuleId, getTranslate } from '../../utils/functions'
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { useEffect, useState } from "react"
import { getByCompanyId} from "../../../../shared/services/API/api/";
import { MyGeneralInfo } from "../../components/myComponents/MyGeneralInfo"
// import { MyCampaignsTable } from "../../components/myComponents/myCampaignsTable"

export const ModulePage =()=> {
    const params = useParams()
    const parameter = params.option && params.option[0]?.toUpperCase() + params.option?.substring(1)
    const nav = useNavigate()
    const [data, setData] = useState([])
    const name = getModuleId(params.module)?.name
    const modules = useLocalStorage("alteredModules")?.[0]
    const stored = useLocalStorage("data")?.[0]
    const firstOption= getTranslate(modules[name]?.options[0]?.toLowerCase())
    
    useEffect(() => {
        params.option ? ( params.option != "tunnels") && ( getIsTable(params.option) && getByCompanyId(parameter, stored?.company.id).then((res) => {setData(res.data)}) ) :
        (firstOption ?  nav(`/dashboard/${params.module}/${firstOption}`): nav("/dashboard/not-found"))
    }, [,params])
    
    return (
        <MyLayout >  
        {getIsTable(params.option) ? <MyTable data={data} /> : (params.option == "general" && <MyGeneralInfo />)}
    </MyLayout>)
}