import { useNavigate, useParams } from 'react-router-dom'
import { HiHome } from "react-icons/hi";
import { Navbar, NavbarItem, NavbarSection } from '../navbar'
import { getModuleId, getTranslate } from '../../utils/functions'
import { useLocalStorage } from '../../hooks/useLocalStorage'

export function MyNavBar() {
  const mods = useLocalStorage("alteredModules")?.[0]
  const params = useParams()
  const opts = mods[getModuleId(params.module)?.name]?.options
  const nav = useNavigate()
  const handleClick = (option)=>{
    window.location.href = `/${params.module}/${getTranslate(option.toLowerCase())}`; 
  }
    return (
      <Navbar>
        <NavbarSection>
          <NavbarItem href="/" >
          <HiHome className='w-6 h-6'/>
          </NavbarItem>
         {opts?.map((option)=> <NavbarItem key={option} onClick={()=>handleClick(option)} current={params.option == getTranslate(option.toLowerCase())}>{option}</NavbarItem>)}
        </NavbarSection>
      </Navbar>
    )
  }