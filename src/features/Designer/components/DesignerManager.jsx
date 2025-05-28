import { useNavigate } from "react-router-dom";
import { Button } from "../../../shared/components/uikit/button"
import { Fieldset, Label } from "../../../shared/components/uikit/fieldset";
import { Input } from "../../../shared/components/uikit/input";
import { Select } from "../../../shared/components/uikit/select";
import { useState } from "react";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import { cloneLayoutModel, newLayoutModel } from "../utils/models";
import { cloneLayout, post } from "../../../shared/services/API/api";

export const DesignerManager = ({products, layouts})=> {
    const nav = useNavigate()
    const [stored] = useLocalStorage("data")
    const [newLayout, setNewLayout] = useState(newLayoutModel(stored))
    const [clonedLayout, setClonedLayout] = useState(cloneLayoutModel(stored))

    const clone = async () =>{
        const res = await cloneLayout(clonedLayout).then(res=>res)
        res.isValid && nav(0)
    }

    const create = async ()=> {
        const res = await post("Layouts", newLayout).then(res=>res)
        res.isValid && nav(0)
    }


    return (
        <div className="justify-items-start">
                <Fieldset className="grid grid-cols-5 gap-1  w-full m-6 max-w-xl">
                <Input className="col-span-2 h-fit mt-6 " placeholder=" Nombre del Layout" onChange={e=> setNewLayout(prev => ({...newLayout, "name": e.target.value}))}/>
                <Select  className="col-span-2" onChange={e=> setNewLayout(prev=> ({...prev, "idProduct": parseInt(e.target.value)}))}>
                    <option>Seleccione un Producto</option>
                    {products?.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}
                </Select>
                <Button className="h-fit mt-6 " onClick={create}>Crear </Button>
            </Fieldset>
             <Fieldset className="grid grid-cols-5 gap-1 max-w-xl  w-full m-6">
                <Select  className="col-span-2" onChange={e=> setClonedLayout(prev=>({...prev, "id": parseInt(e.target.value)}))}>
                    <option>Seleccione un Layout</option>
                    {layouts?.map(layout => <option key={layout.id} value={layout.id}>{layout.name}</option>)}
                </Select>
                <Button className="h-fit" onClick={clone}>Clonar </Button>
            </Fieldset>
             <Button onClick={()=>nav("/designer/resources")} className="h-fit mb-6 mx-6 justify-self-start justifyself-left">Ver recursos </Button>
            </div>
    )
}