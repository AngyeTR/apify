import { useEffect } from 'react'
import { Field, Label } from '../../../../shared/components/uikit/fieldset'
import { Switch } from "../../../../shared/components/uikit/switch"
import { Heading } from '../../../../shared/components/uikit/heading'
import { Input } from '../../../../shared/components/uikit/input'
import { Button } from '../../../../shared/components/uikit/button'
import { Select } from "../../../../shared/components/uikit/select"
import { useState } from 'react';
import { edit, getByID, getProfiles, post } from '../../../../shared/services/API/api/'
import { MyLoader } from '../myComponents/MyLoader'
import { userModel } from "../../utils/models"
import { adaptUserModel } from '../../utils/adaptDataModel'
import {  getUpdatedLocalUser  } from "../../utils/functions"
import { validateEmail, getBase64, } from "../../../../shared/utils/utils"
import { useLocalStorage } from '../../../../shared/hooks/useLocalStorage'
import { Modal } from "../../../../shared/components/Modal"
import { CollectionSelector } from '../../../Designer/components/CollectionSelector'

export function FormUser(props) {
  useEffect(() => {props.origin == "editor" ?  getByID("Users",props.id).then(res => setDataSet(res.data)) : setDataSet(userModel)}, []);
  const [loading, setloading] = useState(false)
  const [dataSet, setDataSet] = useState(null)
  const [ava, setAva] = useState(props.origin == "editor" ? true : false)
  const [imgUrl, setImgUrl] = useState("")
  const [base64, setBase64] = useState("")
  const [error, setError] = useState(null)
    const [fileOrigin, setFileOrigin] = useState(null)
    const [modalMode, setModalMode] = useState(null)
  const [stored, setStored] = useLocalStorage("data", null) 
  const [profiles, setProfiles] = useState([])
 
  useEffect(() => {getProfiles().then((res) => {setProfiles(res.data)})}, [ , imgUrl]);

  const upLoadImage = async (value)=> 
      {const url = URL.createObjectURL(value)
        setImgUrl(url)
        let base64 = null
        try {
          base64 = await getBase64(value).then(res => {return res})
          setBase64( base64)
        } catch (error) {console.log(error)} 
      }
        
    const handleChange = (e) => {
      const { name, value } = e.target;
      setDataSet(prev=>({...prev, [name]: value}))
      const dispo =  props.origin == "editor" ? true :((dataSet.idProfile && dataSet.firstName && dataSet.lastName && dataSet.email && dataSet.password) ? true : false) 
      setAva(dispo)
    };

    const updateUser=  async ( data)=>{
      const info =  getUpdatedLocalUser(stored, data)
      await setStored(info)}
    
  const handleSave= async()=>{
        setloading(true)
        setError(null)
         const verifyEmail = validateEmail(dataSet.email)
        if(verifyEmail) {setError(verifyEmail) 
          setloading(false) 
        }else {
        const cleanData = await adaptUserModel(dataSet, props.origin, base64, fileOrigin)
        await new Promise(resolve => setTimeout(resolve, 2000));
        const res =( props.origin == "editor") ? await edit("Users", cleanData) :  await post("Users", cleanData)
        setloading(false)
        console.log(res)
        res?.isValid  && (props.id == stored?.userid && await updateUser(cleanData) ) 
        res?.isValid ? props.handleClick() : setError(res?.errorMessages ? res?.errorMessages[0] : "Por favor revise que cada campo sea correcto")} }

  return (
    <>
    <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6   my-5">
      <Heading>Información del Usuario</Heading>
    </div>
    <Field>
      <Label>Nombre de Usuario*</Label>
      <Input name="firstName" placeholder={dataSet?.firstName && dataSet.firstName} onChange={handleChange} id="name"/>
      <Label>Apellido de Usuario*</Label>
      <Input name="lastName" placeholder={dataSet?.lastName && dataSet.lastName} onChange={handleChange} id="last name"/>
      <Label>Perfil*</Label>
      <Select name="idProfile" onChange={handleChange}>
        <option value="">Selecciona una opcion</option>
        { profiles?.map((profile)=> <option value={profile.id}>{profile.name}</option>)}
      </Select>
      <Label className="block my-4">Este usuario también es vendedor<Switch checked={dataSet?.isSalesman} onChange={()=> setDataSet(prev=>({...prev,  isSalesman: !prev.isSalesman}))} /> </Label>
      <Label>Email*</Label>
      <Input type="email" name="email"  onChange={handleChange} id="email" placeholder={dataSet?.email && dataSet.email}/>
      <Label>Contraseña*</Label>
      <Input type="password" name="password"  onChange={handleChange} id="password"/>
      <Label className="block">Avatar</Label>
      {/* <input accept="image/*" type="file" multiple className='w-50 my-2 mx-2 h-8 bg-white shadow-sm border border-gray-400  rounded-md'
     onChange={(e)=> upLoadImage(e.target.files[0])} /> */}
     <div>
      <Button onClick={()=>setModalMode("external")}>Desde URL</Button>
    <Button onClick={()=>setModalMode("local")}>Desde mi equipo</Button>
    <Button onClick={()=>setModalMode("internal")}>Desde mis colecciones</Button>

     </div>
    
     {imgUrl && <img   className="h-30" src={imgUrl} alt=""/>}
      {error && <p className={`text-red-600 pt-5`}>Ups! Algo salió mal: {error}</p> }  
    <Button onClick={handleSave} className="my-10 mr-2" 
    disabled={!ava}>
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
                <Button  className="mx-1 my-2" onClick={()=>{setFileOrigin(modalMode);modalMode != "local" && setImgUrl(base64); setModalMode(null)}}>Guardar</Button>
                <Button className="mx-1 my-2" onClick={()=>{setModalMode(null); setBase64("")}}>Cancelar</Button>
          </Field>
          </Modal>}
    </>
  )
}
