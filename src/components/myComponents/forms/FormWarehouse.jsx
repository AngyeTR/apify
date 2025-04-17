
import { useState, useEffect } from 'react';
import { Switch } from '../../switch'
import { Field, Label } from '../../fieldset'
import { Combobox, ComboboxLabel, ComboboxOption } from '../../combobox'
import { Heading } from '../../heading'
import { Input } from '../../input'
import { Button } from '../../button'
import { Select } from "../../select"
import { getCities, getCountries, getStates, getByID, edit, post } from '../../../services/API/api'
import { MyLoader } from '../MyLoader'
import { warehouseModel } from '../../../services/API/models'
import { adaptWarehouseModel } from '../../../utils/adaptDataModel'

export function FormWarehouse(props) {
  useEffect(() => { props.origin == "editor" ?  getByID("Warehouses", props.id).then(res => setModel(res)) : setModel(warehouseModel)
    props.origin == "editor" &&  getByID("Warehouses",props.id).then(res => setSalesPoint(res.isPublic)) 
  }, []);
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setloading] = useState(false)
    const [model, setModel] = useState(null)
    const [isActive, setIsActive] = useState(false)
    const [salesPoint, setSalesPoint] = useState(false)
    const [ava, setAva] = useState(props.origin == "editor" ? true : false)
    const [country, setCountry] = useState(null);
    const [states, setStates] = useState(null)
    const [state, setState] = useState("");
    const [cities, setCities] = useState(null)
    const [selectedCity, setSelectedCity] = useState(null)
    let dataSet = model
    const handleChange = (e) => {
      const { name, value } = e.target;
      dataSet[name] = value
      const dispo = props.origin == "editor" ? true : ((selectedCity  && dataSet.name && dataSet.cellphone && dataSet.address && dataSet.contactName) ? true : false) 
      setAva(dispo)
    };

   useEffect(() => {
        getCountries().then((res) => {setCountries(res)});
        country && getStates(country.id).then((res) => {setStates(res)});
        state && getCities(state.id).then((res) => {setCities(res)});
        console.log(selectedCity)
      }, [, country, state]);

    const handleSave= async ()=>{
      setloading(true)
      setError(null)
      const cleanData = adaptWarehouseModel(dataSet, props.origin, selectedCity, isActive, salesPoint)
      const res = props.origin == "editor" ? await edit("Warehouses", cleanData) : await post("Warehouses", cleanData) 
      setloading(false)
      res?.isValid ? props.handleClick() : setError(res?.errorMessages[0])
    }

  return (
    <>
    <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10 my-5">
      <Heading>Información de la Bodega</Heading>
    </div>
    <Field>
      <Label>Nombre*</Label>
      <Input name="name" placeholder={dataSet?.name && dataSet.name} onChange={handleChange} />
      <Label className="block my-4">Esta bodega también es punto de atención al público <Switch checked={salesPoint} onChange={setSalesPoint} /> </Label>
      <Label className="block my-4">Bodega Activa <Switch checked={isActive} onChange={setIsActive} /> </Label>
      <Label>Pais*</Label>
      <Select name="country" onChange={(e)=> setCountry(JSON.parse(e.target.value))}>
        <option value="">Selecciona una opcion</option>
        {countries?.map((country)=> <option value={JSON.stringify(country)} key={country.name}>{country.name}</option>)}
      </Select>
      <Field>
      <Label>Pais</Label>
    </Field>
      <Label>Estado/ Departamento*</Label>
        <Select name="state" onChange={(e)=> setState(JSON.parse(e.target.value))}>
        <option value="">Selecciona una opcion</option>
        {states?.map((state)=> <option value={JSON.stringify(state)} key={state.name}>{state.name}</option> )}
      </Select>
      <Label>Ciudad*</Label>
      {/* <Select name="idCity" onChange={(e)=> setSelectedCity(JSON.parse(e.target.value))}>
        <option value="">Selecciona una opcion</option>
        { cities?.map((city)=> <option value={JSON.stringify(city)} key={city.name}>{city.name}</option> )}
      </Select> */}
      <Combobox name="city" options={cities} displayValue={(city) => city?.name} 
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
