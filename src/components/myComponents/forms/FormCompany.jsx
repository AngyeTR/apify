
import { Field, Label } from '../../fieldset'
import { Heading } from '../../heading'
import { Input } from '../../input'
import { Button } from '../../button'
import { Select } from "../../select"
import { useEffect, useState } from 'react';
import { editCompany, getSegments } from '../../../services/API/api'
import { MyLoader } from '../MyLoader'
import { companyModel } from '../../../services/API/models'
import { adaptCompanymodel } from '../../../utils/adaptDataModel'

export function FormCompany(props) {
    const [loading, setloading] = useState(false)
    const [segment, setSegment]  = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [colorPrimary, setColorPrimary] = useState("");
    const [colorSecondary, setColorSecondary] = useState("");
    const [segments, setSegments] = useState(null)
    const rawData = window.localStorage.getItem("data")
    const stored = JSON.parse(rawData)

    useEffect(() => {
      getSegments().then((res) => {
        setSegments(res.data)})}, []);
    
    let dataSet = companyModel
      const handleChange = (e) => {
        const { name, value } = e.target;
        dataSet[name] = value
        name == "principalColor" ? setColorPrimary(value): name == "secondaryColor" && setColorSecondary(value)
        };

    const handleSave= async()=>{
      setloading(true)
      const cleanData = adaptCompanymodel(dataSet, segment)
      await editCompany(cleanData)
      console.log(cleanData)
      setloading(false)
      props.handleClick()
    }
  return (
    <>
    <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10 my-5">
      <Heading>Información de la Tienda</Heading>
    </div>
    <Field>
      <Label>Nombre de Tienda</Label>
      <Input name="full_name"  disabled value={stored.company.name}/>
      <Label>Id Tienda</Label>
      <Input name="id"  disabled value={stored.company.id}/>
      <Label>Segmento*</Label>
      <Select name="Segmento" onChange={(e)=> setSegment(JSON.parse(e.target.value))}>
        <option value="">Selecciona una opcion</option>
        {
          segments && segments.map((segment)=> <option value={JSON.stringify(segment)} key={segment.name}>{segment.name}</option>)
        }
      </Select>
      <Label for="favcolor">Selecciona el color primario:</Label>
      <input type="color" name="principalColor"  value={colorPrimary} onChange={handleChange} className='my-2 block  w-50'/> 
      <Label for="favcolor">Selecciona el color secundario:</Label>
      <input type="color" value={colorSecondary} className='block  w-50 my-2' name='secondaryColor'  onChange={handleChange} />
    <Button onClick={handleSave} disabled={segment.length ==0 } className="my-10 mr-2" >
      {loading ? <MyLoader /> : "Guardar"}</Button>     
 </Field>
    </> 
  )
}