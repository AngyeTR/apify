import { MyLayout } from "../../components/myComponents/MyLayout"
import { useParams,  useNavigate,  } from "react-router-dom"
import { FormCompany } from "../../components/forms/FormCompany"
import { FormOffice } from '../../components/forms/FormOffice'
import { FormUser } from '../../components/forms/FormUser'
import { FormWarehouse } from '../../components/forms/FormWarehouse'
import { FormProduct } from '../../components/forms/FormProduct'
import { FormSalesman } from '../../components/forms/FormSalesman'
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { useEffect, useState } from "react"
import { getByCompanyId} from "../../../../shared/services/API/api"
import { FormCampaign } from "../../components/forms/FormCampaigns"
import { CustomerForm } from "../../components/salesWizard/CustomerForm"

export const FormPage =()=> {
    const params = useParams()
    const nav = useNavigate()

    const handleClick= () =>  {nav(`/dashboard/${params.module}/${params.option}`)}

    const getcomponent = (option) => {
        const dictionary  =   {general: <FormCompany handleClick={handleClick} origin={params?.id ? "editor" : "creator"} id={params?.id && parseInt(params?.id)}/> , 
    offices: <FormOffice handleClick={handleClick} origin={params?.id ? "editor" : "creator"} id={params?.id && parseInt(params?.id)}/>,
    users: <FormUser handleClick={handleClick} origin={params?.id ? "editor" : "creator"} id={params?.id && parseInt(params?.id)}/> ,
    salesman: <FormSalesman handleClick={handleClick} origin={params?.id ? "editor" : "creator"} id={params?.id && parseInt(params?.id)}/>,
    warehouses:  <FormWarehouse handleClick={handleClick} origin={params?.id ? "editor" : "creator"} id={params?.id && parseInt(params?.id)}/>,
    products: < FormProduct handleClick={handleClick} origin={params?.id ? "editor" : "creator"} id={params?.id && parseInt(params?.id)}/>,
    salestunnel: <FormCampaign handleClick={handleClick} origin={params?.id ? "editor" : "creator"} id={params?.id && parseInt(params?.id)}/>,
 customers: <CustomerForm />}
    return dictionary[option]}

    const render = ()=> {return getcomponent(params.option)}

    useEffect(() => {!params.option && nav(`/dashboard/${params.module}/${firstOption}`)}, [ ,params])
    
    return (
        <MyLayout >  
        { render()}
    </MyLayout>)
}