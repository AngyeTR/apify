import { TableHead, TableHeader, TableRow, Table, TableBody, TableCell } from "../../../../shared/components/uikit/table"
import { HiOutlineCheck , HiOutlinePencil, HiOutlineTrash  } from "react-icons/hi";
import { Button } from "../../../../shared/components/uikit/button"
import { Select} from "../../../../shared/components/uikit/select"
import { getByID, edit as update } from "../../../../shared/services/API/api"
import {  useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

export const MyDelegatesTable = ({ data})=> {
    const nav = useNavigate()
    const headers = [{name:"Nombre", key:"name"}, {name: "Email", key:"email"}, {name: "Invitación", key: "idProfile"},]
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

    useEffect(() => {data.map(item=> getByID("Users", item.idUser).then(res => setDelegates(prev => [...prev, {...item, ["fullname"]: res.data.fullname, ["email"]: res.data.email , ["status"]: item.status}])))  }, [data]);
    
    return ( 
    <Table className="w-full z-0">
        <TableHead>
            <TableRow>
            {headers.map(header => <TableHeader key={header.name}>{header.name}</TableHeader>)}
                <TableHeader>Acciones</TableHeader>
            </TableRow>
        </TableHead>
        <TableBody className="z-0">
        {delegates?.map((item) => (<TableRow key={item.id}>
            <TableCell className="font-medium z-0">{item.fullname}</TableCell>
            <TableCell className="font-medium">{item.email}</TableCell>
            <TableCell className="font-medium">
            {edit?.id == item.id ? <div className="w-[150px]"><Select onChange={e=> setNewStatus(e.target.value)}>
                <option value={0} >Seleccione</option>
                <option value={2} >Re-enviar</option>
                <option value={4} >Revocar</option>
            </Select></div>: 
             <span>{getInvitationStatus(item.status)}</span>} 
            </TableCell>
            <TableCell className="font-medium">
            {edit?.id == item.id ? <><Button color="blue" onClick={saveChange} disabled={!newStatus || newStatus == 0}>Guardar</Button>
            <Button color="red"  onClick={()=>{setEdit(null); setNewStatus(null)}}>Cancelar</Button></> : 
             <Button color="blue" onClick={()=>setEdit(item)}><HiOutlinePencil  className="size-4"/></Button>}
            </TableCell>
        </TableRow>))}  
      </TableBody>
    </Table>
    )}