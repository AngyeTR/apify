import { useEffect, useState } from "react"
import { Heading } from "../../../../shared/components/uikit/heading"
import { Input } from "../../../../shared/components/uikit/input"
import { Select } from "../../../../shared/components/uikit/select"
import { getByCompanyId } from "../../../../shared/services/API/api"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { Description, Fieldset, Label } from "../../../../shared/components/uikit/fieldset"

const colors = ["Azul", "Verde", "Rojo", "Amarillo", "Naranja"]
export const ProductStep = ({data, setData})=>{
    const [stored] = useLocalStorage("data")
    const [layouts, setLayouts] = useState(null)
    useEffect(()=>{getByCompanyId("Layouts", stored?.company.id).then(res=> setLayouts(res.data))},[])
   return (
     <div>
        <Heading>Producto</Heading>
        {console.log(layouts)}
        <Select onChange={(e)=>setData(prev => ({...prev, layout: e.target.value})) }>
            {layouts?.map(layout => <option value={layout.id}>{layout.name}</option>)}
        </Select>
        <Fieldset>
        <Label>Crear Precios</Label>
        <Input placeholder="Nombre del precio"/>
        <p>Por ejemplo: Combo 2, 2X1, superPromo, etc</p>
        <Input placeholder="Precio anterior"/>
        <p>Este precio se mostrará tachado</p>
        <Input placeholder="Precio Final"/>
        <Input placeholder="Tag"/>
        <Select >
            {colors.map(color=> <option value={color}>{color}</option>)}
        </Select>
      
        </Fieldset>
    </div>
   )
}