
import { useState, useEffect } from 'react';
import { Switch } from '../../../../shared/components/uikit/switch'
import { Field, Label } from '../../../../shared/components/uikit/fieldset'
import { Combobox, ComboboxLabel, ComboboxOption } from '../../../../shared/components/uikit/combobox'
import { Heading } from '../../../../shared/components/uikit/heading'
import { Input } from '../../../../shared/components/uikit/input'
import { Button } from '../../../../shared/components/uikit/button'
import { Select } from "../../../../shared/components/uikit/select"
import { getCities, getCountries, getStates, getByID, edit, post } from "../../../../shared/services/API/api"
import { MyLoader } from '../myComponents/MyLoader'
import { warehouseModel } from "../../utils/models"
import { adaptWarehouseModel } from '../../utils/adaptDataModel'

export function FormWarehouse(props) {
  useEffect(() => { props.origin == "editor" ?  getByID("Warehouses", props.id).then(res => setDataSet(res.data)) : setDataSet(warehouseModel)
    props.origin == "editor" &&  getByID("Warehouses",props.id).then(res => setSalesPoint(res.data.isPublic)) 
  }, []);
    
    const [error, setError] = useState(null);
    const [loading, setloading] = useState(false)
    const [dataSet, setDataSet] = useState(null)
    const [ava, setAva] = useState(props.origin == "editor" ? true : false)
    const [location, setLocation] = useState(null)
    const [selectedCity, setSelectedCity] = useState(null)

    const handleChange = (e) => {
      const { name, value } = e.target;
      setDataSet(prev=>({...prev, [name]: value}))
      const dispo = props.origin == "editor" ? true : ((selectedCity  && dataSet.name && dataSet.cellphone && dataSet.address && dataSet.contactName) ? true : false) 
      setAva(dispo)
    };

   useEffect(() => {
        getCountries().then((res) => setLocation(prev=> ({...prev, "countries": res.data})));
        location?.country && getStates(location.country.id).then((res) => setLocation(prev=> ({...prev, "states": res.data})));
        location?.state && getCities(location.state.id).then((res) => setLocation(prev=> ({...prev, "cities": res.data})));
        location?.state && getCities(location.state.id).then((res) =>console.log(res) );
      }, [ location?.country, location?.state ]);


    const handleSave= async ()=>{
      setloading(true)
      setError(null)
      const cleanData = adaptWarehouseModel(dataSet, props.origin, selectedCity)
      const res = props.origin == "editor" ? await edit("Warehouses", cleanData) : await post("Warehouses", cleanData) 
      setloading(false)
      res?.isValid ? props.handleClick() : setError(res?.errorMessages ? res?.errorMessages[0] : " Por favor revise que los campos sean correctos")
    }

  return (
    <>
    <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10 my-5">
      <Heading>Información de la Bodega</Heading>
    </div>
    <Field>
       <Label>Nombre*</Label>
      <Input name="name" placeholder={dataSet?.name && dataSet.name} onChange={handleChange} />
      <Label className="block my-4">Esta bodega también es punto de atención al público <Switch checked={dataSet?.isPublic} onChange={()=> setDataSet(prev=>({...prev,  isPublic: !prev.isPublic}))}/> </Label>
      <Label className="block my-4">Bodega Activa <Switch checked={dataSet?.isActive} onChange={()=> setDataSet(prev=>({...prev,  isActive: !prev.isActive}))}/></Label>
      <Label>Pais*</Label>
      <Select name="country" onChange={(e)=> setLocation(prev => ({...prev, "country": JSON.parse(e.target.value)}))}>
        <option value="">Selecciona una opcion</option>
        {location?.countries?.map((country)=> <option value={JSON.stringify(country)} key={country.name}>{country.name}</option>)}
      </Select>
      <Label>Estado/ Departamento*</Label>
         <Select name="state" onChange={(e)=> setLocation(prev => ({...prev, "state": JSON.parse(e.target.value)}))}>
        <option value="">Selecciona una opcion</option>
        {location?.states?.map((state)=> <option value={JSON.stringify(state)} key={state.name}>{state.name}</option> )}
      </Select>
      <Label>Ciudad*</Label>
      
      <Combobox name="city" options={location?.cities ? location.cities : []} displayValue={(city) => city?.name} 
       onChange={(e)=> setSelectedCity(JSON.parse(e))} placeholder={selectedCity ? selectedCity.name : "Seleccionar ciudad&hellip;"}>
        {(city) => (
          <ComboboxOption value={JSON.stringify(city)}>
            <ComboboxLabel>{city.name}</ComboboxLabel>
          </ComboboxOption>
        )}

      </Combobox>
      <Label>Dirección*</Label>
      <Input  name="address" placeholder={dataSet?.address &&  dataSet?.address} onChange={handleChange}/>
      <Label>Teléfono*</Label>
      <Input  name="cellphone" placeholder={dataSet?.cellphone && dataSet.cellphone} type="tel" onChange={handleChange}/>
      <Label>Nombre de contacto*</Label>
      <Input  name="contactName" placeholder={dataSet?.contactName && dataSet.contactName} onChange={handleChange}/>
      {/* <Label>Latitud</Label>
      <Input  name="latitude" placeholder={dataSet?.latitude && dataSet.latitude} onChange={handleChange}/>
      <Label>Longitud</Label>
      <Input  name="longitude" placeholder={dataSet?.longitude && dataSet.longitude}  onChange={handleChange}/>
       */}
 </Field>
 <p className={`text-red-600 pt-5 ${error ? "visible" : "invisible"}`}>Ups! Algo salió mal: {error}</p>  
 <Button onClick={handleSave} className="my-10 mr-2" disabled={!ava}> 
  {loading ? <MyLoader /> : "Guardar"}</Button> 
    </>
    
  )
}
