import { RadioField, Radio } from "../../../../shared/components/uikit/radio";

export const PriceCard = ({price, selected})=>{
    console.log(price, selected)
    return (
        <RadioField><Radio 
        // value={price} 
        value={price.name}
        />
        <div key={price.name} className={`relative   rounded-lg w-[350px] p-3 m-2 justify-self-center ${selected ? "border-3 border-solid  border-green-400": "border border-dotted border-zinc-400 "}`} 
        // onClick={()=>{setDataSet(prev=> ({...prev, price: price })); setPriced(price.name)}}
        >
            {price.tagName && <div><p className={`absolute -top-1 -right-2  bg-${price.tagColor}-600 p-1 rounded-sm shadow-lg/30 text-white`}>{price.tagName}</p></div>}            
            <h1 className="mb-2 text-lg font-semibold">{price.name} </h1>
            {!price.oldPrice ? <p className="text-md text-start justify-self-start font-medium"><span className="font-semibold"> ${Number(price.price).toLocaleString('es-CO')}</span></p> :
            <div className="">
            <p><span className="line-through text-zinc-600">${Number(price.oldPrice).toLocaleString('es-CO')}</span>  <span className="font-semibold text-md"> ${Number(price.price).toLocaleString('es-CO')}</span></p>    
            </div>}
        </div></RadioField>
    )
} 