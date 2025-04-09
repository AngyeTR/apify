import { useEffect } from 'react'
import { Field, Label } from '../../fieldset'
import { Textarea } from '../../textarea'
import { Switch } from '../../switch'
import { Heading } from '../../heading'
import { Input } from '../../input'
import { Button } from '../../button'
import { useState } from 'react';
import { productModel } from '../../../services/API/models'
import { adaptProductModel } from '../../../utils/adaptDataModel'
import { MyLoader } from '../MyLoader'
import { FormArrayItems } from './FormArrayItems'
import { getWarehouseByCompany } from '../../../services/API/api'
import { FormSelectAndAdd } from './FormSelectAndAdd'

export function FormProduct(props) {
    const [loading, setloading] = useState(false)
    const [error, setError] = useState(null)
    const [status, setStatus] = useState("")
    const [ava, setAva] = useState(false)
    const [manufacturer, setManufacturer] = useState(null);
    const [category, setCategory] = useState(null);
    const [isSizes, setIsSizes] = useState(false);
    const [isColors, setIsColors] = useState(false);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [images,setImages] = useState([]);
    const [stock, setStock] = useState([]);
    const [warehouses, setWarehouses] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const rawData = window.localStorage.getItem("data")
    const stored = JSON.parse(rawData)

    let dataSet = productModel

    const handleChange = (e) => {
      const { name, value } = e.target;
      dataSet[name] = value
      const dispo =  ((dataSet.name && dataSet.description && dataSet.prices ) ? true : false) 
      setAva(dispo)};

    useEffect(() => {
      getWarehouseByCompany(stored.company.id).then((res) => {setWarehouses(res)})
      images.length >= 3 ? setButtonDisabled(true) : setButtonDisabled(false)
    }, [isColors, isSizes, colors, sizes, stock, images, manufacturer, category ]);

    const handleSave= async ()=>{
        setloading(true)
        setError(null)
        const res = await adaptProductModel(dataSet, status, manufacturer,  category, isColors, isSizes, colors, sizes, stock, images)
        setloading(false)
        res?.isValid ? props.handleClick() : setError(res?.errorMessages[0])
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
      <FormSelectAndAdd ref="manufacturer"  setState={setManufacturer}/>
      <Label>Categoría</Label>
      <FormSelectAndAdd ref="category"  setState={setCategory}/>
      <Label className="block my-5" >Producto disponible en mas de 1 color  <Switch checked={isColors} onChange={setIsColors} > </Switch> </Label>
      {isColors && 
      <><label className='mt-4'> Seleccione los colores </label>
      <FormArrayItems ref={"color"} state={colors} setState={setColors} /></> }
      <Label className="block my-5">Producto disponible en más de una talla  <Switch checked={isSizes} onChange={setIsSizes}  > </Switch></Label>
      {isSizes && 
      <><label className='mt-4'> Ingrese las tallas </label>
      <FormArrayItems ref={"size"} state={sizes} setState={setSizes}/></>}
      <Label >Precio</Label>
      <Input  name="prices" type="number" onChange={handleChange}/>
      <Label className="mt-5 block">Stock</Label>
      {
        !warehouses ? <p> No se encontraron Bodegas asociadas a la compañía</p> : warehouses.map(warehouse => 
        <> <Label >Bodega - { warehouse.name} </Label>
          <Input  name="stock" className="w-20" key={warehouse.id} 
          onChange={(e)=> setStock([...stock?.filter(stock => stock.idWarehouse !== warehouse.id), {idWarehouse: warehouse.id, stock: parseInt(e.target.value) }])
         }/></>)
      }
      <Label > Imagenes de producto </Label>
      <FormArrayItems ref={"imageUrl"} state={images} setState={setImages} disabled={buttonDisabled}/> 
      <p className={`text-red-600 pt-5 ${error ? "visible" : "invisible"}`}>Ups! Algo salió mal: {error}</p>  
    <Button onClick={handleSave}  className="my-10 mr-2" 
    disabled={!ava }>{loading ? <MyLoader /> : "Guardar"}</Button>      
 </Field>
    </>  
  )}
