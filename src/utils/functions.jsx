import {  HiCalculator, HiCog, HiBell, HiChartPie, HiGlobeAlt, HiLibrary } from "react-icons/hi";
import { deleteToken } from "../services/cookies";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const adjustLoginData = (data)=>{
    const newData = {
        company : {
            id: data.company?.id,
            name: data.company?.name,
            urlLogo: data.company?.urlLogo,
            principalColor: data.company?.principalColor,
            secondaryColor: data.company?.secondaryColor },
        user: {
            firstName: data.user?.firstName,
            lastName: data.user?.lastName,
            fullname: data.user?.fullname,
            email: data.user?.email,
            isActive: data.user?.isActive},
        subscription: {
            id: data.suscription?.id,
            type: data.suscription?.suscriptionType.name,
            maxUsers: data.suscription?.suscriptionType.maxUsers,
            maxWarehouse: data.suscription?.suscriptionType.maxWarehouse,
            endDate: data.suscription?.detail[0].endDate,
            startDate: data.suscription?.detail[0].startDate,},
        implementation: {
            implementationStep: data.implementation?.implementationStep,
            success:  data.implementation?.success},
        }
    return newData
    }

export const getModuleIcon = (id)=>{
    const modules = {
        // calculator: <HiCalculator className="size-6 shrink-0"/> ,
        1: {icon: <HiCog className="text-zinc-500 size-6 shrink-0  hover:text-zinc-950"/>, url: "/settings"},
        2:{icon:   <HiBell className=" text-zinc-500 size-6 shrink-0 hover:text-zinc-950"/> , url:"/marketing" }, 
        // analytics: <HiChartPie className="size-6 shrink-0"/>,
        // logistics: <HiGlobeAlt  className="size-6 shrink-0"/>,
        // store: <HiLibrary className="size-6 shrink-0"/>,
      }
      return modules[id]
}

export const getOptionInfo= (name)=>{
    const dictionary = {
        general: "general",
        sedes: "branches",
        usuarios: "users",
        campañas: "campaigns",
        diseñador: "designers"
    }
    return dictionary[name]
}

export const getModuleId = (name)=>{
    const dictionary = {
        settings: 1,
        marketing:2
    }
    return dictionary[name]
}

export const getBase64=(file)=>{ 
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload= function(){
        const newArr = [];
        const base64 = reader.result;
        newArr = base64.split(",");
        return newArr[1]
    }
}

