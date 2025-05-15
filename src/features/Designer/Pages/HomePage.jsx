import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { GridContainer } from "../components/GridContainer"
import { Button } from "../../../shared/components/uikit/button"

export const HomePage = ()=>{
    const nav = useNavigate()
    const [layout, setLayout] = useState(null) 
    const [color, setColor] = useState({backgroundColor: "#ffffff"}) 
    
    const navigate= ()=>{
        nav("/designer/editor")
        nav(0)}  
    useEffect(() => {
        const savedLayout = localStorage.getItem("grid-layout");
        const savedColor = localStorage.getItem("grid-color")
        console.log(savedColor)
        savedColor && setColor(JSON.parse(savedColor))
        if (savedLayout) {
            const layout = JSON.parse(savedLayout);
            layout.forEach((item) => {
            setLayout(layout)})
            }}, []);
    return (
        <div className="w-[90vw]  justify-self-center mt-5" >
            <GridContainer canEdit={false} items={layout} layoutColor={color}/>
            <Button className="mt-2" onClick={navigate}>Editar</Button>
        </div>
    )
}