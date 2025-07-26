import {Navigate, Route} from "react-router-dom"
import { ModulePage } from "../pages/ModulePage/ModulePage"
import { WizardPage } from "../pages/WizardPage/WizardPage"
import { FormPage } from "../pages/FormPage.jsx/FormPage"
import { UploadPage } from "../pages/GeneralInfoPages/UploadPage"
import { DelegatesPage } from "../pages/GeneralInfoPages/DelegatesPage"
import { HomePage} from "../pages/HomePage/HomePage"
import { StoreManagerPage } from "../pages/StoreManagerPage/StoreManagerPage"
import { CampaignWizard } from "../pages/CampaignWizard/CampaignWizard"
import { SalesTunnelPage } from "../pages/SalesTunnelPage/SalesTunnelPage"
import { DomainsPage } from "../pages/GeneralInfoPages/DomainsPage"
import { getToken } from "../../../shared/services/cookies"
import { LayoutPage } from "../components/salesWizard/Layout"
import { PhonesPage } from "../pages/GeneralInfoPages/PhonesPage"
import { PoliciesPage } from "../pages/GeneralInfoPages/PoliciesPage"
import { SocialsPage } from "../pages/GeneralInfoPages/SocialsPage"
import { OrdersPage } from "../pages/OrdersPage/OrdersPage"


  let token  = getToken()

const dashboardRoutes =[
      <Route path="/dashboard/wizard" element={token ?  <WizardPage/> : <Navigate replace to={"/login"}/>} />,
      <Route path="/dashboard" element={token ?  <HomePage />  : <Navigate replace to={"/login"}/>} />,
      <Route path="/dashboard/:module/:option" element={token ?  <ModulePage /> : <Navigate replace to={"/login"}/>} /> ,
      <Route path="/dashboard/:module/edit/:option/:id" element={token ?  <FormPage /> : <Navigate replace to={"/login"}/>}/> ,
      <Route path="/dashboard/:module/add/:option/" element={token ?  <FormPage /> : <Navigate replace to={"/login"}/>} /> ,
      <Route path="/dashboard/:module" element={token ?  <ModulePage />  : <Navigate replace to={"/login"}/>} />,
      <Route path="/dashboard/upload" element={token ?  <UploadPage />  : <Navigate replace to={"/login"}/>} />,
      <Route path="/dashboard/delegates" element={token ?  <DelegatesPage />  : <Navigate replace to={"/login"}/>} />,
      <Route path="/dashboard/domains" element={token ?  <DomainsPage />  : <Navigate replace to={"/login"}/>} />,
      <Route path="/dashboard/policies" element={token ?  <PoliciesPage />  : <Navigate replace to={"/login"}/>} />,
      <Route path="/dashboard/phones" element={token ?  <PhonesPage />  : <Navigate replace to={"/login"}/>} />,
      <Route path="/dashboard/socials" element={token ?  <SocialsPage />  : <Navigate replace to={"/login"}/>} />,
      <Route path="/dashboard/storemanager" element={token ?  <StoreManagerPage /> : <Navigate replace to={"/login"}/>} />,
      <Route path="/dashboard/orders" element={token ?  <OrdersPage /> : <Navigate replace to={"/login"}/>} />,
      <Route path="/dashboard/salestunnel/:tunnel" element={<SalesTunnelPage/> } />,
      <Route path="/dashboard/layout/:layout" element={<LayoutPage/> } />,
      <Route path="/*" element={<h1>No se encontraron resultados</h1>  } />,
]






// const dashboardRoutes =[
//       <Route path="/dashboard/wizard" element={<WizardPage/> } />,
//       <Route path="/dashboard" element={<HomePage />  } />,
//       <Route path="/dashboard/:module/:option" element={ <ModulePage /> } /> ,
//       <Route path="/dashboard/:module/edit/:option/:id" element={<FormPage /> } /> ,
//       <Route path="/dashboard/:module/add/:option/" element={<FormPage /> } /> ,
//       <Route path="/dashboard/:module" element={<ModulePage />  } />,
//       <Route path="/dashboard/upload" element={<UploadPage />  } />,
//       <Route path="/dashboard/delegates" element={<DelegatesPage />  } />,
//       <Route path="/dashboard/domains" element={<DomainsPage />  } />,
//       <Route path="/dashboard/storemanager" element={<StoreManagerPage /> } />,
//       <Route path="/dashboard/salestunnel/:tunnel" element={<SalesTunnelPage/> } />,
//       <Route path="/*" element={<h1>No se encontraron resultados</h1>  } />,
// ]

export default dashboardRoutes