import { MyLayout } from "../../components/myComponents/MyLayout"
import { useParams, Routes, Route } from "react-router-dom"
import { MyTable } from "../../components/myComponents/MyTable"
import { getOptionInfo, getModuleId } from '../../utils/functions'
import { FormUser } from "../../components/myComponents/forms/FormUser"
import { useLocalStorage } from "../../hooks/useLocalStorage"

const dict = {
    settings: 1, 
    marketing:2
}
const users= [
    {name: "Leslie Alexander", role: "Co-Founder / CEO", email: "leslie.alexander@example.com", access: "Admin"},
    {name: "Leslie Alexander", role: "Co-Founder / CEO", email: "leslie.alexander@example.com", access: "Admin"},
    {name: "Leslie Alexander", role: "Co-Founder / CEO", email: "leslie.alexander@example.com", access: "Admin"},
    {name: "Leslie Alexander", role: "Co-Founder / CEO", email: "leslie.alexander@example.com", access: "Admin"},
    {name: "Leslie Alexander", role: "Co-Founder / CEO", email: "leslie.alexander@example.com", access: "Admin"},
    {name: "Leslie Alexander", role: "Co-Founder / CEO", email: "leslie.alexander@example.com", access: "Admin"},
    {name: "Leslie Alexander", role: "Co-Founder / CEO", email: "leslie.alexander@example.com", access: "Admin"},
    {name: "Leslie Alexander", role: "Co-Founder / CEO", email: "leslie.alexander@example.com", access: "Admin"},
    {name: "Leslie Alexander", role: "Co-Founder / CEO", email: "leslie.alexander@example.com", access: "Admin"},
    {name: "Leslie Alexander", role: "Co-Founder / CEO", email: "leslie.alexander@example.com", access: "Admin"},
    {name: "Leslie Alexander", role: "Co-Founder / CEO", email: "leslie.alexander@example.com", access: "Admin"},
    {name: "Leslie Alexander", role: "Co-Founder / CEO", email: "leslie.alexander@example.com", access: "Admin"},
    
]

export const ModulePage =()=> {
    const params = useParams()

    const modules = useLocalStorage("modules")?.[0]
    const options = modules.filter((option) => option.module.id == getModuleId(params.module))
    const optionList = options.map(option => {return getOptionInfo(option.name.toLowerCase())})
    optionList.push("")
    console.log("option",modules)
    return (
        <MyLayout >
        <p>{params.module}</p>
        <p>{params.option}</p>
        {
           (!params.option || optionList.includes(params.option) ) && params.module ? <h1>existe</h1> : <h1>No existe <p>{params.option}</p></h1>
        }
        {/* {
            params.option == "users" && <FormUser />
        } */}
        
        <Routes >
            {/* <Route path="/" element={<MyTable users={users} />} /> */}
            {/* <Route path="/*" element={<MyTable users={[]} />} /> */}
            {/* <Route path="/*" element={<p>NO existe</p>} /> */}
            <Route path="/test" element={<h1>TEst</h1>} />
            {
                options.map(option=>{<Route path={`/${option}`} element={<FormUser />} /> })
            }
            {/* <Route path="/users" element={<h1>Usuarios</h1>} />
            <Route path="/user" element={<FormUser />} /> */}
        </Routes>
    </MyLayout>
    )
}