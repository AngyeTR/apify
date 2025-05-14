import { Dropdown, DropdownButton, DropdownDivider, DropdownItem, DropdownLabel, DropdownMenu,} from '../../components/dropdown'
import {Sidebar, SidebarBody, SidebarFooter, SidebarHeader, SidebarItem, SidebarLabel, SidebarSection, SidebarSpacer,} from '../../components/sidebar'
import {ArrowRightStartOnRectangleIcon, ChevronDownIcon, ChevronUpIcon, UserIcon} from '@heroicons/react/16/solid'
import {Avatar} from "../../components/avatar"
import logo from "../../assets/logo.png"
import { MySideBarItem } from './MySideBarItem'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { deleteToken } from '../../services/cookies'
import { Description } from '../fieldset'
import { useEffect, useState } from 'react'
import { getUpdatedLocalData, hexToRgba } from '../../utils/functions'
import { getByDelegateId, getByID } from '../../services/API/api'
import { useNavigate } from 'react-router-dom'

export const MySideBar = ()=>{
  const [user, setUser] = useLocalStorage("data", null)
  const [tempData, setTempData] = useState(null)
  const [companies, setCompanies] = useState([])
  const nav = useNavigate()
  const mods = useLocalStorage("alteredModules")?.[0]
  useEffect(() => {getByDelegateId(1).then((res) => setTempData(res.data))}, []);
  useEffect(() => {tempData?.map(item=> getByID("Companies", item.idCompany).then(res => setCompanies(prev => [...prev, res.data]))) }, [tempData]);
  const changeCompany=async (id)=>{
    const newData = await getByID("Companies",id).then(res => getUpdatedLocalData(user,res.data))
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser(newData)
    nav(0)
  }
  const  logOut=()=>{
    window.localStorage.clear()
    deleteToken()}
    return (
    <Sidebar >
      <SidebarHeader>
        <Dropdown>
          <DropdownButton as={SidebarItem} className="mb-2.5">
            <Avatar src={user.company.urlLogo} className="bg-zinc-50"/>
            <SidebarLabel className="text-2xl font-bold">{user.company.name}</SidebarLabel>
            <ChevronDownIcon />
          </DropdownButton>
          <DropdownMenu className="min-w-64" anchor="bottom start">
          <DropdownItem >
            <DropdownLabel onClick={()=> changeCompany(user.user.company.id)}>{user.user.company.name}<Description >Tu cuenta principal</Description></DropdownLabel></DropdownItem>
            {companies.map(company => {return (
                <DropdownItem >
                  <DropdownDivider />
                  <DropdownLabel onClick={()=> changeCompany(company.id)}>{company.name}</DropdownLabel>
                </DropdownItem>)})}
          </DropdownMenu>
        </Dropdown>
      </SidebarHeader>
      <SidebarBody>
      { Object.keys(mods).map((module)=><MySideBarItem data={mods[module]} key={mods[module].id}/>) }
        <SidebarSpacer />
        <SidebarSection>
          <SidebarLabel>Proximos Eventos</SidebarLabel>
        </SidebarSection>
      </SidebarBody>
      <SidebarFooter>
        <Dropdown>
          <DropdownButton as={SidebarItem}>
            <span className="flex min-w-0 items-center gap-3">
              <Avatar src={user.user.avatar} className="size-10 w-8 h-8" square alt="" />
              <span className="min-w-0">
                <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">{user.user.firstName}</span>
                <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                  {user.user.email}
                </span>
              </span>
            </span>
            <ChevronUpIcon />
          </DropdownButton>
          <DropdownMenu className="min-w-64" anchor="top start">
            <DropdownDivider />
            <DropdownItem href="/login">
              <ArrowRightStartOnRectangleIcon />
              <p onClick={logOut}>Sign out</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </SidebarFooter>
    </Sidebar>
  
    )
}