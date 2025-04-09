import { useEffect } from 'react'
import { Switch } from '../../switch'
import { Field, Label } from '../../fieldset'
import { Heading } from '../../heading'
import { Input } from '../../input'
import { Button } from '../../button'
import { useState } from 'react';
import { MyLoader } from '../MyLoader'
import { userModel } from '../../../services/API/models'
import { adaptSalesmanModel,  } from '../../../utils/adaptDataModel'
import { postSalesman } from '../../../services/API/api'

export function FormSalesman(props) {
  const [loading, setloading] = useState(false)
  const [ava, setAva] = useState(false)
  const [error, setError] = useState(null)
  const [isActive, setIsActive] = useState(false)
  
//   useEffect(() => {
//       }, []);
        
   let dataSet = userModel
    const handleChange = (e) => {
      const { name, value } = e.target;
      dataSet[name] = value
      const dispo =  ((dataSet.name && dataSet.lastName && dataSet.email ) ? true : false) 
      setAva(dispo)
    };
    
  const handleSave= async()=>{
        setloading(true)
        setError(null)
        const cleanData = adaptSalesmanModel(dataSet, isActive)
        const res = await postSalesman(cleanData)
        setloading(false)
        res?.isValid ? props.handleClick() : setError(res?.errorMessages[0])
      }

  return (
    <>
    <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10 my-5">
      <Heading>Información del vendedor</Heading>
    </div>
    <Field>
      <Label>Nombre de vendedor*</Label>
      <Input name="name" onChange={handleChange} id="name"/>
      <Label>Apellido de Vendedor*</Label>
      <Input name="lastName"  onChange={handleChange} id="last name"/>
      <Label className="block my-5" >Vendedor Activo <Switch checked={isActive} onChange={setIsActive} /> </Label>
      <Label>Email*</Label>
      <Input type="email" name="email"  onChange={handleChange} id="email"/>
      <p className={`text-red-600 pt-5 ${error ? "visible" : "invisible"}`}>Ups! Algo salió mal: {error}</p>  
    <Button onClick={handleSave} className="my-10 mr-2" 
    disabled={!ava}>
      {loading ? <MyLoader /> : "Guardar"}</Button>     
    </Field>
    </>
  )
}
