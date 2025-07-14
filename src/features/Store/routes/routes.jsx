import {  Route, Navigate } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { ProductListPage } from '../pages/ProductListPage'
import { CartPage } from '../pages/CartPage'
import { ProductPage } from '../pages/ProductPage'
import { LoginPage } from '../pages/LoginPage'
import { SignupPage } from '../pages/SignupPage'
import { TemporaryUserPage } from '../pages/TemporaryUserPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ProfilePage } from '../pages/ProfilePage'
import { FavoritesPage } from '../pages/FavoritesPage'
import { getStoreToken } from '../../../shared/services/cookies'

let token = getStoreToken()
const storeRoutes = [
      <Route path='/store' element={<HomePage />}/>,
      <Route path='/store/*' element={<NotFoundPage />}/>,
        <Route path='/store/category/:cat' element={<ProductListPage />}/>,
        <Route path='/store/category/' element={<Navigate to="/category/0"/>}/>,
        <Route path='/store/product/' element={<Navigate to="/"/>}/>,
        <Route path='/store/product/:prod' element={<ProductPage />}/>,
        <Route path="/store/cart" element={token ? <CartPage/>: <Navigate to="/login"/>} />,
        <Route path="/store/login" element={<LoginPage />}/>,
        <Route path="/store/signup" element={<SignupPage />}/>,
        <Route path="/store/temporary" element={token ? <TemporaryUserPage/>: <Navigate to="/login"/>}/>,
        <Route path="/store/profile" element={token ? < ProfilePage />: <Navigate to="/login"/>}/>,
        <Route path="/store/favorites" element={token ? < FavoritesPage /> : <Navigate to="/login"/>}/>
    ]




// const storeRoutes = [
//       <Route path='/store' element={<HomePage />}/>,
//       <Route path='/store/*' element={<NotFoundPage />}/>,
//         <Route path='/store/category/:cat' element={<ProductListPage />}/>,
//         <Route path='/store/category/' element={<Navigate to="/category/0"/>}/>,
//         <Route path='/store/product/' element={<Navigate to="/"/>}/>,
//         <Route path='/store/product/:prod' element={<ProductPage />}/>,
//         <Route path="/store/cart" element={<CartPage/>} />,
//         <Route path="/store/login" element={<LoginPage />}/>,
//         <Route path="/store/signup" element={<SignupPage />}/>,
//         <Route path="/store/temporary" element={<TemporaryUserPage/>}/>,
//         <Route path="/store/profile" element={< ProfilePage />}/>,
//         <Route path="/store/favorites" element={< FavoritesPage />}/>
//     ]

export default storeRoutes
