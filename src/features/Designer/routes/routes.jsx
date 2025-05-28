import {  Route } from 'react-router-dom';
import { EditorPage } from "../Pages/EditorPage"
import { HomePage } from '../Pages/HomePage';
import { ResourcesPage } from '../Pages/ResourcesPage';
import { ViewPage } from '../Pages/ViewPage';

const designerRoutes = [
      <Route key="designer-dashboard" path='/dashboard/marketing/designers' element={<HomePage />}/>,
      <Route key="designer-view" path='/designer/view/:id' element={<ViewPage />}/>,
      <Route key="designer-home" path='/designer/' element={<HomePage />}/>,
      <Route key="designer-editor" path='/designer/editor/:id' element={<EditorPage/>} />,
      <Route key="designer-resources" path='/designer/resources' element={<ResourcesPage/>} />,
      <Route key="designer-various" path='/designer/*' element={<HomePage/>} />
    ]

export default designerRoutes
