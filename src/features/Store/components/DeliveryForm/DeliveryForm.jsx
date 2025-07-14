import { useEffect, useState } from "react"
import { Field, Label } from "../../../../shared/components/uikit/fieldset"
import { Input } from "../../../../shared/components/uikit/input"
import { Select } from "../../../../shared/components/uikit/select"
import { Combobox, ComboboxLabel, ComboboxOption } from "../../../../shared/components/uikit/combobox"
import { Switch } from "../../../../shared/components/uikit/switch"
import { edit, getByID, getCities, getCountries, getStates } from "../../../../shared/services/API/landingApi"
import { Button } from "../../../../shared/components/uikit/button"
import { useCart } from "../../hooks/UseCart"
import { useNavigate } from "react-router-dom"

export const DeliveryForm = ({cart})=>{
    console.log(cart)
    const nav = useNavigate()
    const [location, setLocation] = useState(null)
    const [address, setAddress] = useState({})
    const { createCart,updateCart,updateQuantity, updateCartAddress}  = useCart()

    useEffect(() => {
                getCountries().then((res) => setLocation(prev=> ({...prev, "countries": res.data})));
                location?.country && getStates(location.country.id).then((res) => setLocation(prev=> ({...prev, "states": res.data})));
                location?.state && getCities(location.state.id).then((res) => setLocation(prev=> ({...prev, "cities": res.data})));
                location?.state && getCities(location.state.id).then((res) =>console.log(res) );
              }, [ location?.country, location?.state ]);
    
    const handleSave=async()=>{
        const MyCart = cart
        MyCart.address = address.address
        MyCart.idCity = address.cityData.id
        address.defaultAddress && await getByID("Customer", cart.idCustomer).then(res=>edit("Customer", {...res.data, address: address.address, idCity: address.cityData.id}).then(res2=>console.log(res2)))
        const res = await updateCartAddress(MyCart).then(res=> res)
        res && console.log(res)
        setAddress({})
        res && nav(0)
    }

    return (
        <Field className="my-5 p-5 bg-zinc-200 rounded-lg">
        <Input onChange={(e)=>setAddress(prev=> ({...prev, address: e.target.value}))} placeHolder="Ingresar dirección de entrega"/>
        <Label>Pais*</Label>
            <Select name="country" onChange={(e)=> e.target.value && setLocation(prev => ({...prev, "country": JSON.parse(e.target.value)}))}>
                <option value="">Selecciona una opcion</option>
            {location?.countries?.map((country)=> <option value={JSON.stringify(country)} key={country.name}>{country.name}</option>)}
            </Select>
            <Label>Estado/ Departamento*</Label>
            <Select name="state" onChange={(e)=> e.target.value &&  setLocation(prev => ({...prev, "state": JSON.parse(e.target.value)}))}>
                <option value="">Selecciona una opcion</option>
                {location?.states?.map((state)=> <option value={JSON.stringify(state)} key={state.name}>{state.name}</option> )}
            </Select>
            <Label>Ciudad*</Label>
            <Combobox name="city" options={location?.cities ? location.cities : []} displayValue={(city) => city?.name} 
                onChange={(e)=> { e && setAddress(prev=>({...prev, "cityData": (e)}))}} placeholder="Seleccionar ciudad">
                {(city) => (
                <ComboboxOption value={city}>
                <ComboboxLabel>{city.name}</ComboboxLabel>
                </ComboboxOption>)}
            </Combobox>
            <p className="mt-3">Establecer como dirección de la cuenta <Switch onChange={(e)=>setAddress(prev=>({...prev, defaultAddress: e}))}/></p>
            <Button onClick={handleSave} disabled={!address.address || ! address.cityData}>Guardar Dirección </Button>

    </Field>
    )}