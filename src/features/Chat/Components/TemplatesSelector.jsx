import { useState } from "react";
import { Combobox, ComboboxLabel, ComboboxOption } from "../../../shared/components/uikit/combobox"

const templates = [
    {id:1, title: "Bienvenida"},
    {id:2, title: "Presentación Producto 1"},
    {id:3, title: "Despedida"},
    {id:4, title: "Presentación Producto 2"},
    {id:5, title: "Presentación Producto 3"},
    {id:6, title: "Métodos de Pago"},
    {id:7, title: "Métodos de envío"},
    {id:8, title: "Tratamiento de datos"},
]


export const TemplatesSelector = ()=> {
    const [ template, setTemplate] = useState(null)
    return (
        <div className="w-full mt-2">
            {console.log(template)}
             <Combobox name="template" options={templates} displayValue={(template) => template?.title} 
                onChange={(e)=> { e && setTemplate(e)}} placeholder={"Plantilla"}>
                {(template) => (
                <ComboboxOption value={template}>
                <ComboboxLabel>{template.title}</ComboboxLabel>
                </ComboboxOption>)}
            </Combobox>
        </div>
    )}