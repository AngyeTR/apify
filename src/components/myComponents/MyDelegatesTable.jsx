import { TableHead, TableHeader, TableRow, Table, TableBody, TableCell } from "../../components/table"
import { Switch } from "../../components/switch"
import { Button } from "../button"

export const MyDelegatesTable = ({profiles, data})=> {
    const headers = [{name:"Nombre", key:"name"}, {name: "Email", key:"email"}, {name: "Perfil", key: "idProfile"}, {name: "Estado", key:"isActive"}]

    return ( 
        <Table className="w-2xl">
                <TableHead>
                    <TableRow>
                        {headers.map(header => <TableHeader>{header.name}</TableHeader>)}
                        <TableHeader>Cambios</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
                        
                        <TableRow >
                         {/* { headers.map((clave)=><TableCell className="font-medium">{item[clave.key]}</TableCell>) } */}
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="font-medium">{item.email}</TableCell>
                    <TableCell className="font-medium">
                    <select defaultValue={item.idProfile} name="idProfile" onChange={(e)=>setProfile(e.target.value)} className="group relative w-40 m-2 p-1 border border-zinc-400 rounded-lg">
                    <option value={item.idProfile}>{profiles?.filter((profile)=>profile.id == item.idProfile)[0].name}</option>
                    { profiles?.map((profile)=> <option value={profile.id}>{profile.name}</option>)}
                </select>
                    </TableCell>
                    <TableCell className="font-medium"><Switch checked={item.isActive}  /></TableCell>
                    <TableCell className="font-medium"><Button>Guardar</Button> </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    )
}