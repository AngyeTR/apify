
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { LayoutsTable } from "../components/LayoutsTable"
import { Divider} from "../../../shared/components/uikit/divider"
import { getByCompanyId } from "../../../shared/services/API/api";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import { DesignerManager } from "../components/DesignerManager";
import { MyLayout} from "../../Dashboard/components/myComponents/MyLayout"

export const HomePage = ()=>{
    const [layouts, setLayouts] = useState(null)
    const [products, setProducts] = useState(null)
    const [stored] = useLocalStorage("data")
    const nav = useNavigate()
    const tab = document.getElementById("myTable")
    const params = useParams()
    
    useEffect(() => { 
        getByCompanyId("Layouts", stored?.company.id).then(res => setLayouts(res.data))
        getByCompanyId("Products", stored?.company.id).then(res => setProducts(res.data))
    }, [, params]);
    return (
        <MyLayout >
        {(layouts && products) && <div className="w-full " >
            <DesignerManager products={products} layouts={layouts}/>
            <Divider />
            <LayoutsTable lay={layouts} prod={products}/>
        </div>}


        </MyLayout>
      
    )
}