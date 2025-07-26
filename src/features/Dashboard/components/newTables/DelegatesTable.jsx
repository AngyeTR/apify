import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../../shared/components/uikit/table2';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, flexRender} from '@tanstack/react-table';
import { Button } from '../../../../shared/components/uikit/button';
import { Input } from '../../../../shared/components/uikit/input';
import { Select} from "../../../../shared/components/uikit/select"
import { HiOutlineCheck , HiOutlinePencil, HiOutlineTrash  } from "react-icons/hi";
import { getByID, edit as update } from "../../../../shared/services/API/api"
import {  useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTableFunctions } from '../../hooks/useTableFunctions';
import { MyLoader } from '../myComponents/MyLoader';

export const  DelegatesTable = ({data})=>{
  const nav = useNavigate()
  const [globalFilter, setGlobalFilter] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const tableColumns = [
  { header: "Nombre", accessorKey: "fullname" },
  { header: "Email", accessorKey: "email" },
  { header: "Invitación",
  accessorKey: "status",
  cell: ({ row }) => {
    const item = row.original;
    return edit?.id === item.id ? (
      <div className="w-[150px]">
        <Select onChange={(e) => setNewStatus(e.target.value)} defaultValue={item.status}>
          <option value={0}>Seleccione</option>
          <option value={2}>Re-enviar</option>
          <option value={4}>Revocar</option>
        </Select>
      </div>) : 
      (<span>{getInvitationStatus(item.status)}</span>);
  }
  },
  { header: "Acciones",
    id: "actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        {!edit ? <HiOutlinePencil
          onClick={(e) => {
            e.preventDefault()
            setEdit(row.original);
            setNewStatus(row.original.status);
          }}
          className="text-blue-500 cursor-pointer"
        /> :
        <HiOutlineCheck onClick={saveChange} className="text-green-500 cursor-pointer" />}
      </div>),
  }];
  const headers = tableColumns
  const { handleCopy, handleExportExcel, handleExportPDF, isExporting } = useTableFunctions({data, headers ,fileName: 'Delegados'});
  const [ edit, setEdit] = useState(null)
  const [ newStatus, setNewStatus] = useState(null)
  const [delegates, setDelegates] = useState([])
  const saveChange = async()=>{
    edit.status = parseInt(newStatus)
    const res = await update("Delegates", edit).then(res=> res)
    res.isValid  && nav(0)   }
  
  const getInvitationStatus = (status) =>{
    const options = {1: "Abierta", 2:"Enviada", 3:"Aprobada", 4:"Revocada", 5:"Rechazada"}
    return options[status] }

  useEffect(() => {data.map(item=> getByID("Users", item.idUser).then(res => setDelegates(prev => [...prev, {...item, ["fullname"]: res.data.fullname, ["email"]: res.data.email , ["status"]: item.status}])))  }, [ , data]);
    
  const table = useReactTable({
    data: delegates,
    columns: tableColumns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: undefined,
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Input className="max-w-[300px]" type="text" placeholder="Buscar ..." value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} disabled={isLoading || data.length === 0}/>
         <Button onClick={handleCopy} disabled={isLoading || isExporting || data.length === 0}>
          {isExporting ? <MyLoader /> : null} {isExporting ? 'Copiando...' : 'Copiar'}
        </Button>
        <Button onClick={handleExportExcel} disabled={isLoading || isExporting || data.length === 0}>
          {isExporting ? <MyLoader  /> : null}
          {isExporting ? 'Exportando...' : 'Excel'}
        </Button>
        <Button  onClick={handleExportPDF} disabled={isLoading || isExporting || data.length === 0}>
          {isExporting ? <MyLoader  /> : null}
          {isExporting ? 'Exportando...' : 'PDF'}
        </Button>
      </div>
      <div className="rounded-md border">
        <Table className="">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="">
                <TableCell colSpan={tableColumns.length} className="h-24 text-center">No se encontraron Delegados.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {data.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between py-2 text-sm gap-2">
          <div className="text-muted-foreground">
            {table.getFilteredRowModel().rows.length} registros
          </div>
          <div className="space-x-2">
            <Button  size="sm" variant="outline" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              Anterior
            </Button>
            <Button size="sm" variant="outline" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Siguiente
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

