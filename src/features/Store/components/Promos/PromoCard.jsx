import { Button } from "../../../../shared/components/uikit/button"
import { hexToRgba } from "../../../../shared/utils/utils"
import { Stars } from "../Stars/Stars"
import { Fieldset, Legend } from "../../../../shared/components/uikit/fieldset"
import logo from "../../../../assets/gallery-icon.png"

export const PromoCard = ({data})=>{
    return (  
      <div className=" w-300 transform text-left text-base transition xs:my-4 xs:max-w-2xl md:px-4 xs:max-w-4xl relative flex flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xs:w-auto">
        <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl xs:px-6 xs:pt-8 xs:p-6 lg:p-8">
        <div className="grid w-[22%] sm:w-[50%] md:w-[60%] grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:items-center lg:gap-x-8">
            <img src={data.url ? data.url : logo} alt="Back of women&#039;s Basic Tee in black." className="aspect-2/3 w-full rounded-lg bg-zinc-100 object-cover sm:col-span-4 lg:col-span-5"/>
            <div className="sm:col-span-8 lg:col-span-7">
              <h2 className="text-xl font-medium text-zinc-900 sm:pr-12">{data.name}</h2>
              <section aria-labelledby="information-heading" className="mt-1">
                <p className="font-medium text-zinc-900">${data.price}</p>
                <div className="mt-1">
                  <h4 className="sr-only">Reviews</h4>
                  <div className="flex items-center">
                    <p className="text-sm text-zinc-700">
                      {data?.score ? data?.score : "0"}
                      <span className="sr-only"> out of 5 stars</span>
                    </p>
                    <div className="ml-1 flex items-center">
                   <Stars maxScore={5} score={data?.score ? data?.score : 0 } />
                    </div>
                    <div className="ml-4 hidden lg:flex lg:items-center">
                      <a href="#" className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500">{data.reviews} comentarios</a>
                    </div>
                  </div>
                </div>
              </section>

              <Fieldset aria-labelledby="options-heading" className="mt-8">
                {data.isColors && <>
                    <Legend className="text-sm font-medium text-zinc-900">Color</Legend>
                    <div className="mt-1 flex items-center gap-x-3">
                      {data.colors.map((color)=> {
                        return  <label key={color.nombre} aria-label="Black" className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-zinc-900 focus:outline-hidden">
                        <input onClick={()=> console.log(color.nombre)} type="radio" name="color-choice" value={color.nombre} className="sr-only"/>
                        <span aria-hidden="true" className="size-8 rounded-full border border-black/10 bg-zinc-400" style={{backgroundColor: color.colorCode}}></span>
                      </label>
                      })}
                    </div></>}
                    {data.isSizes && <>
                     <Legend className="text-sm font-medium text-zinc-900">Size</Legend>
                    <div className="mt-1 grid grid-cols-7 gap-2">
                    {data?.sizes?.map((size)=>{return (
                      <label key={size} className="flex cursor-pointer items-center justify-center rounded-md border px-3 py-1 text-xs font-medium uppercase focus:outline-hidden sm:flex-1">
                        <input onClick={()=> console.log(size)} type="radio" name="size-choice" value={size} className="sr-only"/>
                        <span>{size}</span>
                      </label>
                      )})}
                    </div></>}

                  <Button className="mt-4" onClick={()=>console.log(data.name)}>Añadir al carrito</Button>
             </Fieldset>
            </div>
          </div>
        </div>
      </div>
 
    )
}