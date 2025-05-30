
import { Field, Label } from '../../../../shared/components/uikit/fieldset'
import { Heading } from '../../../../shared/components/uikit/heading'
import { Input } from '../../../../shared/components/uikit/input'
import { Button } from '../../../../shared/components/uikit/button'
import { Select } from "../../../../shared/components/uikit/select"
import { useEffect, useState } from 'react';
import { edit, getByID,  getSegments } from '../../../../shared/services/API/api/'
import { MyLoader } from '../myComponents/MyLoader'
import { adaptCompanymodel } from '../../utils/adaptDataModel'
import {  getUpdatedLocalData } from '../../utils/functions' 
import { getBase64} from "../../../../shared/utils/utils"
import { useLocalStorage } from '../../../../shared/hooks/useLocalStorage'
import { Modal } from "../../../../shared/components/Modal"
import { CollectionSelector } from '../../../Designer/components/CollectionSelector'

export function FormCompany(props) {
    const [loading, setloading] = useState(false)
  const [error, setError] = useState(false)
  const [dataSet, setDataSet] = useState(false)
  const [imgUrl, setImgUrl] = useState("")
  const [base64, setBase64] = useState("")
  const [segments, setSegments] = useState(null)
  const [modalMode, setModalMode] = useState(null)
  const [fileOrigin, setFileOrigin] = useState(null)
  const [stored, setStored] = useLocalStorage("data", null)

    const upLoadImage = async (value)=> 
      {const url = URL.createObjectURL(value)
        setImgUrl(url)
        let base64 = null
        try {
          base64 = await getBase64(value).then(res => {return res})
          setBase64( base64)
        } catch (error) {console.log(error) } }
       
     useEffect(() => {
    getSegments().then((res) => {setSegments(res.data)})
    getByID("Companies", stored.company.id).then((res) => {setDataSet(res.data)})}, [imgUrl])
    
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataSet(prev=> ({...prev, [name] : value}))}
   const updateCompany=  async ( data)=>{
        const info =  getUpdatedLocalData(stored, data)
        await setStored(info)}

   const handleSave= async()=>{
    setloading(true)
    setError(null)
    const cleanData = await adaptCompanymodel(dataSet, props.origin, base64, fileOrigin)
    const res = await edit("Companies", cleanData).then(res=> res).catch(error=> console.log(error))
    setloading(false)
    res.isValid  && await updateCompany(cleanData)  
    res.isValid ? props.handleClick() : setError("Por favor revise que todos los campos sean correctos")}
console.log(base64)
  return (
    <>
    <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 my-5">
      <Heading>Información de la Tienda</Heading>
    </div>
    <Field>
      <Label>Nombre de Tienda</Label>
      <Input name="name"  placeholder={dataSet.name} onChange={handleChange}/>
      <Label>Segmento*</Label>
      <Select name="idSegment" onChange={handleChange}>
        <option value={dataSet.idSegment}>Selecciona una opcion</option>
        {segments && segments.map((segment)=> <option value={parseInt(segment.id)} key={segment.name}>{segment.name}</option>)}
      </Select>
      <Label for="favcolor">Selecciona el color primario:</Label>
      <input type="color" name="colorPrimary"  value={dataSet.colorPrimary} onChange={handleChange} className='my-2 block  w-50'/> 
      <Label for="favcolor">Selecciona el color secundario:</Label>
      <input type="color" value={dataSet.colorSecondary} className='block  w-50 my-2' name='colorSecondary'  onChange={handleChange} />
      <Label className="block">Imagen de Tienda</Label>
      <Button onClick={()=>setModalMode("external")}>Desde URL</Button>
      <Button onClick={()=>setModalMode("local")}>Desde mi equipo</Button>
      <Button onClick={()=>setModalMode("internal")}>Desde mis colecciones</Button>
    
      <img   className={` ${imgUrl ? "h-30 visible" : "invisible"}`} src={imgUrl} alt=""/>
      <p className={`text-red-600 pt-5 ${error ? "visible" : "invisible"}`}>Ups! Algo salió mal: {error}</p>  
    <Button onClick={handleSave} disabled={!dataSet?.segment } className="my-10 mr-2" >
      {loading ? <MyLoader /> : "Guardar"}</Button>     
 </Field>
    {modalMode && <Modal>
      <Field className="w-[90vw] h-[90vh] bg-zinc-50 p-5 m-3 rounded-lg shadow-xl border border-zinc-200 justify-items-center">
        <Heading>Selector de Imagen</Heading>
           {modalMode == "internal" ?  <CollectionSelector variable={base64} setVariable={setBase64} type="image"/> :
           modalMode=="external" && <div className='w-xl h-[200px] py-10  justify- items-center m-10'>
            <Label>Ingresar una URL de Imagen Externa</Label>
            <Input onChange={(e)=>setBase64(e.target.value)} className="my-6" placeholder="URL de Imagen"/>
           </div>}
           {modalMode == "local" && <div className='w-xl h-[200px] py-10  justify- items-center m-10'>
            <Label>Seleccionar un archivo desde el equipo</Label>
            <Input accept="image/*" type="file" multiple className='w-50 my-2 mx-2 h-8 bg-white shadow-sm border border-gray-400  rounded-md'
       onChange={(e)=> upLoadImage(e.target.files[0])} /> </div>}
            <Button  className="mx-1 my-2" onClick={()=>{setFileOrigin(modalMode) ;modalMode != "local" && setImgUrl(base64); setModalMode(null)}}>Guardar</Button>
            <Button className="mx-1 my-2" onClick={()=>{setModalMode(null); setBase64("")}}>Cancelar</Button>
      </Field>
      </Modal>}
    </> 
  )}