import { NavLink } from "react-router-dom"
import { Stars } from "../Stars/Stars"
import logo from "../../../../assets/gallery-icon.png"

export const CardProduct =(props)=>{
    const data = props.data
    const url = (data?.images?.length != 0  ? data?.images?.[0]?.url : logo)
    return (
    <NavLink to={`/store/product/${data.id}`} className="group">
      <img src={url} alt={data.description} className="aspect-square w-full rounded-lg bg-zinc-200 object-cover group-hover:opacity-75 xl:aspect-7/8"/>
      <h3 className="mt-4 text-sm text-zinc-700">{data.name}</h3>
      <div className="flex justify-center">
        <Stars maxScore={5} score={0} />
        <p className="ml-2"> 0 comentarios</p>
      </div>
      <p className="mt-1 text-lg font-medium text-zinc-900">$ {data.price ? data.price : 0.00 }</p>
    </NavLink>
)}