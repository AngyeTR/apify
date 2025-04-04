import { useParams } from 'react-router-dom'
import { Navbar, NavbarItem, NavbarSection } from '../navbar'
import { getOptionInfo, getModuleId } from '../../utils/functions'
import { useLocalStorage } from '../../hooks/useLocalStorage'

export function MyNavBar() {
  const modules = useLocalStorage("modules")?.[0]
  const params = useParams()
  const options = modules.filter((option) => option.module.id == getModuleId(params.module))

    return (
      <Navbar>
        <NavbarSection>
          <NavbarItem href="/" current>
            Home
          </NavbarItem>
         {options.map((option)=> <NavbarItem href={`/${params.module}/${getOptionInfo(option.name.toLowerCase())}`} >{option.name}</NavbarItem>)}
        </NavbarSection>
      </Navbar>
    )
  }