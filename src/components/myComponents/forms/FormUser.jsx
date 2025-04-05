import { useEffect } from 'react'
import { Field, Label } from '../../fieldset'
import { Heading } from '../../heading'
import { Input } from '../../input'
import { Button } from '../../button'
import { Select } from "../../select"
import { useState } from 'react';
import { getProfiles, postUser } from '../../../services/API/api'
import { MyLoader } from '../MyLoader'
import { userModel } from '../../../services/API/models'
import { adaptUserModel } from '../../../utils/adaptDataModel'

export function FormUser(props) {
  const [loading, setloading] = useState(false)
  const [ava, setAva] = useState(false)
  const [profiles, setProfiles] = useState([])
  
  useEffect(() => {
      getProfiles().then((res) => {
        setProfiles(res.data)
        console.log(res.data)})
      }, []);
        
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
      <Input name="firstName" onChange={handleChange} id="name"/>
      <Label>Apellido de Usuario*</Label>
      <Input name="lastName"  onChange={handleChange} id="last name"/>
      <Label>Perfil*</Label>
      <Select name="idProfile" onChange={handleChange}>
        <option value="">Selecciona una opcion</option>
        { profiles?.map((profile)=> <option value={profile.id}>{profile.name}</option>)}
      </Select>
      <Label>Email*</Label>
      <Input type="email" name="email"  onChange={handleChange} id="email"/>
      <Label>Contraseña*</Label>
      <Input type="password" name="password"  onChange={handleChange} id="password"/>
      <Label>Avatar</Label>
      <Input type="avatar" name="password"  onChange={handleChange} id="avatar"/>
    <Button onClick={handleSave} className="my-10 mr-2" 
    disabled={!ava}>
      {loading ? <MyLoader /> : "Guardar"}</Button>     
    </Field>
    </>
  )
}
