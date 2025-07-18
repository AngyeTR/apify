// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableHead,
//   TableCell,
// } from '../../../../shared/components/uikit/table2';
// import {
//   useReactTable,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   flexRender,
// } from '@tanstack/react-table';

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
//       const newData = []
//     data.map(d=> newData.push({Acciones: d[0], Activo:d[1], Nombre: d[2], Email: d[3], Rol: d[4]}))
//   const table = useReactTable({
//     data: newData,
//     columns: headers,
//     state: { globalFilter },
//     onGlobalFilterChange: setGlobalFilter,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     // Deshabilitar la ordenación para evitar las flechas
//     getSortedRowModel: undefined,
//   });
// console.log(data)
//   console.log(headers)

//      return (
//     <div className="space-y-4">
//       <div className="flex flex-wrap items-center gap-2">
//         <Input
//           className="max-w-[300px]"
//           type="text"
//           placeholder="Buscar ..."
//           value={globalFilter}
//           onChange={(e) => setGlobalFilter(e.target.value)}
//           // disabled={isLoading || data.length === 0}
//         />
//       </div>

//       <div className="rounded-md border">
//         <Table className="">
//           <TableHeader className="">
            
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id} className="">
//                 {headerGroup.headers.map((header) => (
//                   <TableHead key={header.id} className="">
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(header.column.columnDef.header, header.getContext())}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody className="">
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow key={row.id} className="">
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id} className="">
//                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow className="">
//                 <TableCell colSpan={tableColumns.length} className="h-24 text-center">
//                   No se encontraron clientes.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>

//         </Table>
//       </div>

//       {data.length > 0 && (
//         <div className="flex flex-col sm:flex-row items-center justify-between py-2 text-sm gap-2">
//           <div className="text-muted-foreground">
//             {table.getFilteredRowModel().rows.length} registros
//           </div>
//           <div className="space-x-2">
//             <Button
//               className=""
//               size="sm"
//               variant="outline"
//               onClick={() => table.previousPage()}
//               disabled={!table.getCanPreviousPage()}
//             >
//               Anterior
//             </Button>
//             <Button
//               className=""
//               size="sm"
//               variant="outline"
//               onClick={() => table.nextPage()}
//               disabled={!table.getCanNextPage()}
//             >
//               Siguiente
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );


    } 

export function MyTable({ data }) {
  const params = useParams()
  const nav = useNavigate()
   const [newData, headers] =  getDataToShow(data, params.option)
   const [ globalFilter, setGlobalFilter] = useState("")
//    const [ isLoading, setIsLoading] = useState(false)
  
  
  
//    let newHeaders = [{
//     header: "Acciones",
//     accessorKey: "actions",
//     cell: ({ row }) => {
//       const item = row.original;
//       return <HiOutlinePencil className="mx-2 cursor-pointer hover:text-blue-500 text-lg my-1 justify-self-center" 
//            onClick={()=> nav(`/dashboard/${params.module}/edit/${params.option}/${item.id}`)}/>
//     }
//   } ]

//   console.log(headers)
//   headers.shift()
//   console.log(headers)
//   headers.map(h=> newHeaders.push({header:h, accessorKey:h}))
// console.log(newHeaders)
 


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