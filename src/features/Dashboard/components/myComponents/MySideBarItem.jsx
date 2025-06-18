import { Link } from "react-router-dom";
import { SidebarLabel } from "../../../../shared/components/uikit/sidebar";
import { getModuleIcon } from "../../utils/functions.jsx";

export const MySideBarItem = ({data})=>{
    const moduleInfo = getModuleIcon(data.id)
    console.log(data)
    return (
        <Link to={moduleInfo.url}  
        className='relative flex min-w-0 items-center gap-3 rounded-lg p-2 text-left text-base/6 font-medium text-zinc-950 hover:text-zinc-950 sm:text-sm/5 hover:bg-zinc-950/5 '>
            {moduleInfo.icon}
            <SidebarLabel >{data.name}</SidebarLabel>
          </Link>
    )
} 
