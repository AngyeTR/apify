import { useEffect,  useState } from 'react'
import { Switch } from "../../../../shared/components/uikit/switch"
import { Field, Label } from '../../../../shared/components/uikit/fieldset'
import { Heading } from '../../../../shared/components/uikit/heading'
import { Input } from '../../../../shared/components/uikit/input'
import { Button } from '../../../../shared/components/uikit/button'
import { MyLoader } from "../myComponents/MyLoader"
import { salesModel, userModel } from "../../utils/models"
import { adaptSalesmanModel,  } from '../../utils/adaptDataModel'
import { edit, getByID, post } from "../../../../shared/services/API/api"
import { validateEmail } from "../../../../shared/utils/utils"

export function FormSalesman(props) {
   useEffect(() => {
    props.origin == "editor" ?  getByID("Salesman", props.id).then(res => setDataSet(res.data)) : setDataSet(salesModel)
    props.origin == "editor" &&  getByID("Salesman",props.id).then(res => setIsActive(res.data.isActive))
   }, [ ]);
  const [dataSet, setDataSet] = useState(null)
  const [loading, setloading] = useState(false)
  const [ava, setAva] = useState(props.origin == "editor" ? true : false)
  const [error, setError] = useState(null)
  const [isActive, setIsActive] = useState(false)
       
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataSet(prev => ({...prev, [name]: value}))
    const dispo =  props.origin == "editor" ? true :((dataSet.name && dataSet.lastName && dataSet.email ) ? true : false) 
    setAva(dispo)};
    
  const handleSave= async()=>{
        setloading(true)
        setError(null)
        const verifyEmail = validateEmail(dataSet.email)
        if(verifyEmail) {
          setError(verifyEmail) 
          setloading(false)
        }else {
          const cleanData = adaptSalesmanModel(dataSet, props.origin,  isActive)
          const res = props.origin == "editor" ? await edit("Salesman",cleanData) :  await post("Salesman", cleanData)
          setloading(false)
          res?.isValid ? props.handleClick() : setError(res?.errorMessages[0])
        }
      }

  return (
    <>
    <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6   my-5">
      <Heading>Información del vendedor</Heading>
    </div>
     <Field className="max-w-lg">
      <Label>Nombre de vendedor*</Label>
      <Input name="name" placeholder={dataSet?.name && dataSet.name} onChange={handleChange} id="name"/>
      <Label>Apellido de Vendedor*</Label>
      <Input name="lastName" placeholder={dataSet?.lastName && dataSet.lastName}   onChange={handleChange} id="last name"/>
      <Label className="block my-5" >Vendedor Activo <Switch checked={isActive} onChange={setIsActive} /> </Label>
      <Label>Email*</Label>
      <Input type="email" name="email"  onChange={handleChange} id="email" placeholder={dataSet?.email && dataSet.email}/>
      <p className={`text-red-600 pt-5 ${error ? "visible" : "invisible"}`}>Ups! Algo salió mal: {error}</p>  
    <Button onClick={handleSave} className="my-10 mr-2" 
    disabled={!ava}>
      {loading ? <MyLoader /> : "Guardar"}</Button>     
    </Field>
    </>
  )
}
