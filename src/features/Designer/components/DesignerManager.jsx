import { useNavigate } from "react-router-dom";
import { Button } from "../../../shared/components/uikit/button"
import { Combobox, ComboboxLabel, ComboboxOption } from '../../../shared/components/uikit/combobox'
import { Fieldset } from "../../../shared/components/uikit/fieldset";
import { Input } from "../../../shared/components/uikit/input";
import { useState } from "react";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import { newLayoutModel } from "../utils/models";
import { Loader} from "../../../shared/components/Loader"
import { post } from "../../../shared/services/API/api";

export const DesignerManager = ({products, layouts})=> {
    const nav = useNavigate()
    const [stored] = useLocalStorage("data")
    const [newLayout, setNewLayout] = useState(newLayoutModel(stored))
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const create = async ()=> {
        const res = await post("Layouts", newLayout).then(res=>res)
        setLoading(true)
        res.isValid && setSuccess(true)
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSuccess(false)
        setLoading(false)
        res.isValid && nav(0)}

    return (
        <div className="w-full justify-items-start flex-wrap sm:grid sm:grid-cols-4 gap-0">
            <div className="col-span-3 "><Fieldset className="grid  grid-cols-5 gap-1  w-full  max-w-xl">
            <Input className="col-span-2 h-fit mt-6 " placeholder=" Nombre del Layout" onChange={e=> setNewLayout(prev => ({...newLayout, "name": e.target.value}))}/>
            <Combobox name="product" options={products ? products : []} displayValue={(product) => product?.name} className="col-span-2"
                onChange={e=> e && setNewLayout(prev=> ({...prev, "idProduct": parseInt(e.id), "idName": e.name}))}  placeholder={newLayout ? newLayout.idName :"Seleccionar Producto"}>
            {(product) => (
                <ComboboxOption value={product}>
                    <ComboboxLabel>{product.name}</ComboboxLabel>
                </ComboboxOption>)}
            </Combobox>
            <Button className="h-fit mt-6 " onClick={create} disabled={!newLayout.idProduct || !newLayout.name}>{loading ? <Loader/> : "Crear" }</Button>
            {success && <p className="text-green-600"> Layout Creado</p>}
            {products.length == 0 && <p className="w-lg">Aun no tienes Productos para vincular a un Layout</p>}
            </Fieldset></div>
            <div className="col-span-1 flex justify-end items-center w-full "> <Button onClick={()=>nav("/designer/resources")} className="h-fit  ml-6 mt-6 justify-self-start justifyself-left">Ver recursos </Button></div>
            </div>
    )}