import { useEffect, useState  } from 'react'
import { Field, Label } from '../../../../shared/components/uikit/fieldset'
import { Textarea } from '../../../../shared/components/uikit/textarea'
import { Switch } from '../../../../shared/components/uikit/switch'
import { Heading } from '../../../../shared/components/uikit/heading'
import { Input } from '../../../../shared/components/uikit/input'
import { Button } from '../../../../shared/components/uikit/button'
import { productModel } from "../../utils/models"
import { adaptProductModel } from "../../utils/adaptDataModel"
import { MyLoader } from "../myComponents/MyLoader"
import { FormArrayItems } from './FormArrayItems'
import { edit, getByCompanyId, getByID, post } from "../../../../shared/services/API/api"
import { FormSelectAndAdd } from './FormSelectAndAdd'
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"

// Expected props= origin: [enum["wizard", "editor", "creator"], {handleClick: [funct(), optional], step: [int, optional], required], id: [int, optional]
export function FormProduct(props) {
  useEffect(() => {
    props.origin == "editor" ?  getByID("Products",props.id).then(res => setDataSet(res.data)) : setDataSet(productModel)
   }, [ ]);

    const [loading, setloading] = useState(false)
    const [error, setError] = useState(null)
    const [ava, setAva] = useState(props.origin == "editor" ? true : false)
    const [stock, setStock] = useState([]);
    const [dataSet, setDataSet] = useState(null)
    const [warehouses, setWarehouses] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [stored] = useLocalStorage("data")
    // let dataSet = model

    const handleChange = (e) => {
      const { name, value } = e.target;
      setDataSet(prev=>({...prev, [name]: value}))
      const dispo =  props.origin == "editor" ? true :((dataSet.name && dataSet.description && dataSet.prices ) ? true : false) 
      setAva(dispo)}; 

    useEffect(() => {
      getByCompanyId("Warehouses", stored?.company.id).then((res) => {setWarehouses(res.data)})
      dataSet?.images?.length >= 3 ? setButtonDisabled(true) : setButtonDisabled(false)
    }, [dataSet]);
 
    const handleSave= async ()=>{
        setloading(true)
        setError(null)
        try {
          // const data = await adaptProductModel(dataSet, props.origin, status, manufacturer,  category, isColors, isSizes, colors, sizes, stock, images)
          const data = await adaptProductModel(dataSet, props.origin, stock )
          await new Promise(resolve => setTimeout(resolve, 3000));
          const res = props.origin == "editor" ? await edit("Products",data) :  await post("Products",data)
          console.log(res)
          res?.isValid ? props.handleClick() : setError(res?.errorMessages[0])
        } catch (error) {setError("Error")}
        setloading(false) 
    }
  return (
    <>
    <div className="flex w-full max-w-md flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6   my-5">
      <Heading>Información del Producto</Heading>
    </div>
    <Field className="max-w-lg">
      <Label>Nombre*</Label>
      <Input name="name" placeholder={dataSet?.name} onChange={handleChange} />
      <Label>Referencia</Label>
      <Input name="reference" placeholder={dataSet?.reference} onChange={handleChange}/>
      <Label>Descripción*</Label>
      <Textarea name="description" placeholder={dataSet?.description} onChange={handleChange}/>
      <Label className="block my-5" >Producto Activo <Switch checked={dataSet?.isActive} onChange={()=> setDataSet(prev=>({...prev,  isActive: !prev.isActive}))}/> </Label>
      <Label>Fabricante</Label>
      <FormSelectAndAdd ref="manufacturer"  setState={(value) => setDataSet(prev=>({...prev, idManufacturer: parseInt(value)}))}/>
      <Label>Categoría</Label>
      <FormSelectAndAdd ref="category"  setState={(value) => setDataSet(prev=>({...prev, idCategory: parseInt(value)}))}/>
      <Label className="block my-5" >Producto disponible en mas de 1 color  <Switch checked={dataSet?.isColors} onChange={()=> setDataSet(prev=>({...prev,  isColors: !prev.isColors}))} > </Switch> </Label>
      {dataSet?.isColors && 
      <><label className='mt-4'> Seleccione los colores </label>
      <FormArrayItems ref={"color"} state={dataSet?.colors} setState={(value) => setDataSet(prev=>({...prev, colors: value}))} /></> }
      <Label className="block my-5">Producto disponible en más de una talla  <Switch checked={dataSet?.isSizes} onChange={()=> setDataSet(prev=>({...prev,  isSizes: !prev.isSizes}))}> </Switch></Label>
      {dataSet?.isSizes && 
      <><label className='mt-4'> Ingrese las tallas </label>
      <FormArrayItems ref={"size"} state={dataSet?.sizes} setState={(value) => setDataSet(prev=>({...prev, sizes: value}))}/></>}
      <Label >Precio</Label>
      <Input  name="price" type="number" onChange={handleChange}/>
      <Label className="mt-5 block">Stock</Label>
      {!warehouses ? <p> No se encontraron Bodegas asociadas a la compañía</p> : warehouses.filter(warehouse=> warehouse.isActive == true).map(warehouse => 
        <div className="mb-5"> <Label >Bodega - { warehouse.name} </Label>
          <Input placeholder="cantidad para añadir a la bodega" name="stock" className="w-20" key={warehouse.id} 
          onChange={(e)=> setStock([...stock?.filter(stock => stock.idWarehouse !== warehouse.id), {idWarehouse: warehouse.id, quantity: parseInt(e.target.value) }])
         }/></div>)}
      <Label > Imagenes de producto </Label>
      <p className='w-md italic text-xs text-zinc-700'>Añadir máximo 3 imágenes. Las imágenes previamente almacenadas serán reemplazadas</p>
      <FormArrayItems ref={"imageUrl"} state={dataSet?.images} setState={(value) => setDataSet(prev=>({...prev, images: value}))} disabled={buttonDisabled}/> 
      {error && <p className={`text-red-600 pt-5 `}>Ups! Algo salió mal: {error}</p> } 
    <Button onClick={handleSave}  className="my-10 mr-2" 
    disabled={!ava}>{loading ? <MyLoader /> : "Guardar"}</Button>     
 </Field>
    </>  
  )}
