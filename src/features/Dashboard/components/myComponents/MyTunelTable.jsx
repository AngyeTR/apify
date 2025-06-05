import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
DataTable.use(DT);
import { TableHead, TableHeader, TableRow } from "../../../shared/components/uikit/table"
import { HiOutlinePencil, HiOutlineEye  } from "react-icons/hi";
import { FaClone } from "react-icons/fa6";
import { useRef } from "react";
import { Modal } from "./Modal";
import { Button } from "../../../shared/components/uikit/button";
import { Heading } from "../../../shared/components/uikit/heading";
import { Field, Label } from "../../../shared/components/uikit/fieldset";
import { Combobox, ComboboxLabel, ComboboxOption } from '../../../shared/components/uikit/combobox'
import { Input } from "../../../shared/components/uikit/input";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import { cloneLayoutModel } from "../utils/models";
import { Loader} from "../../../shared/components/Loader.jsx"
import { cloneLayout } from "../../../shared/services/API/api";

const Table  = ({data, headers, setIdToClone}) => {
    const params = useParams()
    const nav = useNavigate()
    const tableRef = useRef(null); 
    const [stored] = useLocalStorage("data")
    data.reverse()
  return (
    <DataTable data={data.reverse()} className="display "  key={params.option} ref={tableRef}  id="myTable"
    slots={{0: (data) => (
    <div className="justify-center" style={{display: "flex"}}>
        <HiOutlinePencil className="mx-2 cursor-pointer hover:text-blue-500 text-lg my-1 justify-self-center" onClick={()=> {nav(`/designer/editor/${data}`)}}/>
        <HiOutlineEye className="mx-2 cursor-pointer hover:text-blue-500 text-lg my-1 justify-self-center" onClick={()=> nav(`/designer/view/${data}`)}/>
        <FaClone className="mx-2 cursor-pointer hover:text-blue-500 text-lg my-1 justify-self-center" onClick={()=> setIdToClone({...cloneLayoutModel(stored), "id": data})}/></div>
    )}}>
      <TableHead>
        <TableRow className="justify-center " >
          {headers.map((option)=><TableHeader key={option}>{option}</TableHeader>)}
        </TableRow>
      </TableHead>
      </DataTable> )} 

export function LayoutsTable(props) {
  const {lay, prod} = props
  const [layouts, setLayouts] = useState(null)
  const [products, setProducts] = useState(null)
  const [idToClone, setIdToClone] = useState(null)
  const [loading, setLoading] = useState(false) 
  const nav = useNavigate()

  const data = layouts?.map(item => [item.id, item.name, products?.filter(product => product.id == item.idProduct)[0].name, item.modifiedDate])
  const headers = ["Acciones", "Nombre", "Producto",  "Fecha modificación"]
  
  const clone = async () =>{
    setLoading(true)
    const res = await cloneLayout(idToClone).then(res=>res)
    res && setLoading(false)
    res.isValid && nav(0)}
  

  useEffect(() => { 
    setLayouts(lay)
    setProducts(prod)
    }, [ ,props]);

 useEffect(()=>{data && render()}, [data])
  const render = ()=> {
    console.log(data)
    if(data?.length > 0 && headers.length > 0 ){
      return (
        <div className="w-[99%] overflow-x-scroll">
        <Table  data={data.reverse()} headers={headers} setIdToClone={setIdToClone}/>
        </div>
      )}}
console.log(idToClone)
  return (
    <>
    { !data  ? <p>Cargando tabla.. </p> : data?.length ==0 ? <p>No se encontraron registros </p> :render()}
    {idToClone && <Modal>
      <div className="bg-zinc-50 rounded-lg w-lg h-[70vh] py-10 justify-items-center"> 
        <Heading className="mb-5">Clonar Layout</Heading>
        <Field className="w-md justify-items-center">
          <Label >Nombre del Nuevo Layout</Label>
          <Input className="w-sm mb-5" placeholder="Inserte de nombre del nuevo Layout" onChange={e=> setIdToClone(prev=> ({...prev, name: e.target.value}))}/>
          <Label>Producto del nuevo Layout</Label>
          <Combobox name="product" options={products ? products : []} displayValue={(product) => product?.name} className="w-sm mb-5"
            onChange={e=> e && setIdToClone(prev=> ({...prev, "idProduct": parseInt(e.id), "productName": e.name}))}  placeholder={idToClone ? idToClone.productName :"Seleccionar Producto"}>
            {(product) => (
            <ComboboxOption value={product}>
              <ComboboxLabel>{product.name}</ComboboxLabel>
            </ComboboxOption>)}
            </Combobox>
        </Field>
      {<Button onClick={clone} className="mx-1" disabled={!idToClone.name || !idToClone.idProduct}>{loading ? <Loader/> :"Clonar"}</Button>}
      <Button onClick={()=>setIdToClone(null)} color="red" className="mx-1">{loading ? <Loader/> : "Cerrar"}</Button></div>
      </Modal>}
    </>)
}