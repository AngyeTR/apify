import { useState } from "react"
import { Button } from '../../../../shared/components/uikit/button'
import { useEffect } from "react"
import { Select } from "../../../../shared/components/uikit/select"
import { getByCompanyId, post } from "../../../../shared/services/API/api" 
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { useNavigate } from "react-router-dom"

export const FormSelectAndAdd = ({ref,  state, setState})=>{
    const [stored] = useLocalStorage("data")
    const [variable, setVariable] = useState("")
    const [internalState, setInternalState] = useState()
    const nav = useNavigate()
    let newOption = ""

     useEffect(() => {
        ref == "manufacturer" ? getByCompanyId("Manufacturer", stored?.company.id).then((res) => {setInternalState(res.data)}):
          getByCompanyId("Categories", stored?.company.id).then((res) => {setInternalState(res.data)})
        }, [ ]);

    const handleChange=(value)=>{
        if (value && value != "add"){
            setState(value)
            setVariable(value)
        }else setVariable("add")
    }
    const addNewOption = async ()=>{
    const body = {
        isActive: true,
        createdBy: stored?.user.email,
        modifiedBy: stored?.user.email,
        idCompany: parseInt(stored?.company.id), 
        name: newOption}
    let response = []
            try {
                ref == "manufacturer" ? await post("Manufacturer", body) : await post("Categories", body)
                response =  ref == "manufacturer" ? await getByCompanyId("Manufacturer", stored?.company.id) : await getByCompanyId("Categories", stored?.company.id)
                setState(null)
                setVariable("")
            } catch (error) {
                console.log(error)
            }finally {
                 setInternalState(response)
                 nav(0)
            }
    }
    const render = ()=> {
        if(variable == "add"){ return (
        <div className="block">
            {console.log(internalState)}
        <input  className='w-30 my-2 mx-2 h-8 bg-white shadow-sm border border-gray-400  rounded-md' onChange={e => newOption = e.target.value} />
        <Button onClick={()=> addNewOption()}>Añadir</Button>
        </div>)
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