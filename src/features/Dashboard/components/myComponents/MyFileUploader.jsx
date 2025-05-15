import { useEffect, useState } from "react";
import { Field, Label } from "../../../../shared/components/uikit/fieldset";
import { Button } from "../../../../shared/components/uikit/button";
import { Select } from "../../../../shared/components/uikit/select"
import { Heading } from "../../../../shared/components/uikit/heading";

export const MyFileUploader=()=>{
    const ENABLED_TYPES = ["csv", "pdf"]
    const uploadTypes = [{id: 1, name: "Stocks"}, {id: 2, name:"Precios"}, {id: 3, name:"Clientes"}]
    const [file, setFile] = useState(null)
    const [uploadType, setUploadType] = useState(null)
    const [enabled, setEnabled] = useState(null)
    
    const render = ()=>{
        if(enabled == "error"){
            return (
                <>
                    <p className="text-red-700 text-sm">Formato no compatible</p>
                    <p className="text-xs">Por favor verifique que el archivo tenga alguno de los siguientes formatos:</p>
                    <p className="text-xs italic mb-5">{ ENABLED_TYPES.map((type, index) => <span key={index}> | {type} |</span>)}</p>
                </>)}}

    useEffect(()=>{
        const type = file ? file?.split(".")[file?.split(".").length - 1 ] : null;
        ENABLED_TYPES.includes(type?.toLowerCase()) ? setEnabled("enabled") : (type != null ? setEnabled("error") : setEnabled(null))
        console.log( file, enabled, uploadType) 
    },[file, uploadType])
   
    const handleSubmit =  e =>{
        e.preventDefault();
    }

    return (
         <Field  >
            <Heading >Carga Masiva</Heading>
            <Select name="uploadType" onChange={(e)=> setUploadType(e.target.value)}>
                <option value={null}>Selecciona una opcion</option>
                {uploadTypes.map((type)=> <option value={type.id} key={type.id}>{type.name}</option>)}
            </Select>
            <input type="file" onChange={(e)=> setFile(e.target.value)} 
            className="relative block w-xs md:w-md border border-zinc-950/10 data-hover:border-zinc-950/20 dark:border-white/10 dark:data-hover:border-white/20     appearance-none rounded-lg px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)] text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white my-5"/>
            {render()}
            <Button href={`./plantilla${uploadType}.xls`} download className="mr-3"  disabled={uploadType == null}>Descargar Plantilla</Button>
            <Button  onClick={e=> handleSubmit(e)} disabled={enabled != "enabled" || uploadType == null}>Enviar</Button>
        </Field>  
    )

}
