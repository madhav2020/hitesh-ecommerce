import React from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper/index';
import { Link } from 'react-router-dom';




const AdminDashBoard = () => {
    // in this destructuring isAuthenticated will give us user data and further destructring will give name, email etc other wise we have to wirte user.name, user.email, user.role and etc
    const { user: { name, email, role } } = isAuthenticated();
    // function for the Admin left side
    const adminLeftSide = () => {
        return (
            <>
                <div className="card">
                    <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <Link to="/admin/create/category" className='nav-link text-success'>Create Category</Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/admin/categories/all" className='nav-link text-success'>Manage Category</Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/admin/create/product" className='nav-link text-success'>Create Product</Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/admin/products/all" className='nav-link text-success'>Manage Products</Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/admin/orders" className='nav-link text-success'>Mange Orders</Link>
                        </li>
                    </ul>
                </div>
            </>
        )
    };

    // function for the Admin Right side
    const adminRightSide = () => {
        return (
            <>
                <div className="card mb-4">
                    <h4 className="card-header text-center"> Welcome {name} ! <span className="badge bg-danger mr-2">You have an Admin Privlage</span>  </h4>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <span className="badge bg-success mr-2">Name</span> {name}
                        </li>
                        <li className="list-group-item">
                            <span className="badge bg-success mr-2">Email</span> {email}
                        </li>
                        <li className="list-group-item">
                            <span className="badge bg-success mr-2">Role</span> Admin
                        </li>
                    </ul>
                </div>
            </>
        )
    }
    return (
        <>
            <Base className="container bg-success p-4" title='Admin Dashboard' description='manage your busienss from here'>
                <div className="row">
                    <div className="col-3">
                        {adminLeftSide()}
                    </div>
                    <div className="col-9">
                        {adminRightSide()}
                    </div>
                </div>

            </Base>
        </>
    )
}

export default AdminDashBoard