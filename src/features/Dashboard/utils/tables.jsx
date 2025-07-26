import {  HiOutlinePencil, HiOutlineEye   } from "react-icons/hi";
import { stringToTime } from "../../Chat/utils/utils";

export const getDataToShow = (data) => {
    console.log(data)
  return data.map(item => ({
    ...item,
    isActive: item.isActive ? "Activo" : "Inactivo"
  }));
};

export const getHeaders = (name, params, nav)=>{
    const dictionary = {
    products :  [
  {
    header: "Acciones",
    id: "id",
    cell: ({ row }) => (
    <HiOutlinePencil className="mx-2 cursor-pointer hover:text-blue-500 text-lg my-1 justify-self-center" 
        onClick={()=> nav(`/dashboard/${params.module}/edit/${params.option}/${row.original.id}`)}/>),
  },
  { header: "status", accessorKey: "isActive" },
  { header: "Nombre", accessorKey: "name" },
  {header: "Referencia", accessorKey: "reference"},
  {header: "Descripción", accessorKey: "description"},
],

    warehouses :  [
  {
    header: "Acciones",
    id: "id",
    cell: ({ row }) => (
    <HiOutlinePencil className="mx-2 cursor-pointer hover:text-blue-500 text-lg my-1 justify-self-center" 
        onClick={()=> nav(`/dashboard/${params.module}/edit/${params.option}/${row.original.id}`)}/>),
  },
  { header: "status", accessorKey: "isActive" },
  { header: "Nombre", accessorKey: "name" },
  {header: "Dirección", accessorKey: "address"},
  {header: "Teléfono", accessorKey: "cellphone"},
  {header: "Encargad@", accessorKey: "contactName"},
],

 users :  [
  {
    header: "Acciones",
    id: "id",
    cell: ({ row }) => (
    <HiOutlinePencil className="mx-2 cursor-pointer hover:text-blue-500 text-lg my-1 justify-self-center" 
        onClick={()=> nav(`/dashboard/${params.module}/edit/${params.option}/${row.original.id}`)}/>),
  },
  { header: "status", accessorKey: "isActive" },
  { header: "Nombre", accessorKey: "fullname" },
  {header: "email", accessorKey: "email"},
  {header: "rol", accessorKey: "idProfile"},
],

 salesman :  [
  {
    header: "Acciones",
    id: "id",
    cell: ({ row }) => (
    <HiOutlinePencil className="mx-2 cursor-pointer hover:text-blue-500 text-lg my-1 justify-self-center" 
        onClick={()=> nav(`/dashboard/${params.module}/edit/${params.option}/${row.original.id}`)}/>),
  },
  { header: "status", accessorKey: "isActive" },
  { header: "Nombre", accessorKey: "fullname" },
  {header: "email", accessorKey: "email"},
],
offices :  [
  {
    header: "Acciones",
    id: "id",
    cell: ({ row }) => (
    <HiOutlinePencil className="mx-2 cursor-pointer hover:text-blue-500 text-lg my-1 justify-self-center" 
        onClick={()=> nav(`/dashboard/${params.module}/edit/${params.option}/${row.original.id}`)}/>),
  },
  { header: "status", accessorKey: "isActive" },
  { header: "Nombre", accessorKey: "name" },
  {header: "Dirección", accessorKey: "address"},
  {header: "Teléfono", accessorKey: "cellphone"},
  {header: "Encargad@", accessorKey: "contactName"},
]}
 return dictionary[name]}


 export const getOrdersHeaders = (setView)=>{
    return [
  {
    header: "ID",
    accessorKey: "id",
    // cell: ({ row }) => (
    // <HiOutlineEye  className="mx-2 cursor-pointer hover:text-blue-500 text-lg my-1 justify-self-center" 
    //     onClick={()=> setView(row.original)}/>),
  },
  { header: "Número de pedido", accessorKey: "guid" },
  { header: "Producto(s)", accessorKey: "products", 
    cell: ({ row }) => (
    <ul>{row.original.products.map(product=><p>{product.name} - {product.quantity} - ${product.total}</p>)}</ul>)}, 
  { header: "Valor Total", accessorKey: "total"},
  { header: "Fecha", accessorKey: "date"},
  { header: "Cliente", accessorKey: "customerData", 
     cell: ({ row }) => (
    <div>
    <p>{row.original.customerData.name}</p>
    <p>{row.original.customerData.address}</p>
    <p>{row.original.customerData.cellphone}</p></div>)}, 
  { header: "Estado", accessorKey: "status"},
  { header: "Guía", accessorKey: "guide"},
//   { header: "Guía", accessorKey: "guide"},
]
}

export const getOrdersToShow = (data) => {
  return data.map(item => ({
    ...item,
    products: item.lines.map(line => ({ name: line.productName, quantity: line.quantity, total:  Math.round(line.total) })),
    customerData: {name: item.fUllname, address: item.address, cellphone: item.cellphone},
    guide: "Guia de Prueba",
    date: stringToTime(item.docDate),
    total:  Math.round(item.lines.reduce((sum, line) => sum + line.total, 0))
  }));
};