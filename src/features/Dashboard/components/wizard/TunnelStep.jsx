import { useEffect, useState } from "react"
import { Heading } from "../../../../shared/components/uikit/heading"
import { Input } from "../../../../shared/components/uikit/input"
import { Select } from "../../../../shared/components/uikit/select"
import { getByCompanyId } from "../../../../shared/services/API/api"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"

export const TunnelStep = ({data, setData})=>{
    const [stored] = useLocalStorage("data")
    const [layouts, setLayouts] = useState(null)
    const [layoutsPercent, setLayoutsPercent] = useState([])
    const [total, setTotal] = useState(0)
    const [ error, setError] = useState(null)
    useEffect(()=>{getByCompanyId("Layouts", stored?.company.id).then(res=> setLayouts(res?.data?.filter(item=> item.idProduct== data.productId))) },[])

  const handlePercent=(id, percent) => {
    const filtered = layoutsPercent?.filter(percent=> percent.idLayout != id)
    filtered.push({idLayout: id, percent: percent})
    setLayoutsPercent(filtered)
    const suma = filtered.reduce((subTotal, current) => subTotal + current.percent, 0);
    setTotal(suma)}

    const handleDate=(value, type) =>{
       const now = new Date();
       const date = new Date(value);
       setError(null)
       type == "start" ? ( date <= now ? setError('La fecha de inicio debe ser posterior al momento actual.') : setData(prev=> ({...prev, startDate: value})))
        : (date <= new Date(data.startDate) ? setError('La fecha de fin debe ser posterior a la fecha de inicio') : setData(prev=> ({...prev, endDate: value})) )}

    const render = ()=>{
      if(!layouts) {<p className="my-3">No se encontraron Layouts creados para este producto</p>}
      else if(data.abTesting){return (
          <div>
          <Heading>Layouts de Pruebas A/B</Heading>
          <p>Asigne un procentaje de compradores que verán  cada Layout</p>
          {layouts?.map(layout=> <div className="flex-row"><p className="my-1"> <input className="border border-zinc-400 rounded-md" type="number" min="0" max="100" defaultValue={0}
          onChange={(e)=>handlePercent(layout.id, parseFloat(e.target.value))}/>% {layout.name}</p></div>)}
          <p className="mt-3">Porcentaje asignado: {total}% </p>
          {total != 100 && <p className="text-red-600 text-sm mb-3 max-w-lg">El total asignado debe ser 100% Por favor verifique los porcentajes asignados a los Layouts</p>}
        </div>)}
      else { return (
        <Select onChange={(e)=>setData(prev => ({...prev, "layout": parseInt(e.target.value)})) } className="my-3">
            <option>Selecciona un Layout</option>
            {layouts?.map(layout => <option value={layout.id} key={layout.id}>{layout.name}</option>)}
        </Select>)}}

   return (
     <div className="w-full ">
        <Heading className="my-5 text-center">Tunel de Ventas de Producto</Heading>
        <Input className="my-3 w-sm md:w-lg" onChange={(e)=> setData(prev=> ({...prev, name: e.target.value}))} placeholder="Ingresar el nombre de Tunel"/>
        <Input className="my-3" type="datetime-local" placeholder="Fecha de Inicio" onChange={(e)=> handleDate(e.target.value, "start")} invalid={error?.includes("actual")}/>
        <Input className="my-3" type="datetime-local" placeholder="Fecha de Fin" onChange={(e)=>handleDate(e.target.value, "end")} invalid={error?.includes("fin")}/>
        <Input className="my-3" type="text" placeholder="Comentario Importante" onChange={(e)=> setData(prev=> ({...prev, comment: e.target.value}))}/>
        {render()}
      {error && <p className="text-red-500 my-2">Ups! algo salió mal: {error}</p>}
    </div>
   )}