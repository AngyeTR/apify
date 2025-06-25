import { useEffect, useState } from "react";
import { Field, Label } from "../../../../shared/components/uikit/fieldset"
import { Input } from "../../../../shared/components/uikit/input"
import { getCities, getCountries, getStates, getByID, edit, post, postFile, getCustomerByPhone, getCustomerScore } from "../../../../shared/services/API/api"
import { HiExclamation } from "react-icons/hi";
import { useTunnelCart } from "../../hooks/useTunnelCart"
import { Combobox, ComboboxLabel, ComboboxOption } from "../../../../shared/components/uikit/combobox";
import { Select } from "../../../../shared/components/uikit/select";
import { Heading } from "../../../../shared/components/uikit/heading";
import { Button } from "../../../../shared/components/uikit/button";
import { validateEmail } from "../../../../shared/utils/utils";
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage";
import { useReport } from "../../hooks/useReport";

export const CustomerForm = ({data, handleClick, dataSet, setDataSet})=>{
    const [location, setLocation] = useState(null)
    const [product, setProduct] = useState(null)
    const [error, setError] = useState(null)
    const [buyerInfo, setBuyerInfo] = useState({})
    const { createCart}  = useTunnelCart()
    const [store] = useLocalStorage("store")
    const { reportAddToCart } = useReport()


    const saveform = async()=>{
        buyerInfo.idCity = buyerInfo.cityData.id
        buyerInfo.idCompany = store
        buyerInfo.fullName = buyerInfo.firstName + " " + buyerInfo.lastName
        const verifyEmail = validateEmail(buyerInfo.email)
        if(verifyEmail){setError(verifyEmail)}
        else if (buyerInfo.cellphone?.length < 10 || buyerInfo.cellphone[0] != 3) 
            {setError("Formato de teléfono inválido")}
        else {
            console.log("Customer data: ", buyerInfo)
            await getCustomerScore(buyerInfo.cellphone).then(res=> setDataSet(prev=>({...prev, "customerScore": res})))
             const res = await post("Customers", buyerInfo).then(res=> res)
             res.isValid && setDataSet(prev=>({...prev, "customerId": res.data.id})) 
             const customerID = await getCustomerByPhone(1, buyerInfo.cellphone).then(res=> res.data.id)
            customerID && (buyerInfo.id = customerID)
            setDataSet(prev=>({...prev, "customerData":buyerInfo})) 
            console.log("creating 2")
            await createCart(product, buyerInfo).then(res=>setDataSet(prev=>({...prev, cart: res})))
            await reportAddToCart(buyerInfo.email, buyerInfo.cellphone, "fbp", product.price)
            handleClick(1)
        }
    }

    useEffect(() => {
            data && getByID("Products", data?.idProduct).then(res=>setProduct(res.data))
            getCountries().then((res) => setLocation(prev=> ({...prev, "countries": res.data})));
            location?.country && getStates(location.country.id).then((res) => setLocation(prev=> ({...prev, "states": res.data})));
            location?.state && getCities(location.state.id).then((res) => setLocation(prev=> ({...prev, "cities": res.data})));
            location?.state && getCities(location.state.id).then((res) =>console.log(res) );
          }, [ ,data,  location?.country, location?.state ]);

    return ( 
        <div className="justify-center  justify-items-center bg-zinc-50 mt-5 w-[400px] md:w-[600px] rounded-lg p-5">
            <Field className="justify-center w-full max-w-lg">
            <Heading className="text-center">Datos del comprador</Heading>
            <Label>Nombre <span className="text-red-600">*</span></Label>
            <Input placeholder="Nombre" onChange={e=> setBuyerInfo(prev=>({...prev, firstName: e.target.value, "dni": "123456", password:"temporalPass2025."}))}/>
            <Label>Apellido <span className="text-red-600">*</span></Label>
            <Input placeholder="Apellido" onChange={e=> setBuyerInfo(prev=>({...prev, lastName: e.target.value, createdBy:"System", modifiedBy: "System"}))}/>
            <Label>Número Celular <span className="text-red-600">*</span></Label>
            <Input invalid={error?.includes("teléfono")} placeholder="3012345678" type="number" onChange={e=> setBuyerInfo(prev=>({...prev, cellphone: e.target.value}))}/>
            <Label>Email <span className="text-red-600">*</span></Label>
            <Input invalid={error?.includes("email")} placeholder="ejemplo@ejemplo.com" type="email" onChange={e=> setBuyerInfo(prev=>({...prev, email: e.target.value}))}/>
             <Label>Dirección de entrega  <span className="text-red-600">*</span></Label>
            <Input placeholder="Ejemplo: calle 1 # 23-45 apartamento 67" onChange={e=> setBuyerInfo(prev=>({...prev, address: e.target.value}))}/>
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
                onChange={(e)=> { e && setBuyerInfo(prev=>({...prev, "cityData": (e)}))}} placeholder={buyerInfo?.city ? buyerInfo?.city?.name : "Seleccionar ciudad"}>
                {(city) => (
                <ComboboxOption value={city}>
                <ComboboxLabel>{city.name}</ComboboxLabel>
                </ComboboxOption>)}
            </Combobox>
            {data?.description &&  <div className="border-2 border-dashed border-red-500 m-3 p-2 rounded-lg" >
            <div className="grid grid-cols-5 justify-items-center"><HiExclamation className="text-amber-400 size-6"/><h2 className="font-semibold col-span-3"> ATENCIÓN </h2><HiExclamation className="text-amber-400 size-6"/></div>
            <p>{data.description}</p></div>}
        </Field>
        <Button disabled={!buyerInfo.firstName || !buyerInfo.lastName || !buyerInfo.cellphone || !buyerInfo.email || !buyerInfo.address || !buyerInfo.cityData} 
        color="yellow" onClick={saveform}>Siguiente</Button>
        {error && <p className="text-sm text-red-600">Algo salió mal: {error}</p>}
        </div>
    )
}