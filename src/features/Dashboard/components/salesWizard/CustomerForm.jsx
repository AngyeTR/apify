import { useEffect, useState } from "react";
import { Field, Label } from "../../../../shared/components/uikit/fieldset"
import { Input } from "../../../../shared/components/uikit/input"
import { getCities, getCountries, getStates, getByID, edit, post } from "../../../../shared/services/API/api"
import { HiExclamation } from "react-icons/hi";

import { Combobox, ComboboxLabel, ComboboxOption } from "../../../../shared/components/uikit/combobox";
import { Select } from "../../../../shared/components/uikit/select";
import { Heading } from "../../../../shared/components/uikit/heading";
import { Button } from "../../../../shared/components/uikit/button";
import { validateEmail } from "../../../../shared/utils/utils";

export const CustomerForm = ({data, handleClick, dataSet, setDataSet})=>{
    const [location, setLocation] = useState(null)
    const [selectedCity, setSelectedCity] = useState(null)
    const [error, setError] = useState(null)
    const [buyerInfo, setBuyerInfo] = useState({})

    const saveform = ()=>{
        const verifyEmail = validateEmail(buyerInfo.email)
        setBuyerInfo(prev=> ({...prev, "cityId": selectedCity}))
        if(verifyEmail){
            setError(verifyEmail)
        }
        else if (buyerInfo.phone.length < 10) {
            setError("Formato de teléfono inválido")
        }
        else { handleClick(1)}
    }

    useEffect(() => {
            getCountries().then((res) => setLocation(prev=> ({...prev, "countries": res.data})));
            location?.country && getStates(location.country.id).then((res) => setLocation(prev=> ({...prev, "states": res.data})));
            location?.state && getCities(location.state.id).then((res) => setLocation(prev=> ({...prev, "cities": res.data})));
            location?.state && getCities(location.state.id).then((res) =>console.log(res) );
          }, [ location?.country, location?.state ]);

    return ( 
        <div className="justify-center  justify-items-center bg-zinc-50 mt-5 w-[px] md:w-[600px] rounded-lg p-5">
            <Field className="justify-center ">
            <Heading className="text-center">Datos del comprador</Heading>
            <Label>Nombre <span className="text-red-600">*</span></Label>
            <Input placeholder="Nombre" onChange={e=> setBuyerInfo(prev=>({...prev, name: e.target.value}))}/>
            <Label>Apellido <span className="text-red-600">*</span></Label>
            <Input placeholder="Apellido" onChange={e=> setBuyerInfo(prev=>({...prev, lastName: e.target.value}))}/>
            <Label>Número Celular <span className="text-red-600">*</span></Label>
            <Input placeholder="3012345678" type="number" onChange={e=> setBuyerInfo(prev=>({...prev, phone: e.target.value}))}/>
            <Label>Email <span className="text-red-600">*</span></Label>
            <Input placeholder="ejemplo@ejemplo.com" type="email" onChange={e=> setBuyerInfo(prev=>({...prev, email: e.target.value}))}/>
             <Label>Dirección de entrega  <span className="text-red-600">*</span></Label>
            <Input placeholder="Ejemplo: calle 1 # 23-45 apartamento 67" onChange={e=> setBuyerInfo(prev=>({...prev, address: e.target.value}))}/>
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
                </ComboboxOption>)}
            </Combobox>
            {data.comment &&  <div className="border-2 border-dashed border-red-500 m-3 p-2 rounded-lg" >
            <div className="grid grid-cols-5 justify-items-center"><HiExclamation className="text-amber-400 size-6"/><h2 className="font-semibold col-span-3"> ATENCIÓN </h2><HiExclamation className="text-amber-400 size-6"/></div>
            <p>{data.comment}</p></div>}
        </Field>
        <Button disabled={!buyerInfo.name || !buyerInfo.lastName || !buyerInfo.phone || !buyerInfo.email || !buyerInfo.address || !selectedCity} 
        color="yellow" onClick={saveform}>Siguiente</Button>
        {error && <p className="text-sm text-red-600">Algo salió mal: {error}</p>}
        </div>
    )
}