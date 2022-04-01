import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AddCategory from './admin/AddCategory'
import ManageCategories from './admin/ManageCategories'
import AddProduct from './admin/AddProduct'
import ManageProducts from './admin/ManageProducts'
import UpdateProduct from './admin/UpdateProduct'
import Orders from './admin/Orders'
import AdminRoutes from './auth/helper/AdminRoutes'
import PrivateRoutes from './auth/helper/PrivateRoutes'
import Home from './core/Home'
import AdminDashBoard from './user/AdminDashBoard'
import UserDashBoard from './user/UserDashBoard'
import Profile from './user/Profile'
import Signin from './user/Signin'
import Signup from './user/Signup'


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/profile" component={Profile} />
                <PrivateRoutes exact path="/user/dashboard" component={UserDashBoard} />
                <AdminRoutes exact path="/admin/dashboard" component={AdminDashBoard} />
                <AdminRoutes exact path="/admin/create/category" component={AddCategory} />
                <AdminRoutes exact path="/admin/categories/all" component={ManageCategories} />
                <AdminRoutes exact path="/admin/create/product" component={AddProduct} />
                <AdminRoutes exact path="/admin/products/all" component={ManageProducts} />
                <AdminRoutes exact path="/admin/products" component={UpdateProduct} />
                <AdminRoutes exact path="/admin/orders" component={Orders} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes