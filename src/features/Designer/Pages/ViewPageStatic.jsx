import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { GridContainer } from "../components/GridContainer"
import { Button } from "../../../shared/components/uikit/button"
import { getByCompanyId } from "../../../shared/services/API/api"
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage"

export const ViewPageStatic = ()=>{
    // useEffect(() => { getByCompanyId("Layouts", stored.user.company.id).then(res => setLayouts(res.data))}, []);
    const params = useParams()
    const nav = useNavigate()
    const [layout, setLayout] = useState(null) 
    const [color, setColor] = useState({backgroundColor: "#ffffff"}) 
    const [ layouts, setLayouts] = useState(null)
    const [stored] = useLocalStorage("data")

    const navigate= ()=>{
        nav(`/designer/editor/${params.id}`)
        nav(0)}  
    
    const data = {
        content: "[{'x':1,'y':1,'w':4,'h':2,'id':'title-2','content':'Kit de Herramientas 100 Pzas con Maletín para Hogar y Taller','style':{'fontSize':30,'color':'#f8f1f1','textAlign':'center','fontWeight':'bold'}},{'x':4,'y':3,'id':'text-3','content':'$229.900','style':{'textAlign':'left','fontSize':28,'color':'#f45d5d','fontWeight':'bold'}},{'x':1,'y':4,'w':4,'h':14,'id':'image-1','content':'https://acdn-us.mitiendanube.com/stores/005/852/447/products/ca20eda89d5b09697eab9a1024584653-cfb533de8da0d0b5df17417143163829-1024-1024.jpeg'},{'x':1,'y':18,'w':4,'h':4,'id':'text-0','content':'Este kit de herramientas 100 piezas con maletín es la solución ideal para cualquier tarea en el hogar o el taller. Diseñado para ofrecer máxima versatilidad y durabilidad, este juego de herramientas completo te permite afrontar desde pequeñas reparaciones hasta grandes proyectos de bricolaje','style':{'textAlign':'center','color':'#f5f0f0','fontSize':18}},{'x':2,'y':22,'w':2,'h':3,'id':'button-4','content':{'label':'Compra Ahora','url':'Compra ahora'},'style':{'fontFamily':'Poppins','color':'#e6e6db','backgroundColor':'#ee2f2f','fontWeight':'bold','fontSize':28}}]",
        styles: "{'backgroundColor':'#18181b'}"
    }

    useEffect(() => {
        const savedLayout = data.content?.replaceAll("'", "\"")
        const savedColor = data.styles?.replaceAll("'", "\"")
        savedColor && setColor(JSON.parse(savedColor))
        if (savedLayout) {
            const layout = JSON.parse(savedLayout);
            layout.forEach((item) => {
            setLayout(layout)})
            }
        }, [layouts]);


    return (
        <div className="w-[90vw]  justify-self-center" >
            <GridContainer canEdit={false} items={layout} layoutColor={color}/>
            {/* <Button className="mt-2" onClick={navigate}>Editar</Button> */}
        </div>
    )
}