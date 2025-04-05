import { useEffect } from 'react'
import { Field, Label } from '../../fieldset'
import { Divider } from '../../divider'
import { Textarea } from '../../textarea'
import { Switch } from '../../switch'
import { Heading } from '../../heading'
import { Input } from '../../input'
import { Button } from '../../button'
import { Select } from "../../select"
import { useState } from 'react';
import { productModel } from '../../../services/API/models'
import { adaptProductModel } from '../../../utils/adaptDataModel'
import { MyLoader } from '../MyLoader'
import { FormArrayItems } from './FormArrayItems'
import { getWarehouseByCompany } from '../../../services/API/api'

export function FormProduct(props) {
  const [loading, setloading] = useState(false)
    const [status, setStatus] = useState("")
    const [ava, setAva] = useState(false)
    const [manufacturer, setManufacturer] = useState("");
    const [isSizes, setIsSizes] = useState("");
    const [isColors, setIsColors] = useState("");
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [images,setImages] = useState([]);
    const [stock, setStock] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [warehouses, setWarehouses] = useState("");
    const rawData = window.localStorage.getItem("data")
    const stored = JSON.parse(rawData)


    let dataSet = productModel
    const handleChange = (e) => {
      const { name, value } = e.target;
      dataSet[name] = value
      const dispo =  ((dataSet.name && dataSet.description && dataSet.prices ) ? true : false) 
      setAva(dispo)
    };

    useEffect(() => {
      getWarehouseByCompany(stored.company.id).then((res) => {
        setWarehouses(res)
      })
      images.length >= 3 ? setButtonDisabled(true) : setButtonDisabled(false)}, [, isColors, isSizes, colors, sizes, stock, images]);


    const handleSave= async ()=>{
        // setloading(true)
        const cleanData = adaptProductModel(dataSet, status)
        console.log(cleanData)
        // await postWareHouse(cleanData)
        // setloading(false)
        // props.handleClick()
    }
  return (
    <>
    <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10 my-5">
      <Heading>Información del Producto</Heading>
    </div>
    <Field>
      <Label>Nombre*</Label>
      <Input name="name" onChange={handleChange} />
      <Label>Referencia</Label>
      <Input name="reference"  onChange={handleChange}/>
      <Label>Descripción*</Label>
      <Textarea name="description" onChange={handleChange}/>
      <Label className="block my-5" >Producto Activo <Switch checked={status} onChange={setStatus} /> </Label>
      <Label>Fabricante</Label>
      <Select name="manufacturer" onChange={(e)=> setManufacturer(e.target.value )}>
      </Select>
      <Divider/>
      <Label className="block my-5" >Producto disponible en mas de 1 color  <Switch checked={isColors} onChange={setIsColors} > </Switch> </Label>
      {isColors && 
      <><label className='mt-4'> Seleccione los colores </label>
      <FormArrayItems ref={"color"} state={colors} setState={setColors} /></> }
      <Divider/>
      <Label className="block my-5">Producto disponible en más de una talla  <Switch checked={isSizes} onChange={setIsSizes}  > </Switch></Label>
      {isSizes && 
      <><label className='mt-4'> Ingrese las tallas </label>
      <FormArrayItems ref={"size"} state={sizes} setState={setSizes}/></>}
      <Divider/>
      <Label >Precio</Label>
      <Input  name="prices" type="number" onChange={handleChange}/>
      <Divider/>
      <Label className="mt-5 block">Stock</Label>
      {
        !warehouses ? <p> No se encontraron Bodegas asociadas a la compañía</p> :
        warehouses.map(warehouse => 
          <>
        <Label>Bodega - { warehouse.name} </Label>
        <Input  name="stock" className="w-20"
         onChange={(e)=> setStock([...stock?.filter(stock => stock.warehouse.id !== warehouse.id), { warehouse: warehouse, stock: parseInt(e.target.value) }])}/>
          </>)
      }
      <Divider className="mt-2"/>
      <Label > Imagenes de producto </Label>
      <FormArrayItems ref={"imageUrl"} state={images} setState={setImages} disabled={buttonDisabled}/> 
    <Button onClick={handleSave}  className="my-10 mr-2" 
    disabled={!ava }>{loading ? <MyLoader /> : "Guardar"}</Button>     
 </Field>
    </>
    
  )
}
