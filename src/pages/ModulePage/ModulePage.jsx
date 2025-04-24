import { MyLayout } from "../../components/myComponents/MyLayout"
import { useParams,  useNavigate,  } from "react-router-dom"
import { MyTable } from "../../components/myComponents/MyTable"
import { getIsTable, getModuleId, getTranslate } from '../../utils/functions'
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { useEffect, useState } from "react"
import { getByCompanyId} from "../../services/API/api";
import { MyGeneralInfo } from "../../components/myComponents/MyGeneralInfo"

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
        params.option ? ( getIsTable(params.option) && getByCompanyId(parameter, stored.company.id).then((res) => {setData(res)}) ) :
        (firstOption ?  nav(`/${params.module}/${firstOption}`): nav("/not-found"))
    }, [,params])
console.log(data)
    
    return (
        <MyLayout >  
        {getIsTable(params.option) ? <MyTable data={data} /> : (params.option == "general" && <MyGeneralInfo />)}
    </MyLayout>)
}