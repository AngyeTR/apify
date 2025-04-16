import { useEffect } from 'react'
import { Switch } from '../../switch'
import { Field, Label } from '../../fieldset'
import { Heading } from '../../heading'
import { Input } from '../../input'
import { Button } from '../../button'
import { useState } from 'react';
import { MyLoader } from '../MyLoader'
import { salesModel, userModel } from '../../../services/API/models'
import { adaptSalesmanModel,  } from '../../../utils/adaptDataModel'
import { edit, getByID, post } from '../../../services/API/api'
import { validateEmail } from '../../../utils/functions'

export function FormSalesman(props) {
  useEffect(() => {
    props.origin == "editor" ?  getByID("Salesman", props.id).then(res => setModel(res)) : setModel(salesModel)
    props.origin == "editor" &&  getByID("Salesman",props.id).then(res => setIsActive(res.isActive))
   }, [ ]);
  const [model, setModel] = useState(null)
  const [loading, setloading] = useState(false)
  const [ava, setAva] = useState(props.origin == "editor" ? true : false)
  const [error, setError] = useState(null)
  const [isActive, setIsActive] = useState(false)
  let dataSet = model
  console.log(dataSet)
       
    const handleChange = (e) => {
      const { name, value } = e.target;
      dataSet[name] = value
      const dispo =  props.origin == "editor" ? true :((dataSet.name && dataSet.lastName && dataSet.email ) ? true : false) 
      setAva(dispo)
    };
    
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
    <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10 my-5">
      <Heading>Información del vendedor</Heading>
    </div>
    <Field>
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
