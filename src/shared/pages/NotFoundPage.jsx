import { MyLayout } from "../../features/Dashboard/components/myComponents/MyLayout"
import { Heading } from "../components/uikit/heading"

export const NotFoundPage =({logged})=>{
    return (
        <>{logged ?  <MyLayout><div className="w-full h-[40vh] content-center justify-items-center "><Heading>Sitio no encontrado</Heading></div></MyLayout> 
        : <div className="w-full h-[40vh] content-center justify-items-center "><Heading>Sitio no encontrado</Heading></div>
        }</>
    
    )
}