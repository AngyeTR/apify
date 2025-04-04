import { useEffect } from 'react'
import { Field, Label } from '../../fieldset'
import { Heading } from '../../heading'
import { Input } from '../../input'
import { Button } from '../../button'
import { Select } from "../../select"
import { useState } from 'react';
import { productModel } from '../../../services/API/models'
import { adaptProductModel } from '../../../utils/adaptDataModel'
import { MyLoader } from '../MyLoader'

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
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");

    let dataSet = productModel
    const handleChange = (e) => {
      const { name, value } = e.target;
      dataSet[name] = value
      const dispo =  ((dataSet.name && dataSet.description ) ? true : false) 
      setAva(dispo)
    };

   useEffect(() => {
        // getCountries().then((res) => {setCountries(res)});
        // country && getStates(country.id).then((res) => {setStates(res)});
        // state && getCities(state.id).then((res) => {setCities(res)});
      }, [, isColors, isSizes]);


    const handleSave= async ()=>{
        setloading(true)
        const cleanData = adaptProductModel(dataSet, status)
        await postWareHouse(cleanData)
        setloading(false)
        props.handleClick()
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
      <Input name="description"  onChange={handleChange}/>
      <Label>Estado</Label>
      <Select name="isActive" onChange={(e)=> setStatus(e.target.value == "true" && true)}>
        <option value="">Selecciona una opcion</option>
        <option value="true">Activo</option>
        <option value="false">Inactivo</option>
      </Select>
      {/* <Label>Fabricante</Label>
      <Select name="manufacturer" onChange={(e)=> setManufacturer(e.target.value )}>
        <option value="">Selecciona una opcion</option>
        <option value="1">Colombia</option>
        <option value="2">Peru</option>
      </Select> */}
      <Label>Color</Label>
      <Select name="isColor" onChange={(e)=> setIsColors(e.target.value == "true" && true)}>
        <option value="">Selecciona una opcion</option>
        <option value="true" >Disponible en más de un color</option>
        <option value="false">Disponible solo en un color</option>
      </Select>
      <Label>Talla</Label>
      <Select name="isSizes" onChange={(e)=> setIsSizes(e.target.value == "true" && true)}>
        <option value="">Selecciona una opcion</option>
        <option value="true">Disponible en más de una talla</option>
        <option value="false">Disponible en una sola talla</option>
      </Select>
      <h1 className={isColors ? "visible" : "invisible"}>Seleccione colores</h1>
      <h1 className={isSizes ? "visible" : "invisible"}>Seleccione Tallas</h1>



      <Label>Precio</Label>
      <Input  name="price"  onChange={(e)=>setPrice(e.target.value)}/>
      <Label>Stock</Label>
      <Input  name="stock"  onChange={(e)=>setStock(e.target.value)}/>

    <Button onClick={handleSave}  className="my-10 mr-2" 
    disabled={!ava }>{loading ? <MyLoader /> : "Guardar"}</Button>     
 </Field>
    </>
    
  )
}
