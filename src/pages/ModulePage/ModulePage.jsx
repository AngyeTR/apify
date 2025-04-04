import { MyLayout } from "../../components/myComponents/MyLayout"
import { useParams, Routes, Route } from "react-router-dom"
import { MyTable } from "../../components/myComponents/MyTable"

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
    console.log("para", params)
    return (
        <MyLayout >
        <p>{params.module}</p>
        <p>{params.option}</p>
        
        <Routes >
            <Route path="/" element={<MyTable users={users} />} />
            <Route path="/*" element={<MyTable users={users} />} />
        </Routes>
    </MyLayout>
    )
}