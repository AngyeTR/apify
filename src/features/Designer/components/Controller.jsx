import { HiOutlinePhotograph, HiOutlineLink, HiOutlineCash , HiOutlineFilm,  } from "react-icons/hi";
import { HiMiniH1 , HiMiniH3, HiOutlineSquaresPlus, HiOutlineCurrencyDollar   } from "react-icons/hi2";
import { LuGalleryHorizontal } from "react-icons/lu";


const dictionary =  {
    payment: "Boton de pago",
    button: "Botón",
    text: "Texto",
    title: "Título ",
    image: "Imagen",
    video: "Video",
    comparer: "Comparador",
    carousel: "Galería",
blank: "espacio vacio"}
 
const renderIcon = (type)=> {
    const icons = {
        payment: <HiOutlineCurrencyDollar  className="size-5" />,
        button: <HiOutlineLink className=" size-5" />,
        text: <HiMiniH3 className=" size-5" />,
        title: <HiMiniH1 className=" size-5" />,
        image: <HiOutlinePhotograph className=" size-5"/>,
        video: <HiOutlineFilm className=" size-5"/>,
        comparer: <HiOutlineCash  className=" size-5" />,
        blank: <HiOutlineSquaresPlus className=" size-5" />,
        container: <HiOutlineSquaresPlus   className=" size-5" />,
        carousel: <LuGalleryHorizontal   className="size-5" />,
    }
        return icons[type]}

export const Controller = ({type, handleClick})=>{
    return (
        <div onClick={()=> handleClick(type)} 
        className="py-1 px-1 rounded-lg m-1 justify-center justify-items-center bg-zinc-100 hover:border hover: border-zinc-500">
            <p className="hidden  md:visible md:block md:text-[10px] text-center">{dictionary[type]}</p>
            {renderIcon(type)}
        </div>)
}