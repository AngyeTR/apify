import { useNavigate, useParams } from "react-router-dom"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { Avatar } from "../avatar"
import {Text} from "../text"
import { Button } from "../button"
import { hexToRgba } from "../../utils/functions"

export const MyGeneralInfo = ()=>{
    const nav = useNavigate()
    const params = useParams()
    const [stored] = useLocalStorage("data")
    const status = new Date() >= new Date(stored.subscription.startDate) && new Date() <= new Date(stored.subscription.endDate) ? "Activo" : "Inactivo"
    const secColor = stored.company.secondaryColor ? hexToRgba(stored.company.secondaryColor, 0.3) : null

    return (
  <div className="mx-auto max-w-7xl px-6  py-10 text-center lg:px-8">
    <div className="mx-auto max-w-2xl">
      <h2 className={`text-34l font-semibold tracking-tight text-balance sm:text-4xl`}>{stored.company.name}</h2>
    </div>
    <ul role="list" className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none">
      <li className="shadow-xl rounded-lg" style={{backgroundColor: secColor}}>
        <Avatar className="size-60 shadow-xl my-4 bg-zinc-50" src={stored.company.urlLogo}/>
        <h3 className={`mt-6  font-semibold tracking-tight `}>Información de la compañía</h3>
        <Text className="text-sm/6 text-gray-600">Nombre: {stored.company.name}</Text>
        <p className="text-sm/6 text-gray-600">Plan: {stored.subscription.type}</p>
        <p className="text-sm/6 text-gray-600">Estado: {status}</p>
        <Button className="my-6" onClick={()=> nav(`/${params.module}/edit/${params.option}/${stored.company.id}`)}>Editar</Button>
      </li>
      <li className={`shadow-xl rounded-lg`} style={{backgroundColor: secColor}}>
        <Avatar className="size-60 shadow-xl my-4 bg-zinc-50" src={stored.user.avatar}/>
        <h3 className={`mt-6  font-semibold  tracking-tight `}>Información del Usuario</h3>
        <p className="text-sm/6 text-gray-600">Nombre: {stored.user.fullname}</p>
        <p className="text-sm/6 text-gray-600">Email: {stored.user.email}</p>
        <p className="text-sm/6 text-gray-600">Estado: {status}</p>
        <Button className="my-6" onClick={()=> nav(`/${params.module}/edit/users/${stored.user.id}`)}>Editar</Button>
      </li>

    </ul>
</div>

    )
}

