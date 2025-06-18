import { useEffect, useState } from "react"
import { Heading } from "../../../../shared/components/uikit/heading"
import { Input } from "../../../../shared/components/uikit/input"
import { Select } from "../../../../shared/components/uikit/select"
import { getByCompanyId } from "../../../../shared/services/API/api"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { Description, Field, Label } from "../../../../shared/components/uikit/fieldset"
import { Switch } from "../../../../shared/components/uikit/switch"

export const TunnelStep = ({data, setData})=>{
    const [stored] = useLocalStorage("data")
    const [layouts, setLayouts] = useState(null)
    const [layoutsPercent, setLayoutsPercent] = useState([])
    const [total, setTotal] = useState(0)
    const [dates, setDates] = useState(false)
    const [ error, setError] = useState(null)
  
  useEffect(()=>{getByCompanyId("Layouts", stored?.company.id).then(res=> setLayouts(res?.data?.filter(item=> item.idProduct== data.idProduct))) },[])
  useEffect(()=>{handleDefaultDate()},[ dates])


  const handlePercent=(id, percent) => {
    const filtered = layoutsPercent?.filter(percent=> percent.idLayout != id)
    filtered.push({idLayout: id, percent: percent})
    setLayoutsPercent(filtered)
    const suma = filtered.reduce((subTotal, current) => subTotal + current.percent, 0);
    setTotal(suma)
  addLayout(id, percent)}

    const handleDate=(value, type) =>{
       const now = new Date();
       const date = new Date(value);
       setError(null)
       type == "start" ? ( date <= now ? setError('La fecha de inicio debe ser posterior al momento actual.') : setData(prev=> ({...prev, initialDate: date.toISOString()})))
        : (date <= new Date(data.initialDate) ? setError('La fecha de fin debe ser posterior a la fecha de inicio') : setData(prev=> ({...prev, endDate: date.toISOString()})) )}
    
    const handleDefaultDate = ()=>{
        const now = new Date();
        const hours = now.getHours()
        !dates ? handleDate(now.setHours(hours + 4), "start") : setData(prev=> ({...prev, initialDate: null}))
        !dates ? handleDate(now.setHours(hours + (365*24)), "end") : setData(prev=> ({...prev, endDate: null}))        }

    const addLayout = (id, percent)=>{
      const toAssign = data.abTesting ? percent : 100 
      const layouts = data.layouts.filter(layout=>layout.idLayout != id)
      id && layouts.push({ isActive: true, createdBy:	stored?.user.email, modifiedBy:	stored?.user.email,
      idLayout: id, percent: toAssign})
      setData(prev=> ({...prev, layouts: layouts})) 
    }

    const render = ()=>{
      if(!layouts) {<p className="my-3">No se encontraron Layouts creados para este producto</p>}
      else if(data.abTesting){return (
          <div>
          <Heading>Layouts de Pruebas A/B<span className="text-red-600">*</span></Heading>
          <p>Asigne un porcentaje de compradores que verán  cada Layout</p>
          {layouts?.map((layout)=> <div className="flex-row"><p className="my-1"> <input className="border border-zinc-400 rounded-md" type="number" min="0" max="100" 
          onChange={(e)=>handlePercent(layout.id, parseFloat(e.target.value))}/>% {layout.name}</p></div>)}
          <p className="mt-3">Porcentaje asignado: {total}% </p>
          {total != 100 && <p className="text-red-600 text-sm mb-3 max-w-lg">El total asignado debe ser 100% Por favor verifique los porcentajes asignados a los Layouts</p>}
        </div>)}
      else { return (
        <>
        <p>Layout de Producto<span className="text-red-600">*</span></p>
        <Select onChange={(e)=> addLayout(parseInt(e.target.value)) } className="my-3">
            <option>Selecciona un Layout</option>
            {layouts?.map(layout => <option value={layout.id} key={layout.id}>{layout.name}</option>)}
        </Select></>)}}

   return (
     <div className="w-full ">
      <Field>
        <Heading className="my-5 text-center">Tunel de Ventas de Producto</Heading>
        <Label>Nombre<span className="text-red-600">*</span></Label>
        <Input className="my-3 w-sm md:w-lg" onChange={(e)=> setData(prev=> ({...prev, name: e.target.value}))} placeholder={data.name? data.name : "Ingresar el nombre de Tunel"}/>
        <p className="my-3">Establecer fechas de Vigencia <Switch checked={dates} onChange={setDates}/></p>
        {dates && <div className="mb-3">
        <Label>Fecha de Inicio<span className="text-red-600">*</span></Label>
        <Input className="my-3" type="datetime-local" placeholder="Fecha de Inicio" onChange={(e)=> handleDate(e.target.value, "start")} invalid={error?.includes("actual")}/>
        <Label>Fecha de Fin<span className="text-red-600">*</span></Label>
        <Input className="my-3" type="datetime-local" placeholder="Fecha de Fin" onChange={(e)=>handleDate(e.target.value, "end")} invalid={error?.includes("fin")}/>
        </div>}
        <Label className="mt-3">Información importante para el comprador </Label>
        <Description>Este comentario será visible durante el proceso de compra</Description>
        <Input defaultValue={data.description} className="mb-3" type="text" placeholder={data.description? data.description :"Comentario Importante"} onChange={(e)=> setData(prev=> ({...prev, description: e.target.value}))}/>
        {render()}

      {error && <p className="text-red-500 my-2">Ups! algo salió mal: {error}</p>}
    </Field>
    </div>
   )}