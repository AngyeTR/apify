
import { MyLayout } from "../../components/myComponents/MyLayout"
import { useEffect, useState } from "react"
import { getByCompanyId,  getProfiles } from "../../../../shared/services/API/api"
import { MyDelegatesTable } from "../../components/myComponents/MyDelegatesTable"
import { Heading } from "../../../../shared/components/uikit/heading"
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { MyDelegatesInvitationForm } from "../../components/myComponents/MyDelegatesInvitationForm"
import { Loader } from "../../../../shared/components/Loader"
import { NewTable } from "../../components/newTable"

export const DelegatesPage = ()=> { 
    const [profiles, setProfiles] = useState(null)
    const [loading, setLoading] = useState(false)
    const [stored, setStored] = useLocalStorage("data", null)
    const [data, setData] = useState([])

    useEffect(() => {
        setLoading(true)
        getProfiles().then((res) => {setProfiles(res.data)})
    getByCompanyId("Delegates", stored?.company.id).then((res) => setData(res.data)).finally(() => setLoading(false))}, []); 

    return (
        <MyLayout >
            <Heading>Delegados</Heading>
             <MyDelegatesInvitationForm />
            <div className=" mt-6">
            {loading ? <div className="place-self-center mt-50"><Loader /></div> :
            <NewTable  data={data}/>}
            {/* <MyDelegatesTable profiles={profiles} data={data}/>} */}
            </div>
        </MyLayout>
    )
}