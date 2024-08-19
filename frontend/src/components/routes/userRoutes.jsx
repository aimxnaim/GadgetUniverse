import React from 'react';
import Home from '../Home';
import ProductDetails from '../product/ProductDetails';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Profile from '../user/Profile';
import UpdateProfile from '../user/UpdateProfile';
import ProtectedRoutes from '../auth/ProtectedRoutes';
import UploadAvatar from '../user/UploadAvatar';
import UpdatePassword from '../user/UpdatePassword';
import ForgotPassword from '../auth/ForgotPassword';
import ResetPassword from '../auth/ResetPassword';
import Cart from '../cart/Cart';
import Shipping from '../cart/Shipping';
import ConfirmOrder from '../cart/ConfirmOrder';
import PaymentMethod from '../cart/PaymentMethod';
import MyOrder from '../order/MyOrder';
import OrderDetails from '../order/OrderDetails';
import Invoice from '../invoice/Invoice';
import OurStore from '../store/OurStore';
import Blog from '../blogs/Blog';
import Contact from '../contact/Contact';
import Compare from '../compare/Compare';
import { Route } from 'react-router-dom';
import Wishlist from '../../wishlist/Wishlist';

const userRoutes = () => {
    return (
        <>
            <Route path='/' element={<Home />} />
            <Route path='/products/:id' element={<ProductDetails />} />
            <Route path='/store/products/:id' element={<ProductDetails />} />
            <Route path='/blogs' element={<Blog />} />
            <Route path='/store' element={<OurStore />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/compare' element={<Compare />} />
            <Route path='/login' element={<Login />} />
            <Route path='/login/register' element={<Register />} />
            <Route path='/login/forgot password' element={<ForgotPassword />} />
            <Route path='/password/reset/:token' element={<ResetPassword />} />

            <Route
                path='/me/profile'
                element={
                    <ProtectedRoutes>
                        <Profile />
                    </ProtectedRoutes>
                }
            />

            <Route
                path='/me/update_profile'
                element={
                    <ProtectedRoutes>
                        <UpdateProfile />
                    </ProtectedRoutes>
                }
            />

            <Route
                path='/me/upload_avatar'
                element={
                    <ProtectedRoutes>
                        <UploadAvatar />
                    </ProtectedRoutes>
                }
            />

            <Route
                path='/me/update_password'
                element={
                    <ProtectedRoutes>
                        <UpdatePassword />
                    </ProtectedRoutes>
                }
            />

            <Route path='/cart' element={<Cart />} />

            <Route
                path='/shipping'
                element={
                    <ProtectedRoutes>
                        <Shipping />
                    </ProtectedRoutes>
                } />

            <Route
                path='/confirm_order'
                element={
                    <ProtectedRoutes>
                        <ConfirmOrder />
                    </ProtectedRoutes>
                } />

            <Route
                path='/payment_method'
                element={
                    <ProtectedRoutes>
                        <PaymentMethod />
                    </ProtectedRoutes>
                } />

            <Route
                path='/me/orders'
                element={
                    <ProtectedRoutes>
                        <MyOrder />
                    </ProtectedRoutes>
                } />

            <Route
                path='/me/order/:id'
                element={
                    <ProtectedRoutes>
                        <OrderDetails />
                    </ProtectedRoutes>
                } />

            <Route
                path='/invoice/order/:id'
                element={
                    <ProtectedRoutes>
                        <Invoice />
                    </ProtectedRoutes>
                } />
        </>
    );
}

export default userRoutes;
