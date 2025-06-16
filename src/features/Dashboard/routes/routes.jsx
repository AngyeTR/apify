import {Route} from "react-router-dom"
import { ModulePage } from "../pages/ModulePage/ModulePage"
import { WizardPage } from "../pages/WizardPage/WizardPage"
import { FormPage } from "../pages/FormPage.jsx/FormPage"
import { UploadPage } from "../pages/UploadPage.jsx/UploadPage"
import { DelegatesPage } from "../pages/DelegatesPage/DelegatesPage"
import { HomePage} from "../pages/HomePage/HomePage"
import { StoreManagerPage } from "../pages/StoreManagerPage/StoreManagerPage"
import { CampaignWizard } from "../pages/CampaignWizard/CampaignWizard"
import { SalesTunnelPage } from "../pages/SalesTunnelPage/SalesTunnelPage"
import { DomainsPage } from "../pages/DomainsPage/DomainsPage"

const dashboardRoutes =[
      <Route path="/dashboard/wizard" element={<WizardPage/>} />,
      <Route path="/dashboard" element={<HomePage />  } />,
      <Route path="/dashboard/:module/:option" element={ <ModulePage /> } /> ,
      <Route path="/dashboard/:module/edit/:option/:id" element={<FormPage /> } /> ,
      <Route path="/dashboard/:module/add/:option/" element={<FormPage /> } /> ,
      <Route path="/dashboard/:module" element={<ModulePage />  } />,
      <Route path="/dashboard/upload" element={<UploadPage />  } />,
      <Route path="/dashboard/delegates" element={<DelegatesPage />  } />,
      <Route path="/dashboard/domains" element={<DomainsPage />  } />,
      <Route path="/dashboard/storemanager" element={<StoreManagerPage /> } />,
      <Route path="/dashboard/salestunnel/:tunnel" element={<SalesTunnelPage/> } />,
      <Route path="/*" element={<h1>No se encontraron resultados</h1>  } />,
]

export default dashboardRoutes