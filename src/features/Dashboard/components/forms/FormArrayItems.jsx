import { useState } from "react"
import { Button } from '../../../../shared/components/uikit/button'

 function  getURL(value){ 
    const res = value ? URL.createObjectURL(value) :null
    return res}

    // Expected props= ref: [enum["color", "size", imageUrl], required], state:[any, required] setState:[funct(), required]
export const FormArrayItems = ({ref, state, setState, disabled})=>{
    const [variable, setVariable] = useState("")
    console.log(state)

    const ColorInput =()=>{
        const [colorName, setColorName] = useState("")
        const [colorCode, setColorCode] = useState("")
        setState(state)
        return(
            <>
            <input type="color" value={colorCode} className='w-15  my-2 mx-2' name={ref}  onChange={(e)=> setColorCode(e.target.value)} />
            <input placeholder="Nombre" 
            className='w-30 my-2 mx-2 h-8 bg-white shadow-sm border border-gray-400  rounded-md'
            name={ref}  onChange={(e)=> setColorName(e.target.value)} /> 
            <Button disabled={colorCode.length ==0 || colorName.length == 0} onClick={()=> setState([...state, { name: colorName, colorCode: colorCode }])}>Añadir</Button>
            <div className="w-xs md:w-lg lg:w-xl flex  my-2 overflow-hidden ">
            { state?.map((stat)=> <div key={stat.id} style={{background:stat.colorCode}} 
            className='rounded-full h-6 w-6 mx-1 cursor-pointer hover:border hover:border-gray-800' 
            onClick={()=> setState(state.filter(state => state.id !== stat.id))}/>)}
            </div>
            </>)
    }
   
    const ImageInput =()=>{
        return(
            <>
            <input accept="image/*" type="file" multiple className='w-50 my-2 mx-2 h-8 bg-white shadow-sm border border-gray-400  rounded-md'
             name='size'  onChange={(e)=> setVariable(e.target.files[0])} />
            <Button disabled={disabled} onClick={()=> setState([...state, {value:variable}])}>Añadir</Button>
            <div className="w-xs md:w-lg lg:w-xl flex  my-2 overflow-hidden ">
            { state?.map((stat)=> 
            // console.log(stat.value)
            <div key={stat.id} 
            className='max-w-xs overflow-hidden mx-1 px-1 cursor-pointer rounded-lg hover:border hover:border-gray-800' 
            onClick={()=> setState(state.filter(state => state.value!== stat.value))}>
                <img   className="w-30 h-30"
                src={getURL(stat.value)} alt=""/>
            </div>
        )}
            </div>
            </>)
    }

    const SizeInput =()=>{
        let value = ""
        return(
            <>
            <input  className='w-30 my-2 mx-2 h-8 bg-white shadow-sm border border-gray-400  rounded-md' onChange={e=> value=(e.target.value)}/>
            <Button onClick={()=> setState([...state, { id: value.toLowerCase(), value: value.toUpperCase()}])}>Añadir</Button>
            <div className="w-xs md:w-lg lg:w-xl flex  my-2 overflow-hidden ">
            { state?.map((stat)=> <div key={stat.id} 
            className='max-w-xs overflow-hidden mx-1 px-1 cursor-pointer rounded-lg hover:border hover:border-gray-800' 
            onClick={()=> setState(state.filter(state => state.id !== stat.id))}> {stat.value} </div>)}
            </div>
            </>)
    }

    return ( <>{ref == "color" ? <ColorInput /> : ref == "imageUrl" ? <ImageInput /> : <SizeInput />}</>)
}