import {  Route, Navigate } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { ProductListPage } from '../pages/ProductListPage'
import { CartPage } from '../pages/CartPage'
import { ProductPage } from '../pages/ProductPage'
import { LoginPage } from '../pages/LoginPage'
import { SignupPage } from '../pages/SignupPage'


const storeRoutes = [
      <Route path='/store' element={<HomePage />}/>,
        <Route path='/store/category/:cat' element={<ProductListPage />}/>,
        <Route path='/store/category/' element={<Navigate to="/category/0"/>}/>,
        <Route path='/store/product/' element={<Navigate to="/"/>}/>,
        <Route path='/store/product/:prod' element={<ProductPage />}/>,
        <Route path="/store/cart" element={<CartPage/>} />,
        <Route path="/store/login" element={<LoginPage />}/>,
        <Route path="/store/signup" element={<SignupPage />}/>,
    ]

export default storeRoutes
