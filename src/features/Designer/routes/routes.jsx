import {  Route } from 'react-router-dom';
import { EditorPage } from "../Pages/EditorPage"
import { HomePage } from '../Pages/HomePage';
import { ResourcesPage } from '../Pages/ResourcesPage';

const designerRoutes = [
      <Route key="designer-view" path='/designer/view' element={<HomePage />}/>,
      <Route key="designer-editor" path='/designer/editor' element={<EditorPage/>} />,
      <Route key="designer-resources" path='/designer/resources' element={<ResourcesPage/>} />
    ]

export default designerRoutes
