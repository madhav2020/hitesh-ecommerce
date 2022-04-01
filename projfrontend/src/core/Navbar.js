import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticated } from '../auth/helper'


const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#2ecc72" }
    } else {
        return { color: "#FFFFFF" }
    }
}

const Navbar = ({ history }) => {
    return (
        <>
            <div >
                <ul className="nav nav-tabs bg-dark">
                    <li className="nav-item">
                        <Link className="nav-link" style={currentTab(history, "/")} to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={currentTab(history, "/cart")} to="/cart">Cart</Link>
                    </li>

                    {/* conditionaly we are rending user dashboard when the user is authenticated as normal user */}
                    {isAuthenticated() && isAuthenticated().user.role === 0 && (
                        <li className="nav-item">
                            <Link className="nav-link" style={currentTab(history, "/user/dashboard")} to="/user/dashboard">U. Dashboard</Link>
                        </li>
                    )}
                    {/* conditionaly we are rending both the user and admin dashboard when the user is authenticated as admin */}
                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" style={currentTab(history, "/user/dashboard")} to="/user/dashboard">U. Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={currentTab(history, "/admin/dashboard")} to="/admin/dashboard">A. Dashboard</Link>
                            </li>
                        </>
                    )}


                    {/* if the user is Not authenticated than show both Signup and login in the navbar otherwise hide it */}
                    {!isAuthenticated() && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" style={currentTab(history, "/signup")} to="/signup">Signup</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={currentTab(history, "/signin")} to="/signin">Sign In</Link>
                            </li>
                        </>
                    )}

                    {/* if the user is authenticated than show the logout in the navbar otherwise hide it */}
                    {isAuthenticated() && (
                        <li className="nav-item">
                            <span
                                className="nav-link text-warning"
                                onClick={() => {
                                    signout(() => {
                                        history.push("/")
                                    })
                                }}>
                                Signout
                            </span>
                        </li>
                    )}
                </ul>

            </div>
        </>
    )
}

export default withRouter(Navbar)