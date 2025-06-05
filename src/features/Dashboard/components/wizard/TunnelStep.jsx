import { useEffect, useState } from "react"
import { Heading } from "../../../../shared/components/uikit/heading"
import { CheckboxGroup, CheckboxField, Checkbox } from "../../../../shared/components/uikit/checkbox"
import { Label } from "../../../../shared/components/uikit/fieldset"
import { Input } from "../../../../shared/components/uikit/input"
import { Select } from "../../../../shared/components/uikit/select"
import { getByCompanyId } from "../../../../shared/services/API/api"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"

const paymentOptions = [{name:"Efectivo Contraentrega"}, {name: "Pago online"}]
export const TunnelStep = ({data, setData})=>{
    const [stored] = useLocalStorage("data")
    const [ products, setProducts] = useState(null)
    const [ error, setError] = useState(null)
    const methods = [{name:"Efectivo Contraentrega"}, {name: "Pago online"}]
    useEffect(()=>{getByCompanyId("Products", stored?.company.id).then(res=> setProducts(res.data))
          setData(prev=>({...prev, paymentMethods : methods}))
    }
,[])

    const handlePaymentMethod = (name, value) =>
    {
      const options = data.paymentMethods
     const index = options.findIndex(obj => obj.name === name)
     options[index].value = value
     setData(prev=>({...prev, paymentMethods : options}))
    }

    const handleDate=(value, type) =>{
       const now = new Date();
       const date = new Date(value);
       setError(null)
       type == "start" ? ( date <= now ? setError('La fecha de inicio debe ser posterior al momento actual.') : setData(prev=> ({...prev, startDate: value})))
        : (date <= new Date(data.startDate) ? setError('La fecha de fin debe ser posterior a la fecha de inicio') : setData(prev=> ({...prev, endDate: value})) )
    }

   return (
     <div>
{console.log(data)}

        <Heading className="my-5 text-center">Tunel de Ventas</Heading>
        <Input className="my-3" onChange={(e)=> setData(prev=> ({...prev, name: e.target.value}))} placeholder="Ingresar el nombre de Tunel"/>
        <Select className="my-3" onChange={(e)=>setData(prev=> ({...prev, productId: parseInt(e.target.value)}))}>
            <option>Seleccione un producto</option>
            {products?.map(prod => <option value={prod.id} key={prod.id}>{prod.name}</option>)}
        </Select>
        <Input className="my-3" type="datetime-local" placeholder="Fecha de Inicio" onChange={(e)=> handleDate(e.target.value, "start")}/>
        <Input className="my-3" type="datetime-local" placeholder="Fecha de Fin" onChange={(e)=>handleDate(e.target.value, "end")}/>
        <Input className="my-3" type="text" placeholder="Comentario Importante" onChange={(e)=> setData(prev=> ({...prev, comment: e.target.value}))}/>
        <CheckboxGroup >
        {methods?.map(method=> <CheckboxField className="my-3" key={method.name}>
          <Checkbox  onChange={(e)=> handlePaymentMethod(method.name, e)} name={method.name} value={method.name} />
          <Label>{method.name}</Label>
        </CheckboxField>)}
      </CheckboxGroup>
      {error && <p className="text-red-500">Ups! algo salió mal: {error}</p>}
    </div>
   )
}