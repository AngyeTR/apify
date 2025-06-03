import { Dropdown, DropdownButton, DropdownDivider, DropdownItem, DropdownLabel, DropdownMenu,} from '../../../../shared/components/uikit/dropdown'
import {Sidebar, SidebarBody, SidebarFooter, SidebarHeader, SidebarItem, SidebarLabel, SidebarSection, SidebarSpacer,} from '../../../../shared/components/uikit/sidebar'
import {ArrowRightStartOnRectangleIcon, ChevronDownIcon, ChevronUpIcon, UserIcon} from '@heroicons/react/16/solid'
import { HiBell, HiOutlineTicket  } from "react-icons/hi";
import {Avatar} from "../../../../shared/components/uikit/avatar"
import logo from "../../../../assets/logo.png"
import { MySideBarItem } from './MySideBarItem'
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage"
import { deleteToken } from "../../../../shared/services/cookies"
import { Description } from '../../../../shared/components/uikit/fieldset'
import { useEffect, useState } from 'react'
import { getUpdatedLocalData } from '../../utils/functions'
import { getByDelegateId, getByID } from '../../../../shared/services/API/api/'
import { useNavigate } from 'react-router-dom'
import { Modal } from './Modal';

export const MySideBar = ()=>{
  const [user, setUser] = useLocalStorage("data", null)
  const [tempData, setTempData] = useState(null)
  const [companies, setCompanies] = useState([]) 
    const [notify, setNotify] = useState(false)

  const nav = useNavigate()
  const mods = useLocalStorage("alteredModules")?.[0]
  useEffect(() => {getByDelegateId(user?.user.id).then((res) => setTempData(res.data))}, []);
  useEffect(() => {tempData?.map(item=> getByID("Companies", item.idCompany).then(res => setCompanies(prev => [...prev, res.data]))) }, [tempData]);
  const changeCompany=async (id)=>{
    const newData = await getByID("Companies",id).then(res => getUpdatedLocalData(user,res.data))
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser(newData)
    nav(0)
  }
  
  const invitations = tempData?.filter(item => item.status == 2)

  const  logOut=()=>{
    window.localStorage.clear()
    deleteToken()}
    return (
     <Sidebar >
      <SidebarHeader>
        <Dropdown>
          <DropdownButton as={SidebarItem} className="mb-2.5">
            <Avatar src={user?.company?.urlLogo} className="bg-zinc-50 size-10"/>
            <SidebarLabel className="text-2xl font-bold">{user?.company?.name}</SidebarLabel>
            <ChevronDownIcon />
          </DropdownButton>
          <DropdownMenu className="min-w-64" anchor="bottom start">
          <DropdownItem >
            <DropdownLabel onClick={()=> changeCompany(user?.user.company.id)}>{user?.user?.company?.name}<Description >Tu cuenta principal</Description></DropdownLabel></DropdownItem>
              {companies.map((company, index) => tempData[index]?.status == 3 &&  (
                <DropdownItem >
                  <DropdownDivider />
                  <DropdownLabel onClick={()=> changeCompany(company.id)}>{company.name}</DropdownLabel>
                </DropdownItem>))}
          </DropdownMenu>
        </Dropdown>
      </SidebarHeader>
      <SidebarBody>
      { user.company.id == user?.user.company.id ? Object.keys(mods).map((module)=><MySideBarItem data={mods[module]} key={mods[module].id}/>) : <MySideBarItem data={mods["Marketing"]} key={mods["Marketing"].id}/>}
        <SidebarSpacer />
        <SidebarSection>
          <SidebarLabel>Proximos Eventos</SidebarLabel>
        </SidebarSection>
      </SidebarBody>
      <SidebarFooter>
        <Dropdown>
          <DropdownButton as={SidebarItem}>
            <span className="flex min-w-0 items-center gap-3">
              <Avatar src={user?.user.avatar} className="size-10 w-8 h-8" square alt="" />
              <span className="min-w-0">
                <span className="block truncate text-sm/5 font-medium text-zinc-950  ">{user?.user.firstName}</span>
                <span className="block truncate text-xs/5 font-normal text-zinc-500  ">
                  {user?.user.email}
                </span>
              </span>
            </span>
          {invitations?.[0] && <div className='absolute right-5 -top-1 h-fit w-fit '><HiBell className='text-shadow-xl text-red-600 size-5 m-2 animate-pulse'/></div>}            <ChevronUpIcon />
          </DropdownButton>
          <DropdownMenu className="min-w-64" anchor="top start">
            <DropdownDivider />
            <DropdownItem href="/login">
              <ArrowRightStartOnRectangleIcon />
              <p onClick={logOut}>Sign out</p>
            </DropdownItem>
             <DropdownDivider />
            {invitations?.[0] &&  <DropdownItem >
              <HiOutlineTicket  />
              <p onClick={()=>setNotify(true)}>Ver invitaciones</p>
            </DropdownItem>}
          </DropdownMenu>
        </Dropdown>
      </SidebarFooter>
      {notify && <Modal invitations={invitations} setNotify={setNotify}> </Modal> }
    </Sidebar>
  
    )
}