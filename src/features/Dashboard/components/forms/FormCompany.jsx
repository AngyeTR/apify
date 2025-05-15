
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

export function FormCompany(props) {
    const [loading, setloading] = useState(false)
    const [error, setError] = useState(false)
    const [model, setModel] = useState(false)
    const [segment, setSegment]  = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [base64, setBase64] = useState("")
    const [colorPrimary, setColorPrimary] = useState("");
    const [colorSecondary, setColorSecondary] = useState("");
    const [segments, setSegments] = useState(null)
    const [stored, setStored] = useLocalStorage("data", null)

    const upLoadImage = async (value)=> 
      {const url = URL.createObjectURL(value)
        setImgUrl(url)
        let base64 = null
        try {
          base64 = await getBase64(value).then(res => {return res})
          setBase64( base64)
        } catch (error) {console.log(error) } }
       
    let dataSet = model
    useEffect(() => {
      getSegments().then((res) => {setSegments(res.data)})
      getByID("Companies", stored.company.id).then((res) => {setModel(res.data)})}, [imgUrl]);
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      dataSet[name] = value
      name == "principalColor" ? setColorPrimary(value): name == "secondaryColor" && setColorSecondary(value)
      };
   const updateCompany=  async ( data)=>{
        const info =  getUpdatedLocalData(stored, data)
        await setStored(info)}

    const handleSave= async()=>{
      setloading(true)
      setError(null)
      const cleanData = await adaptCompanymodel(dataSet, props.origin, segment, base64)
      const res = await edit("Companies", cleanData)
      setloading(false)
      res.data?.isValid  && await updateCompany(cleanData) 
      res.data?.isValid ? props.handleClick() : setError("Por favor revise que todos los campos sean correctos")
    }
  return (
    <>
    <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10 my-5">
      <Heading>Información de la Tienda</Heading>
    </div>
    <Field>
      <Label>Nombre de Tienda</Label>
      <Input name="name"  placeholder={dataSet.name} onChange={handleChange}/>
      <Label>Segmento*</Label>
      <Select name="Segmento" onChange={(e)=> setSegment(JSON.parse(e.target.value))}>
        <option value={dataSet.idSegment}>Selecciona una opcion</option>
        {segments && segments.map((segment)=> <option value={JSON.stringify(segment)} key={segment.name}>{segment.name}</option>)}
      </Select>
      <Label for="favcolor">Selecciona el color primario:</Label>
      <input type="color" name="principalColor"  value={dataSet.principalColor ? dataSet.principalColor : colorPrimary} onChange={handleChange} className='my-2 block  w-50'/> 
      <Label for="favcolor">Selecciona el color secundario:</Label>
      <input type="color" value={dataSet.secondaryColor ? dataSet.secondaryColor :colorSecondary} className='block  w-50 my-2' name='secondaryColor'  onChange={handleChange} />
      <Label>Imagen de Tienda</Label>
      <input accept="image/*" type="file" multiple className='w-50 my-2 mx-2 h-8 bg-white shadow-sm border border-gray-400  rounded-md'
     onChange={(e)=> upLoadImage(e.target.files[0])} />
      <img   className={` ${imgUrl ? "h-30 visible" : "invisible"}`} src={imgUrl} alt=""/>
      <p className={`text-red-600 pt-5 ${error ? "visible" : "invisible"}`}>Ups! Algo salió mal: {error}</p>  
    <Button onClick={handleSave} disabled={segment.length ==0 } className="my-10 mr-2" >
      {loading ? <MyLoader /> : "Guardar"}</Button>     
 </Field>
    </> 
  )}