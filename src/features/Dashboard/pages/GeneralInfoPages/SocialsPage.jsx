import { useEffect, useState } from "react"
import { FaFacebook, FaTiktok  } from "react-icons/fa";
import { MyLayout } from "../../components/myComponents/MyLayout"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { Heading } from "../../../../shared/components/uikit/heading"
import { Loader } from "../../../../shared/components/Loader"
import { Field, Label } from "../../../../shared/components/uikit/fieldset"
import { Input } from "../../../../shared/components/uikit/input"
import { Button } from "../../../../shared/components/uikit/button"
import { adaptPixelModel } from "../../utils/adaptDataModel"
import { pixelModel } from "../../utils/models"
import { post, edit as update, getByCompanyId } from "../../../../shared/services/API/api"
import { useNavigate } from "react-router-dom"
import { Textarea } from "../../../../shared/components/uikit/textarea";
import { BiNetworkChart } from 'react-icons/bi'

export const SocialsPage = ()=>{
    const [stored] = useLocalStorage("data")
    const [pixels, setPixels] = useState(null)
    const [ pixel, setPixel] = useState({})
    const [loading, setLoading] = useState(false)
    const [edit, setEdit] = useState(null)
    const nav= useNavigate()

    const PixelForm = ()=>{
        return (
            <Field className="mx-10">
                <Label>Pixel: </Label>
                <Input defaultValue={edit?.pixelId && edit?.pixelId } placeholder="Ingrese El Pixel"  onChange={(e)=>setPixel(prev=>({...prev, pixelId: e.target.value}))} className="max-w-md mb-3"/>
                <Label>Token de Acceso</Label>
                <Input placeholder="Ingrese el Access Token" onChange={(e)=>setPixel(prev=>({...prev, accessToken: e.target.value}))} className="max-w-md mb-3"/>
                <Label>Descripción de uso/propósito del Pixel</Label>
                <Textarea defaultValue={edit?.description && edit.description} placeholder="Ingrese Descripción" onChange={(e)=>setPixel(prev=>({...prev, description: e.target.value}))} className="max-w-md mb-3"/>
                <Label>Plataforma</Label>
                <select className="my-3 border border-zinc-300 px-2 py-1 rounded-lg mx-4" onChange={(e)=>setPixel(prev=>({...prev, plattform: e.target.value}))}>
                    <option>Seleccione una plataforma</option>
                    <option value={1} selected={edit?.plattform == 1}>Facebook</option>
                    <option value={2} selected={edit?.plattform == 2}>Tiktok</option>
                </select>
            </Field>)
    } 

    useEffect(()=>{setLoading(true)
        getByCompanyId("CompaniesPixel", stored.company.id).then(res=> setPixels(res.data)).finally(()=>setLoading(false))},[])

    const handlePixel = async (action)=>{
        setLoading(true)
        const initialData = action == "create" ? pixelModel: edit
        const data = adaptPixelModel(initialData, pixel)
        action == "create" ? await post("CompaniesPixel", data).then(res=>console.log(res.data)).finally(()=>nav(0)):
        await update("CompaniesPixel", data).then(res=>console.log(res.data)).finally(()=>nav(0))
    }

    return (
        <MyLayout>
        <Heading>Pixels</Heading>
        {loading ? <div className="place-self-center mt-5"><Loader /></div> : 
        <ul className="mt-10">
            <li className="border border-zinc-400 rounded-lg m-2" key="nuevo" >
                <div className="flex flex-row content-center items-center" onClick={()=>{setEdit(null)}}>
                    <BiNetworkChart className="mx-3"/><h2 className="font-semibold my-3 row hover:underline cursor-pointer"> Añadir nuevo Pixel</h2>
                </div>
                {edit == null && PixelForm()}
                {edit == null&&<Button className="my-3 mx-10"  onClick={()=>handlePixel("create")}> Guardar Nuevo Pixel</Button>}
            </li>
            {pixels?.map(pixel=><li className="border border-zinc-400 rounded-lg m-2" key={pixel.id} >
                <div className="flex flex-row content-center items-center" onClick={()=>{setEdit(pixel); setPixel(pixel); }}>
                    {pixel.plattform == 1 ? <FaFacebook className="mx-3"/> : <FaTiktok className="mx-3"/>}
                    <h2 className="font-semibold my-3 row hover:underline cursor-pointer"> {pixel.pixelId}</h2>
                </div>
                {edit?.id == pixel.id && PixelForm()}
                {edit?.id == pixel?.id &&<Button className="my-3 mx-10" onClick={()=>handlePixel("edit")}>Guardar Cambios</Button>} 
            </li>)}
        </ul>}
        </MyLayout>
    )
}