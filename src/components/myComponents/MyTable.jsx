import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table"
import { HiOutlinePencil, HiOutlineTrash  } from "react-icons/hi";


export function MyTable({ users }) {
  return (
    <Table className="[--gutter:--spacing(6)] sm:[--gutter:--spacing(8)]">
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Role</TableHeader>
          <TableHeader>Email</TableHeader>
          <TableHeader>Access</TableHeader>
          <TableHeader>Actions</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.email}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="text-zinc-500">{user.access}</TableCell>
            <TableCell className="flex">
                <HiOutlinePencil className="mx-2 cursor-pointer hover:text-blue-500 text-lg my-1"/>
                <HiOutlineTrash className="mx-2 cursor-pointer hover:text-red-500 text-lg my-1"/>

            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}