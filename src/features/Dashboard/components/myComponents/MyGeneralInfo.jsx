import { useNavigate, useParams } from "react-router-dom"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { Avatar } from "../../../../shared/components/uikit/avatar"
import {Text} from "../../../../shared/components/uikit/text"
import { Button } from "../../../../shared/components/uikit/button"
import { hexToRgba } from "../../../../shared/utils/utils"

export const MyGeneralInfo = ()=>{
    const nav = useNavigate()
    const params = useParams()
    const [stored] = useLocalStorage("data")
    const status = new Date() >= new Date(stored.subscription.startDate) && new Date() <= new Date(stored.subscription.endDate) ? "Activo" : "Inactivo"
    const secColor = stored.company.secondaryColor ? hexToRgba(stored.company.secondaryColor, 0.3) : null

    return (
  <div className="mx-auto max-w-7xl px-6  py-4 text-center lg:px-8">
    <div className="mx-auto max-w-2xl">
      <h2 className={`text-34l font-semibold tracking-tight text-balance sm:text-4xl`}>{stored.company.name}</h2>
    </div>
    <ul role="list" className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none">
      <li className="border-zinc-300 border bg-zinc-100 rounded-lg" >
        <Avatar className="size-30 shadow-xl mt-4 bg-zinc-50" src={stored.company.urlLogo}/>
        <h3 className={`mt-6  font-semibold tracking-tight `}>Información de la compañía</h3>
        <Text className="text-sm/6 text-gray-600">Nombre: {stored.company.name}</Text>
        <p className="text-sm/6 text-gray-600">Plan: {stored.subscription.type}</p>
        <p className="text-sm/6 text-gray-600">Estado: {status}</p>
        <Button className="my-6" onClick={()=> nav(`/dashboard/${params.module}/edit/${params.option}/${stored.company.id}`)}>Editar</Button>
      </li>
      <li className="border-zinc-300 border bg-zinc-100 rounded-lg" >
        <Avatar className="size-30 shadow-xl mt-4 bg-zinc-50" src={stored ?.user.avatar}/>
        <h3 className={`mt-6  font-semibold  tracking-tight `}>Información del Usuario</h3>
        <p className="text-sm/6 text-gray-600">Nombre: {stored ?.user.fullname}</p>
        <p className="text-sm/6 text-gray-600">Email: {stored ?.user.email}</p>
        <p className="text-sm/6 text-gray-600">Estado: {status}</p>
        <Button className="my-6" onClick={()=> nav(`/dashboard/${params.module}/edit/users/${stored ?.user.id}`)}>Editar</Button>
      </li>
    </ul>
    <div className="mt-2 rounded-lg" >
        <h3 className={`pt-6  font-semibold  tracking-tight `} >Carga Masiva</h3>
        <p className="text-sm/6 text-gray-600 mx-4">Puede cargar información de clientes, stocks o precios que hayan sido previamente almacenados en otro medio.</p>
        <Button className="my-2" onClick={()=>nav("/dashboard/upload")}>Realizar carga masiva</Button>
      </div>
      <div className="mt-1 rounded-lg" >
        <h3 className={`pt-6  font-semibold  tracking-tight `} >Gestionar Usuarios Delegados</h3>
        <p className="text-sm/6 text-gray-600 mx-4">Puede consultar, autorizar y retirar permisos a delegados</p>
        <Button className="my-2" onClick={()=>nav("/dashboard/delegates")}>Delegados</Button>
      </div>
</div>

    )
}

