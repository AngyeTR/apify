import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../../shared/components/uikit/table2';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, flexRender} from '@tanstack/react-table';
import { Button } from '../../../../shared/components/uikit/button';
import { Input } from '../../../../shared/components/uikit/input';
import {  useState, } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDataToShow, getHeaders } from '../../utils/tables';
import { Navbar, NavbarSection } from '../../../../shared/components/uikit/navbar';
import { useTableFunctions } from '../../hooks/useTableFunctions';
import { MyLoader } from '../myComponents/MyLoader';


const NewTable  = ({data, headers, globalFilter, setGlobalFilter, isLoading}) => {
  const { handleCopy, handleExportExcel, handleExportPDF, isExporting } = useTableFunctions({data,headers,fileName: 'Registros'});
   const table = useReactTable({
    data: data,
    columns: headers,
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
        <Input className="max-w-[300px]" type="text" placeholder="Buscar ..." value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} disabled={isLoading || data.length === 0} />
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
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
                <TableCell colSpan={tableColumns.length} className="h-24 text-center">
                  No se encontraron registros.
                </TableCell>
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
            <Button size="sm" variant="outline" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
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

export function ModulesTable({ data }) {
    const params = useParams()
    const nav = useNavigate()
    const [ globalFilter, setGlobalFilter] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const headers = getHeaders( params.option, params, nav)
    const newData = getDataToShow(data)

  const render = ()=> {
    if(newData.length > 0 && headers.length > 0 ){
      return (
        <div className="w-[99%] overflow-x-scroll">
          <NewTable  data={newData} headers={headers} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} isLoading={isLoading}/>
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
    { !data?.length && !headers?.length ? <p>Cargando tabla...</p> : data?.length ==0 ? <p>No se encontraron registros</p> :render()}
    </>)
}