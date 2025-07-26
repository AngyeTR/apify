import {  useParams } from 'react-router-dom'
import { HiHome } from "react-icons/hi";
import { Navbar, NavbarItem, NavbarSection } from '../../../../shared/components/uikit/navbar'
import { getModuleId, getTranslate } from '../../utils/functions'
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"

export function MyNavBar() {
  const [mods] = useLocalStorage("alteredModules")
  const params = useParams()
  const opts = mods[getModuleId(params.module)?.name]?.options
  const handleClick = (option)=>{
    window.location.href = `/dashboard/${params.module}/${getTranslate(option.toLowerCase())}`; 
  }
    return (
      <Navbar>
        <NavbarSection>
          <NavbarItem href="/dashboard" >
          <HiHome className='w-6 h-6'/>
          </NavbarItem>
         {opts?.map((option)=> <NavbarItem key={option} onClick={()=>handleClick(option)} current={params.option == getTranslate(option.toLowerCase())}>{option}</NavbarItem>)}
        </NavbarSection>
      </Navbar>
    )
  }