import { useEffect,  useState } from 'react'
import { Field, Label } from '../../../../shared/components/uikit/fieldset'
import { Heading } from '../../../../shared/components/uikit/heading'
import { Input } from '../../../../shared/components/uikit/input'
import { Button } from '../../../../shared/components/uikit/button'
import { MyLoader } from "../myComponents/MyLoader"
import { campaignModel, } from "../../utils/models"
import { useNavigate, useParams } from 'react-router-dom'


export function FormCampaign(props) {
  const params = useParams()
  
     const nav = useNavigate()
   useEffect(() => {setDataSet(campaignModel)}, [ ]);
  const [dataSet, setDataSet] = useState(null)
  const [loading, setloading] = useState(false)
  const [ava, setAva] = useState(props.origin == "editor" ? true : false)
  const [error, setError] = useState(null)
       
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataSet(prev => ({...prev, [name]: value}))
    const dispo =  props.origin == "editor" ? true :((dataSet.name && dataSet.startDate && dataSet.endDate )) 
    setAva(dispo)};
    
  const handleSave= async()=>{
       console.log("añadido")
       nav(-1)
      }

  return (
    <>
    {/* <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 mt-5">
      <Heading>Información de la Campaña</Heading>
      {props.origin == "editor" && <Button onClick={()=> nav(`/dashboard/${params.module}/tunnels/${1}`)} >Ver Tuneles de venta</Button>}
    </div>
    {console.log(dataSet)} */}
    <Field>
      <Label>Nombre de la campaña*</Label>
      <Input name="name" placeholder={dataSet?.name && dataSet.name} onChange={handleChange} id="name"/>
      <Label>Fecha de Inicio*</Label>
      <Input  type="datetime-local" name="startDate" onChange={handleChange}/>
      <Label>Fecha de Fin*</Label>
      <Input  type="datetime-local"  name="endDate" onChange={handleChange}/>
      <p className={`text-red-600 pt-5 ${error ? "visible" : "invisible"}`}>Ups! Algo salió mal: {error}</p>  
    <Button onClick={handleSave} className="my-10 mt-5 mr-2" 
    disabled={!dataSet?.name || !dataSet?.startDate || !dataSet?.endDate}>
      {loading ? <MyLoader /> : "Guardar"}</Button>     
    </Field>  
    </>
  )
}
