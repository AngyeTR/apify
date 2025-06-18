import { useState, useEffect } from 'react';
import { Field, Label } from "../../../../shared/components/uikit/fieldset"
import { Heading } from '../../../../shared/components/uikit/heading'
import { Button } from "../../../../shared/components/uikit/button"
import { Select } from "../../../../shared/components/uikit/select"
import { MyLoader } from "./MyLoader"
import { getByCompanyId } from "../../../../shared/services/API/api"
import { useLocalStorage } from '../../../../shared/hooks/useLocalStorage';
import { adaptCategoryModel } from '../../utils/adaptDataModel';
import { getBase64 } from "../../../../shared/utils/utils"
import { useNavigate } from 'react-router-dom';

export const  MyStoreForms =()=> {
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(false)
  const [dataSet, setDataSet] = useState(null)
  const [base64, setBase64 ] = useState(null)
  const [categories, setCategories] = useState(null)
  const [stored] = useLocalStorage("data")
  const [imgUrl, setImgUrl] = useState("")
  const nav = useNavigate()

  useEffect(() => {getByCompanyId("Categories", stored?.company.id).then(res => setCategories(res.data))}, [ ]);

  const handleSave= async()=> {
    setloading(true)
    setError(null)
    const cleanData = await adaptCategoryModel(dataSet, base64)
    await new Promise(resolve => setTimeout(resolve, 1000));
    const res =await edit("Categories", cleanData).then(res=>res) 
    setloading(false)
    res?.isValid  ? nav(0) : setError(" ")
    setloading(false)} 
   

  const upLoadImage = async (value)=> 
    {const url = URL.createObjectURL(value)
      setImgUrl(url)
      let base64 = null
      try {
        base64 = await getBase64(value).then(res => {return res})
        setBase64( base64)
      } catch (error) {console.log(error)} }

  return (
    <><div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6   my-5">
      <Heading>Personalización de Tienda</Heading>
      <Button onClick={()=>nav("/store")}>Ver Tienda</Button>
    </div>
    <div className='w-sm'>
      <Field>
      <Label>Gestionar Imagen de Categoría</Label>
      <Select name="country" onChange={(e)=> setDataSet(categories[e.target.value])}>
        <option value="">Selecciona una opcion</option>
        {categories?.map((item, index)=> <option value={index} >{item.name}</option>)}
      </Select>
      <input type="file" accept="image/*" className='w-sm my-3 border border-zinc-300 rounded-lg p-1' onChange={(e)=> upLoadImage(e.target.files[0])} />
       {imgUrl && <img   className="h-30" src={imgUrl} alt=""/>}
     </Field>
    {(dataSet && imgUrl) && <>{loading ? <MyLoader /> : <Button  className="my-10 mr-2" onClick={handleSave}>Guardar</Button>} </>}
    {error && <p className={`text-red-600 pt-5 `}>Ups! Algo salió mal: {error}</p>  }
    </div>
    </>)}
