import { Dropdown, DropdownButton, DropdownDivider, DropdownItem, DropdownLabel, DropdownMenu,} from '../../components/dropdown'
import {Sidebar, SidebarBody, SidebarFooter, SidebarHeader, SidebarItem, SidebarLabel, SidebarSection, SidebarSpacer,} from '../../components/sidebar'
import {ArrowRightStartOnRectangleIcon, ChevronDownIcon, ChevronUpIcon, UserIcon} from '@heroicons/react/16/solid'
import {Avatar} from "../../components/avatar"
import logo from "../../assets/logo.png"
import { MySideBarItem } from './MySideBarItem'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { deleteToken } from '../../services/cookies'

export const MySideBar = ()=>{
  const user = useLocalStorage("data")?.[0]
  const mods = useLocalStorage("alteredModules")?.[0]

  const status = new Date() >= new Date(user.subscription.startDate) && new Date() <= new Date(user.subscription.endDate) ? "Active" : "Inactive"
    const  logOut=()=>{
      window.localStorage.clear()
      deleteToken()}

    return (
    <Sidebar>
      <SidebarHeader>
        <Dropdown>
          <DropdownButton as={SidebarItem} className="mb-2.5">
            <Avatar src={user.company.urlLogo? user.company.urlLogo:  logo} />
            <SidebarLabel>{user.company.name}</SidebarLabel>
            <ChevronDownIcon />
          </DropdownButton>
          <DropdownMenu className="min-w-64" anchor="bottom start">
            <DropdownItem >
              <DropdownLabel>Plan: {user.subscription.type}</DropdownLabel>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem >
              <DropdownLabel>Status: {status}</DropdownLabel>
            </DropdownItem>
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
              <Avatar src={user.user.avatar ? user.user.avatar: user.company.urlLogo ? user.company.urlLogo:  logo} className="size-10 w-8 h-8" square alt="" />
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
            <DropdownItem href="/my-profile">
              <UserIcon />
              <DropdownLabel>My profile</DropdownLabel>
            </DropdownItem>
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