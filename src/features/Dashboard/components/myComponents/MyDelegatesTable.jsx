import { TableHead, TableHeader, TableRow, Table, TableBody, TableCell } from "../../../../shared/components/uikit/table"
import { HiOutlineCheck , HiOutlinePencil  } from "react-icons/hi";
import { Button } from "../../../../shared/components/uikit/button"
import { getByID } from "../../../../shared/services/API/api"
import {  useState, useEffect } from "react"

export const MyDelegatesTable = ({profiles, data})=> {
    const headers = [{name:"Nombre", key:"name"}, {name: "Email", key:"email"}, {name: "Invitación", key: "idProfile"}, {name: "Estado", key:"isActive"}]
    const [ edit, setEdit] = useState(null)
    const [delegates, setDelegates] = useState([])
    const handleChange=(id, value)=>{
        let newItem = edit
        newItem[id] = value
        setEdit(newItem)}
    const saveChange = ()=>{
        console.log("saving", edit)
    }

        const data1 = [{email: "a@a.com", idDelegate:10, idProfile:1, isActive:true, name:"Delegado1", id:1},
            {email: "a@abc.com", idDelegate:9, idProfile:2, isActive:false, name:"Delegado1", id:2},
            {email: "a@abcde.com", idDelegate:11, idProfile:1, isActive:true, name:"Delegado1", id:3},]

    useEffect(() => {data1?.map(item=> getByID("Users", item.idDelegate).then(res => setDelegates(prev => [...prev, {...item, ["fullname"]: res.data.fullname, ["idProfile"]: res.data.idProfile, ["email"]: res.data.email}]))) }, []);

    
console.log(delegates)
    return ( 
    <Table className="w-full">
        <TableHead>
            <TableRow>
            {headers.map(header => <TableHeader>{header.name}</TableHeader>)}
                <TableHeader>Cambios</TableHeader>
            </TableRow>
        </TableHead>
        <TableBody>
            {delegates?.map(item=> console.log(item))}
        {delegates?.map((item) => (<TableRow >
            <TableCell className="font-medium">{item.fullname}</TableCell>
            <TableCell className="font-medium">{item.email}</TableCell>
            <TableCell className="font-medium">
            {edit?.id == item.id ? <select  defaultValue={item.idProfile} name="idProfile" onChange={(e)=>handleChange("idProfile" , parseInt(e.target.value))} className="group relative w-20 m-2 p-1 border border-zinc-400 rounded-lg">
            { profiles?.map((profile)=> <option value={profile.id}>{profile.name}</option>)}</select> 
            : profiles?.filter((profile)=>profile.id == item.idProfile)[0].name}
            </TableCell>
            <TableCell className="font-medium">
            {edit?.id == item.id ? <select  defaultValue={item.idProfile} name="isActive" onChange={(e)=>handleChange("isActive" , e.target.value == "true")} className="group relative w-20 m-2 p-1 border border-zinc-400 rounded-lg">
            <option value={true}>Activo</option><option value={false}>Inactivo</option></select> 
            : item.isActive ? "Activo" : "Inactivo"}         
            </TableCell>
            <TableCell className="font-medium">
            {edit?.id == item.id ? <Button onClick={()=>saveChange()}><HiOutlineCheck className="size-4"/></Button> : 
            //  <Button onClick={()=>console.log(item)}><HiOutlinePencil className="size-4"/></Button>}
             <Button onClick={()=>setEdit(item)}><HiOutlinePencil className="size-4"/></Button>}
            </TableCell>
        </TableRow>))}
      </TableBody>
    </Table>
    )}