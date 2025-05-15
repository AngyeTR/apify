import { SidebarLayout } from "../../../../shared/components/uikit/sidebar-layout"
import { MyNavBar } from "./MyNavBar"
import { MySideBar } from "./mySideBar"

export const MyLayout =({children})=>{
    return (
        <SidebarLayout sidebar={<MySideBar />} >
          <MyNavBar />
          {children}
        </SidebarLayout>
    )
}