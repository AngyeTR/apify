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
import { edit, getByCompanyId, getByID, post } from '../../../services/API/api'
import { FormSelectAndAdd } from './FormSelectAndAdd'
import { useLocalStorage } from '../../../hooks/useLocalStorage'

// Expected props= origin: [enum["wizard", "editor", "creator"], {handleClick: [funct(), optional], step: [int, optional], required], id: [int, optional]
export function FormProduct(props) {
  const updateinitial = (data) => {
    setColors(data.colors)
    setStatus(data.isActive) 
    setIsColors(data.isColors)
    setIsSizes(data.isSizes)
  }
  useEffect(() => {
    props.origin == "editor" ?  getByID("Products",props.id).then(res => setmodel(res.data)) : setmodel(productModel)
    props.origin == "editor" &&  getByID("Products",props.id).then(res => updateinitial(res.data)) 
   }, [ ]);

    const [loading, setloading] = useState(false)
    const [error, setError] = useState(null)
    const [model, setmodel] = useState(null)
    const [status, setStatus] = useState("")
    const [ava, setAva] = useState(props.origin == "editor" ? true : false)
    const [manufacturer, setManufacturer] = useState(null);
    const [category, setCategory] = useState(null);
    const [isSizes, setIsSizes] = useState(null); 
    const [isColors, setIsColors] = useState(null);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [images,setImages] = useState([]);
    const [stock, setStock] = useState([]);
    const [warehouses, setWarehouses] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [stored] = useLocalStorage("data")
    let dataSet = model

    const handleChange = (e) => {
      const { name, value } = e.target;
      dataSet[name] = value
      const dispo =  props.origin == "editor" ? true :((dataSet.name && dataSet.description && dataSet.prices ) ? true : false) 
      setAva(dispo)};

    useEffect(() => {
      getByCompanyId("Products", stored.company.id).then((res) => {setWarehouses(res.data)})
      images?.length >= 3 ? setButtonDisabled(true) : setButtonDisabled(false)
      console.log(colors)
    }, [ ,isColors, isSizes, colors, sizes, stock, images, manufacturer, category ]);
 
    const handleSave= async ()=>{
        setloading(true)
        setError(null)
        try {
          const data = await adaptProductModel(dataSet, props.origin, status, manufacturer,  category, isColors, isSizes, colors, sizes, stock, images)
          await new Promise(resolve => setTimeout(resolve, 3000));
          const res = props.origin == "editor" ? await edit("Products",data) :  await post("Products",data)
          console.log(res)
          res?.isValid ? props.handleClick() : setError(res?.errorMessages[0])
        } catch (error) {setError("Error")}
        setloading(false) 
    }
  return (
    <>
    <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10 my-5">
      <Heading>Información del Producto</Heading>
    </div>
    <Field>
      <Label>Nombre*</Label>
      <Input name="name" placeholder={dataSet?.name} onChange={handleChange} />
      <Label>Referencia</Label>
      <Input name="reference" placeholder={dataSet?.reference} onChange={handleChange}/>
      <Label>Descripción*</Label>
      <Textarea name="description" placeholder={dataSet?.description} onChange={handleChange}/>
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
      <Input  name="price" type="number" onChange={handleChange}/>
      <Label className="mt-5 block">Stock</Label>
      {!warehouses ? <p> No se encontraron Bodegas asociadas a la compañía</p> : warehouses.map(warehouse => 
        <> <Label >Bodega - { warehouse.name} </Label>
          <Input placeholder="cantidad para añadir a la bodega" name="stock" className="w-20" key={warehouse.id} 
          onChange={(e)=> setStock([...stock?.filter(stock => stock.idWarehouse !== warehouse.id), {idWarehouse: warehouse.id, quantity: parseInt(e.target.value) }])
         }/></>)}
      <Label > Imagenes de producto </Label>
      <p className='w-md italic text-xs'>Añadir máximo 3 imágenes. Las imágenes previamente almacenadas serán reemplazadas</p>
      <FormArrayItems ref={"imageUrl"} state={images} setState={setImages} disabled={buttonDisabled}/> 
      <p className={`text-red-600 pt-5 ${error ? "visible" : "invisible"}`}>Ups! Algo salió mal: {error}</p>  
    <Button onClick={handleSave}  className="my-10 mr-2" 
    disabled={!ava}>{loading ? <MyLoader /> : "Guardar"}</Button>      
 </Field>
    </>  
  )}
