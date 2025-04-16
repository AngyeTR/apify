import { MyLayout } from "../../components/myComponents/MyLayout"
import { useParams,  useNavigate,  } from "react-router-dom"
import { FormCompany } from '../../components/myComponents/forms/FormCompany'
import { FormOffice } from '../../components/myComponents/forms/FormOffice'
import { FormUser } from '../../components/myComponents/forms/FormUser'
import { FormWarehouse } from '../../components/myComponents/forms/FormWarehouse'
import { FormProduct } from '../../components/myComponents/forms/FormProduct'
import { FormSalesman } from '../../components/myComponents/forms/FormSalesman'
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { useEffect, useState } from "react"
import { getByCompanyId} from "../../services/API/api";

export const FormPage =()=> {
    const params = useParams()
    const nav = useNavigate()

    const handleClick= () =>  {nav(`/${params.module}/${params.option}`)}

    const getcomponent = (option) => {
        const dictionary  =   {general: <FormCompany handleClick={handleClick} origin={params?.id ? "editor" : "creator"} id={params?.id && parseInt(params?.id)}/> , 
    offices: <FormOffice handleClick={handleClick} origin={params?.id ? "editor" : "creator"} id={params?.id && parseInt(params?.id)}/>,
    users: <FormUser handleClick={handleClick} origin={params?.id ? "editor" : "creator"} id={params?.id && parseInt(params?.id)}/> ,
    salesman: <FormSalesman handleClick={handleClick} origin={params?.id ? "editor" : "creator"} id={params?.id && parseInt(params?.id)}/>,
    warehouses:  <FormWarehouse handleClick={handleClick} origin={params?.id ? "editor" : "creator"} id={params?.id && parseInt(params?.id)}/>,
    products: < FormProduct handleClick={handleClick} origin={params?.id ? "editor" : "creator"} id={params?.id && parseInt(params?.id)}/>}
    return dictionary[option]}

    const render = ()=> {return getcomponent(params.option)}

    useEffect(() => {!params.option && nav(`/${params.module}/${firstOption}`)}, [ ,params])
    
    return (
        <MyLayout >  
        { render()}
    </MyLayout>)
}