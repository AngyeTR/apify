import { useNavigate, useParams } from "react-router-dom";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
DataTable.use(DT);
import { TableHead, TableHeader, TableRow } from "../../../../shared/components/uikit/table"
import { Navbar, NavbarSection,} from '../../../../shared/components/uikit/navbar'
import { Button } from "../../../../shared/components/uikit/button"
import { Input } from '../../../../shared/components/uikit/input';
import {  } from "react-icons/hi";
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlusCircle  } from "react-icons/hi";
import { getDataToShow } from "../../utils/functions";
import { useRef, useState } from "react";

const NewTable  = ({data, headers, globalFilter, setGlobalFilter}) => {
  const params = useParams()
  const nav = useNavigate()
  const tableRef = useRef(null); 

  return ( 
    <DataTable data={data} className="display "  key={params.option} ref={tableRef} 
    slots={{0: (data) => (
          <HiOutlinePencil className="mx-2 cursor-pointer hover:text-blue-500 text-lg my-1 justify-self-center" 
          onClick={()=> nav(`/dashboard/${params.module}/edit/${params.option}/${data}`)}/> )}}>
      <TableHead>
        <TableRow className="justify-center ">
          {headers.map((option)=><TableHeader key={option}>{option}</TableHeader>)}
        </TableRow>
      </TableHead>
      </DataTable> )
    } 

export function MyTable({ data }) {
  const params = useParams()
  const nav = useNavigate()
   const [newData, headers] =  getDataToShow(data, params.option)
   const [ globalFilter, setGlobalFilter] = useState("")
  const render = ()=> {
    console.log(headers)
    console.log(newData)
    if(newData.length > 0 && headers.length > 0 ){
      return (
        <div className="w-[99%] overflow-x-scroll">
          {/* <NewTable  data={newData} headers={newHeaders} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter}/> */}
          <NewTable  data={newData} headers={headers} />
        </div>
)}}

  return (
    <>
    <Navbar className="grid grid-flow-col justify-items-end" >
      <NavbarSection>
          <Button  onClick={()=> nav(`/dashboard/${params.module}/add/${params.option}`)}>Añadir registro</Button>
          {params.option == "salestunnel" &&  <Button  onClick={()=> nav(`/dashboard/${params.module}/tunnels`)}>Ver Túneles</Button>}
      </NavbarSection>
    </Navbar>
    { 
        !data?.length && !headers?.length ? <p>Cargando tabla...</p> : data?.length ==0 ? <p>No se encontraron registros</p> :render()
        }
    </>)
}