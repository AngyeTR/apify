import { useEffect, useState } from "react"
import {  getByID } from "../../../../shared/services/API/landingApi"
import { CheckboxField, Checkbox} from "../../../../shared/components/uikit/checkbox"

export const OrderBound = ({id, price, orderBounds, setOrderBounds})=> {
    console.log(orderBounds)
    const [product, setProduct] = useState(null)
   
    useEffect(()=>{const res = getByID("Product", id).then(res => setProduct(res.data))},[])

    const isSelected = orderBounds.some((bound) => bound.id === id);
    console.log(isSelected)

    const handleToggle = () => {
        if (isSelected) {setOrderBounds((prev) => prev.filter((bound) => bound.id !== id))} 
        else {setOrderBounds((prev) => [...prev, { id, price, name: product?.name }]);}
    };

    return (
         <>
       {product && 
        <CheckboxField>
         <Checkbox onChange={handleToggle} name={product?.name} value={id} />
        <div className={`flex w-[350px] justify-self-center place-items-center rounded-lg m-5 ${isSelected ? "border-3 border-green-400" : "border border-zinc-400" }`}>
            <div className="w-[120px] justify-items-center"><img src={product?.images?.[0] ? product?.images?.[0]?.url :   "https://impresorasrenting.com/wp-content/uploads/2021/06/circulocromatico.jpg"} 
            className=" w-[110px] h-[110px]"/></div>
            <div  className="w-[220px]  rounded-lg p-3 m-2 justify-self-center">
                <h1 className="mb-2 font-semibold text-lg">{product?.name} </h1>
                <div className="items-center ">
                <p className="text-sm text-start justify-self-start font-medium"> Solo por hoy  <span className="line-through"> ${Number(product?.price).toLocaleString('es-CO')}</span></p>
                <p className="text-lg font-semibold text-lg">${Number(price).toLocaleString('es-CO')}</p></div>
            </div>
        </div>
        </CheckboxField>}
       </>
    )
}