
import { Field, Label } from '../../fieldset'
import { Heading } from '../../heading'
import { Input } from '../../input'
import { Button } from '../../button'
import { Select } from "../../select"
import { useState } from 'react';
import { postUser } from '../../../services/API/api'
import { MyLoader } from '../MyLoader'
import { userModel } from '../../../services/API/models'
import { adaptUserModel } from '../../../utils/adaptDataModel'

export function FormUser(props) {
  const [loading, setloading] = useState(false)
  const [ava, setAva] = useState(false)

   let dataSet = userModel
    const handleChange = (e) => {
      const { name, value } = e.target;
      dataSet[name] = value
      const dispo =  ((dataSet.idProfile && dataSet.firstName && dataSet.lastName && dataSet.email && dataSet.password) ? true : false) 
      setAva(dispo)
    };
    
  const handleSave= async()=>{
        setloading(true)
        const cleanData = adaptUserModel(dataSet)
        await postUser(cleanData)
        setloading(false)
        props.handleClick()
      }

  return (
    <>
    <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10 my-5">
      <Heading>Información del Usuario</Heading>
    </div>
    <Field>
      <Label>Nombre de Usuario*</Label>
      <Input name="firstName" onChange={handleChange} />
      <Label>Apellido de Usuario*</Label>
      <Input name="lastName"  onChange={handleChange}/>
      <Label>Perfil*</Label>
      <Select name="idProfile" onChange={handleChange}>
        <option value="">Selecciona una opcion</option>
        <option value="1">Administrador</option>
        <option value="2">Vendedor</option>
        <option value="3">Marketing</option>
      </Select>
      <Label>Email*</Label>
      <Input type="email" name="email"  onChange={handleChange}/>
      <Label>Contraseña*</Label>
      <Input type="password" name="password"  onChange={handleChange}/>
      <Label>Avatar</Label>
      <Input type="avatar" name="password"  onChange={handleChange}/>
    <Button onClick={handleSave} className="my-10 mr-2" 
    disabled={!ava}>
      {loading ? <MyLoader /> : "Guardar"}</Button>     
    </Field>
    </>
  )
}
