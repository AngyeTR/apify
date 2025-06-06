import { HiArrowCircleRight } from "react-icons/hi";

export const PriceCard = ({price, setDataSet, selected, setPriced})=>{
    return (
        <div key={price.name} className={`border border-dotted border-zinc-400 hover:border-solid rounded-lg w-[350px] p-3 m-2 justify-self-center ${selected && "bg-zinc-200"}`} onClick={()=>{setDataSet(prev=> ({...prev, price: price })); setPriced(price.name)}}>
            <h1 className="mb-2">{price.name} <span className={`bg-${price.tagColor}-600 p-1 rounded-sm shadow-md text-white`}>{price.tag}</span></h1>
            {price.price ? <p className="text-sm text-start justify-self-start font-medium">Total: {price.price}</p> :
            <div className="grid grid-cols-4 items-center"><p className="text-xs italic"> Antes : <span className="line-through">{price.initialPrice}</span></p>
            <HiArrowCircleRight className="size-5 justify-self-center" />
            <p className="text-sm text-start justify-self-start font-medium"> Ahora : <span >{price.finalPrice}</span></p></div>}
        </div>
    )
}