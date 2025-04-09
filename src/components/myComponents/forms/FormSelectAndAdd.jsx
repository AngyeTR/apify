import { useState } from "react"
import { Button } from '../../button'
import { useEffect } from "react"
import { Select } from "../../select"
import { getCategoryByCompany, getManufacturerByCompany, postCategory, postManufacturer } from "../../../services/API/api"

export const FormSelectAndAdd = ({ref,  state, setState})=>{
    const rawData = window.localStorage.getItem("data")
    const stored = JSON.parse(rawData)
    const [variable, setVariable] = useState("")
    const [internalState, setInternalState] = useState()
    let newOption = ""

     useEffect(() => {
        ref == "manufacturer" ? getManufacturerByCompany(stored.company.id).then((res) => {setInternalState(res)}):
          getCategoryByCompany(stored.company.id).then((res) => {setInternalState(res)})
        }, [ ]);

    const handleChange=(value)=>{
        if (value && value != "add"){
            setState(value)
            setVariable(value)
        }else setVariable("add")
    }
    const addNewOption = async ()=>{
    const rawData = window.localStorage.getItem("data")
    const data = JSON.parse(rawData)
    const body = {
        isActive: true,
        createdBy: "data.user.email",
        modifiedBy: "data.user.email",
        idCompany: parseInt(data.company.id), 
        name: newOption}
    let response = []
            try {
                ref == "manufacturer" ? await postManufacturer(body) : await postCategory(body)
                response =  ref == "manufacturer" ? await getManufacturerByCompany(data.company.id) : await getCategoryByCompany(data.company.id)
                setState(null)
                setVariable("")
            } catch (error) {
                console.log(error)
            }finally {
                 setInternalState(response)
            }
    }
    const render = ()=> {
        if(variable == "add"){ return (
        <>
        <input  className='w-30 my-2 mx-2 h-8 bg-white shadow-sm border border-gray-400  rounded-md' onChange={e => newOption = e.target.value} />
        <Button onClick={()=> addNewOption()}>Añadir</Button>
        </>)
        }else {return (
            <Select name="idManufacturer" onChange={e=> handleChange(e.target.value)} >
                <option value={null}>Selecciona una opcion</option>
                { internalState && internalState?.map((option)=> <option value={option.id} key={option.id}>{option.name}</option>)}
                <option value="add">Añadir opción</option>
            </Select>
        )}
    }

    return(render())
}