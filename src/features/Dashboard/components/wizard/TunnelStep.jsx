import { useEffect, useState } from "react"
import { Heading } from "../../../../shared/components/uikit/heading"
import { CheckboxGroup, CheckboxField, Checkbox } from "../../../../shared/components/uikit/checkbox"
import { Label } from "../../../../shared/components/uikit/fieldset"
import { Input } from "../../../../shared/components/uikit/input"
import { Select } from "../../../../shared/components/uikit/select"
import { getByCompanyId } from "../../../../shared/services/API/api"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"

const paymentMethods = ["Efectivo Contraentrega", "Pago online",]
export const TunnelStep = ({data, setData})=>{
    const [stored] = useLocalStorage("data")
    const [ products, setProducts] = useState(null)
    useEffect(()=>{getByCompanyId("Products", stored?.company.id).then(res=> setProducts(res.data))},[])

    const handlePaymentMethod = (name, value) =>
    {

    }

   return (
     <div>
        <Heading className="my-5">Tunel de Ventas</Heading>
        {console.log(products)}
        <Input className="my-3" onChange={(e)=> setData(prev=> ({...prev, name: e.target.value}))} placeholder="Ingresar el nombre de Tunel"/>
        <Select className="my-3" onChange={(e)=>setData(prev=> ({...prev, productId: parseInt(e.target.value)}))}>
            {products?.map(prod => <option value={prod.id}>{prod.name}</option>)}
        </Select>
        <Input className="my-3" type="date" placeholder="Fecha de Inicio" onChange={(e)=> setData(prev=> ({...prev, startDate: e.target.value}))}/>
        <Input className="my-3" type="date" placeholder="Fecha de Fin" onChange={(e)=> setData(prev=> ({...prev, endDate: e.target.value}))}/>
        <Input className="my-3" type="text" placeholder="Comentario Importante" onChange={(e)=> setData(prev=> ({...prev, comment: e.target.value}))}/>
        <CheckboxGroup onChange={(e)=> console.log(e.target.value)}>
        {paymentMethods.map(method=> <CheckboxField className="my-3">
          <Checkbox  onChange={(e)=> handlePaymentMethod(method, e)} name={method} value={method} />
          <Label>{method}</Label>
        </CheckboxField>)}
      </CheckboxGroup>
    </div>
   )
}