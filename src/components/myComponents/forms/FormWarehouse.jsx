
import { useState, useEffect } from 'react';
import { Switch } from '../../switch'
import { Field, Label } from '../../fieldset'
import { Heading } from '../../heading'
import { Input } from '../../input'
import { Button } from '../../button'
import { Select } from "../../select"
import { getCities, getCountries, getStates } from '../../../services/API/api'
import { postWareHouse } from '../../../services/API/api'
import { MyLoader } from '../MyLoader'
import { warehouseModel } from '../../../services/API/models'
import { adaptWarehouseModel } from '../../../utils/adaptDataModel'

export function FormWarehouse(props) {
    const [countries, setCountries] = useState([]);
    const [loading, setloading] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [ava, setAva] = useState(false)
    const [country, setCountry] = useState(null);
    const [states, setStates] = useState(null)
    const [state, setState] = useState("");
    const [cities, setCities] = useState(null)
    const [selectedCity, setSelectedCity] = useState(null)

    let dataSet = warehouseModel
    const handleChange = (e) => {
      const { name, value } = e.target;
      dataSet[name] = value
      const dispo =  ((selectedCity  && dataSet.name && dataSet.cellphone && dataSet.address && dataSet.contactName) ? true : false) 
      setAva(dispo)
    };

   useEffect(() => {
        getCountries().then((res) => {setCountries(res)});
        country && getStates(country.id).then((res) => {setStates(res)});
        state && getCities(state.id).then((res) => {setCities(res)});
      }, [, country, state]);

    const handleSave= async ()=>{
      setloading(true)
      const cleanData = adaptWarehouseModel(dataSet, country, state, selectedCity, isActive)
      await postWareHouse(cleanData)
      setloading(false)
      props.handleClick()
    }

  return (
    <>
    <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10 my-5">
      <Heading>Información de la Bodega</Heading>
    </div>
    <Field>
      <Label>Nombre*</Label>
      <Input name="name" onChange={handleChange} />
      <Label className="block my-4">Bodega Activa <Switch checked={isActive} onChange={setIsActive} /> </Label>
      <Label>Pais*</Label>
      <Select name="country" onChange={(e)=> setCountry(JSON.parse(e.target.value))}>
        <option value="">Selecciona una opcion</option>
        {
          countries?.map((country)=> <option value={JSON.stringify(country)} key={country.name}>{country.name}</option>)
        }
      </Select>
      <Label>Estado/ Departamento*</Label>
        <Select name="state" onChange={(e)=> setState(JSON.parse(e.target.value))}>
        <option value="">Selecciona una opcion</option>
        {
          states?.map((state)=> <option value={JSON.stringify(state)} key={state.name}>{state.name}</option> )
        }
      </Select>
       
      <Label>Ciudad*</Label>
      <Select name="idCity" onChange={(e)=> setSelectedCity(JSON.parse(e.target.value))}>
        <option value="">Selecciona una opcion</option>
        {
          cities?.map((city)=> <option value={JSON.stringify(city)} key={city.name}>{city.name}</option> )
        }
      </Select>
      
      <Label>Dirección*</Label>
      <Input  name="address" onChange={handleChange}/>
      <Label>Teléfono*</Label>
      <Input  name="cellphone" type="tel" onChange={handleChange}/>
      <Label>Nombre de contacto*</Label>
      <Input  name="contactName"  onChange={handleChange}/>
      <Label>Latitud</Label>
      <Input  name="latitude"  onChange={handleChange}/>
      <Label>Longitud</Label>
      <Input  name="longitude"  onChange={handleChange}/>
      
 </Field>
 <Button onClick={handleSave} className="my-10 mr-2" disabled={!ava}> 
  {loading ? <MyLoader /> : "Guardar"}</Button> 
    </>
    
  )
}
