
import { MyLayout } from "../../components/myComponents/MyLayout"
import { useEffect, useState } from "react"
import { getByCompanyId,  getProfiles } from "../../../../shared/services/API/api"
import { MyDelegatesTable } from "../../components/myComponents/MyDelegatesTable"
import { Heading } from "../../../../shared/components/uikit/heading"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { MyDelegatesInvitationForm } from "../../components/myComponents/MyDelegatesInvitationForm"

export const DelegatesPage = ()=> { 
    const [profiles, setProfiles] = useState(null)
    const [stored, setStored] = useLocalStorage("data", null)
    const [data, setData] = useState([])

    useEffect(() => {getProfiles().then((res) => {setProfiles(res.data)})
    getByCompanyId("Delegates", stored.company.id).then((res) => setData(res.data))}, []); 

    return (
        <MyLayout >
             <MyDelegatesInvitationForm />
            <div className=" mt-6">
            <Heading>Delegados</Heading>
            <MyDelegatesTable profiles={profiles} data={data}/>
            </div>
        </MyLayout>
    )
}